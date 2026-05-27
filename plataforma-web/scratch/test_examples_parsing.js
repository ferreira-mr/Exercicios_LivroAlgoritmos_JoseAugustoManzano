const fs = require('fs');
const path = require('path');

const exercises = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/exercises.json'), 'utf8'));
const testsOverrides = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/tests.json'), 'utf8'));

function parseExamples(examplesText, exerciseId) {
  if (!examplesText) return [];
  const blocks = examplesText.split(/- Exemplo \d+:/gi);
  const list = [];
  
  const testCases = exerciseId ? testsOverrides[exerciseId]?.cases : null;
  
  let exampleIndex = 0;
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    const entradaMatch = block.match(/-\s*(?:Entrada|ENTRADA):\s*(.*)/i);
    const saidaMatch = block.match(/-\s*(?:Saída|SAÍDA):\s*(.*)/i);
    const procMatch = block.match(/-\s*(?:Processamento|PROCESSAMENTO):\s*(.*)/i);
    
    if (entradaMatch && saidaMatch) {
      let rawInput = entradaMatch[1].trim();
      let rawOutput = saidaMatch[1].trim();
      
      let cleanInput = rawInput.replace(/\s*\([^)]*\)\s*$/, '').trim();
      let cleanOutput = rawOutput.replace(/\s*\([^)]*\)\s*$/, '').trim();
      
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
  return list;
}

const failures = [];
for (const ex of exercises) {
  if (!ex.examples) {
    failures.push({ id: ex.id, reason: 'No examples field' });
    continue;
  }
  const parsed = parseExamples(ex.examples, ex.id);
  
  // Count how many examples we expected. Usually, each block starts with "- Exemplo"
  const expectedCount = (ex.examples.match(/- Exemplo/gi) || []).length;
  if (parsed.length !== expectedCount) {
    failures.push({
      id: ex.id,
      expected: expectedCount,
      actual: parsed.length,
      examplesText: ex.examples
    });
  }
}

console.log(`Parsed ${exercises.length - failures.length} exercises successfully.`);
console.log(`Failed exercises: ${failures.length}`);
console.log(JSON.stringify(failures, null, 2));
