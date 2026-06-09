const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'exercises.json');
const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

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
      
      // Clean outputs using state machine
      let cleanOutput = removeParentheses(outputsStr).replace(/\s+/g, ' ').trim();
      // Clean up punctuation at the end or double spaces
      cleanOutput = cleanOutput.replace(/\s*;\s*$/, '').trim();
      // Replace duplicate spaces around commas/punctuation
      cleanOutput = cleanOutput.replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ').trim();
      
      list.push({
        inputs,
        outputs: cleanOutput
      });
    }
  }
  return list;
}

const ids = ['Exercicio01', 'Exercicio02', 'Exercicio04', 'Exercicio17'];
ids.forEach(id => {
  const ex = exercises.find(e => e.id === id);
  console.log(`=== ${id} ===`);
  console.log(parseExamples(ex.examples));
});
