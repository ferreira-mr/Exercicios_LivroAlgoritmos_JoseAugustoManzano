const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'exercises.json');
const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

let summary = '';
exercises.forEach(ex => {
  summary += `==================================================\n`;
  summary += `ID: ${ex.id} (Number: ${ex.number})\n`;
  summary += `Title: ${ex.title}\n`;
  summary += `Chapter: ${ex.chapterName} (${ex.chapterDir})\n`;
  summary += `Description:\n${ex.description}\n\n`;
  summary += `Pseudocode:\n${ex.pseudocode || 'N/A'}\n`;
  summary += `==================================================\n\n`;
});

const outputPath = path.join(__dirname, '..', 'scratch', 'exercises_summary.txt');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, summary, 'utf8');
console.log(`Summary written to: ${outputPath}`);
