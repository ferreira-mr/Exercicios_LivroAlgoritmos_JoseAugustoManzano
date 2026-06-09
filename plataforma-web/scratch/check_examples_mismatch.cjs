const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'exercises.json');
const testsFilePath = path.join(__dirname, '..', 'src', 'data', 'tests.json');

const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));
const tests = JSON.parse(fs.readFileSync(testsFilePath, 'utf8'));

function parseExamples(rawExamples) {
  if (!rawExamples) return [];
  const blocks = rawExamples.split(/- Exemplo \d+:/gi);
  const list = [];
  let exampleIndex = 0;
  for (const block of blocks) {
    if (!block.trim()) continue;
    const entradaMatch = block.match(/-\s*(?:Entrada|ENTRADA):\s*(.*)/i);
    const saidaMatch = block.match(/-\s*(?:Saída|SAÍDA):\s*(.*)/i);
    if (entradaMatch && saidaMatch) {
      list.push({
        inputs: entradaMatch[1].trim().replace(/\s*\([^)]*\)\s*$/, '').split(/,\s*/).map(s => s.replace(/^[a-zA-Z0-9_]+\s*=\s*/, '').trim()),
        outputs: saidaMatch[1].trim().replace(/\s*\([^)]*\)\s*$/, '')
      });
    }
  }
  return list;
}

const mismatches = [];

for (const ex of exercises) {
  const testSuite = tests[ex.id];
  if (!testSuite) {
    console.log(`No test suite for ${ex.id}`);
    continue;
  }
  
  const parsed = parseExamples(ex.examples);
  if (parsed.length === 0) continue;
  
  // Compare case 1
  const firstCase = testSuite.cases[0];
  const firstParsed = parsed[0];
  if (!firstCase || !firstParsed) continue;
  
  // Format outputs from testSuite
  const testOutputsCombined = firstCase.outputs.join(' ');
  const parsedOutputClean = firstParsed.outputs.trim();
  
  if (testOutputsCombined !== parsedOutputClean) {
    mismatches.push({
      id: ex.id,
      title: ex.title,
      inputs: firstParsed.inputs,
      expectedInTest: testSuite.cases.map(c => c.outputs),
      expectedInExample: parsed.map(p => p.outputs)
    });
  }
}

console.log(`Found ${mismatches.length} exercises with mismatches:`);
mismatches.forEach(m => {
  console.log(`- ${m.id} (${m.title}):`);
  console.log(`  Tests:    `, JSON.stringify(m.expectedInTest));
  console.log(`  Examples: `, JSON.stringify(m.expectedInExample));
});
