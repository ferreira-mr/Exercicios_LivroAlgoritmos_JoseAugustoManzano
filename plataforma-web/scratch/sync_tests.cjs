const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'exercises.json');
const testsFilePath = path.join(__dirname, '..', 'src', 'data', 'tests.json');

const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));
const tests = JSON.parse(fs.readFileSync(testsFilePath, 'utf8'));

function removeParentheses(str) {
  let result = '';
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(') {
      depth++;
    } else if (char === ')') {
      if (depth > 0) depth--;
    } else if (depth === 0) {
      result += char;
    }
  }
  return result;
}

function parseExamples(rawExamples) {
  if (!rawExamples) return [];
  const blocks = rawExamples.split(/- Exemplo \d+:/gi);
  const list = [];
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    const entradaMatch = block.match(/-\s*(?:Entrada|ENTRADA):\s*([\s\S]*?)(?=-\s*(?:Saída|SAÍDA|Processamento|PROCESSAMENTO):|$)/i);
    const saidaMatch = block.match(/-\s*(?:Saída|SAÍDA):\s*([\s\S]*?)(?=-\s*(?:Entrada|ENTRADA|Processamento|PROCESSAMENTO):|$)/i);
    
    if (entradaMatch && saidaMatch) {
      let inputsStr = entradaMatch[1].trim();
      let outputsStr = saidaMatch[1].trim();
      
      const inputs = [];
      const numberRegex = /-?\d+(?:\.\d+)?/g;
      let match;
      while ((match = numberRegex.exec(inputsStr)) !== null) {
        inputs.push(match[0]);
      }
      
      // Clean outputs: preserve newlines
      let cleanOutput = removeParentheses(outputsStr)
        .split(/\r?\n/)
        .map(line => line.replace(/[ \t]+/g, ' ').trim())
        .filter(line => line.length > 0)
        .join('\n');

      cleanOutput = cleanOutput.replace(/\s*;\s*$/, '').trim();
      
      list.push({
        inputs,
        outputs: cleanOutput
      });
    }
  }
  return list;
}

let syncCount = 0;
const changes = [];

for (const ex of exercises) {
  const testSuite = tests[ex.id];
  if (!testSuite) continue;

  const parsed = parseExamples(ex.examples);
  if (parsed.length === 0) continue;

  parsed.forEach((example, idx) => {
    if (testSuite.cases[idx]) {
      const oldOutputs = testSuite.cases[idx].outputs;
      const newOutput = example.outputs.trim();
      
      if (newOutput && (oldOutputs.length !== 1 || oldOutputs[0] !== newOutput)) {
        testSuite.cases[idx].outputs = [newOutput];
        testSuite.cases[idx].matchType = "any";
        syncCount++;
        changes.push({
          id: ex.id,
          caseNum: idx + 1,
          old: oldOutputs,
          new: newOutput
        });
      }
    }
  });
}

fs.writeFileSync(testsFilePath, JSON.stringify(tests, null, 2), 'utf8');
console.log(`Successfully synchronized ${syncCount} test cases with their example outputs.`);
console.log('Sample of changes:');
changes.slice(0, 15).forEach(c => {
  console.log(`- ${c.id} Case #${c.caseNum}:`);
  console.log(`  Old:`, c.old);
  console.log(`  New: "${c.new.replace(/\n/g, '\\n')}"`);
});
