const fs = require('fs');
const path = require('path');

const exercises = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/exercises.json'), 'utf8'));
const testsOverrides = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/tests.json'), 'utf8'));

function parseExamples(examplesText, exerciseId) {
  const testCases = exerciseId ? testsOverrides[exerciseId]?.cases : null;

  if (!examplesText) {
    if (testCases && testCases.length > 0) {
      const list = [];
      testCases.forEach((c, index) => {
        if (index >= 3) return; // limit to max 3 examples
        const inputs = c.inputs || [];
        const outputs = c.outputs || [];
        
        const cleanInput = inputs.join('\n');
        
        let cleanOutput = '';
        if (c.matchType === 'all') {
          cleanOutput = outputs.slice(0, 10).join('\n');
          if (outputs.length > 10) cleanOutput += '\n...';
        } else {
          cleanOutput = outputs[0] || '';
        }
        
        list.push({
          name: `Exemplo ${index + 1}`,
          entrada: cleanInput,
          saida: cleanOutput
        });
      });
      return list;
    }
    return [];
  }

  const blocks = examplesText.split(/- Exemplo \d+:/gi);
  const list = [];
  
  let exampleIndex = 0;
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    const entradaMatch = block.match(/-\s*(?:Entrada|ENTRADA):\s*(.*)/i);
    const saidaMatch = block.match(/-\s*(?:Saída|SAÍDA):\s*(.*)/i);
    const procMatch = block.match(/-\s*(?:Processamento|PROCESSAMENTO):\s*(.*)/i);
    
    if (entradaMatch && saidaMatch) {
      let rawInput = entradaMatch[1].trim();
      let rawOutput = saidaMatch[1].trim();
      
      // Clean up parentheses at the end of the lines
      let cleanInput = rawInput.replace(/\s*\([^)]*\)\s*$/, '').trim();
      let cleanOutput = rawOutput.replace(/\s*\([^)]*\)\s*$/, '').trim();
      
      // If we have actual test inputs, show exactly what the user has to type
      const testCase = testCases?.[exampleIndex];
      if (testCase && testCase.inputs && testCase.inputs.length > 0) {
        cleanInput = testCase.inputs.join('\n');
      }
      
      list.push({
        name: `Exemplo ${exampleIndex + 1}`,
        entrada: cleanInput,
        saida: cleanOutput,
        processamento: procMatch ? procMatch[1].trim() : undefined
      });
      exampleIndex++;
    }
  }
  
  // If the string itself did not start with "- Exemplo" but had Entrada/Saída block directly
  if (list.length === 0 && blocks.length > 0) {
    const singleBlock = blocks[0];
    const entradaMatch = singleBlock.match(/-\s*(?:Entrada|ENTRADA):\s*(.*)/i);
    const saidaMatch = singleBlock.match(/-\s*(?:Saída|SAÍDA):\s*(.*)/i);
    const procMatch = singleBlock.match(/-\s*(?:Processamento|PROCESSAMENTO):\s*(.*)/i);
    
    if (entradaMatch && saidaMatch) {
      let rawInput = entradaMatch[1].trim();
      let rawOutput = saidaMatch[1].trim();
      let cleanInput = rawInput.replace(/\s*\([^)]*\)\s*$/, '').trim();
      let cleanOutput = rawOutput.replace(/\s*\([^)]*\)\s*$/, '').trim();
      
      const testCase = testCases?.[0];
      if (testCase && testCase.inputs && testCase.inputs.length > 0) {
        cleanInput = testCase.inputs.join('\n');
      }
      
      list.push({
        name: 'Exemplo 1',
        entrada: cleanInput,
        saida: cleanOutput,
        processamento: procMatch ? procMatch[1].trim() : undefined
      });
    }
  }

  return list;
}

const failures = [];
for (const ex of exercises) {
  const parsed = parseExamples(ex.examples, ex.id);
  if (parsed.length === 0) {
    failures.push({
      id: ex.id,
      title: ex.title,
      reason: 'Parsed list is empty (no examples and no test cases found)'
    });
  }
}

console.log(`Parsed ${exercises.length - failures.length} exercises successfully.`);
console.log(`Failed exercises (empty result): ${failures.length}`);
if (failures.length > 0) {
  console.log(JSON.stringify(failures, null, 2));
}
