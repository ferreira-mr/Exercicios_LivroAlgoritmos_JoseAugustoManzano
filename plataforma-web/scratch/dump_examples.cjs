const fs = require('fs');
const path = require('path');

const exercises = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/exercises.json'), 'utf8'));

const data = exercises.map(ex => ({
  id: ex.id,
  title: ex.title,
  examplesLength: ex.examples ? ex.examples.length : 0,
  examplesPreview: ex.examples ? ex.examples.substring(0, 100).replace(/\r?\n/g, ' ') : ''
}));

fs.writeFileSync(path.join(__dirname, 'examples_preview.json'), JSON.stringify(data, null, 2));
console.log('Examples dumped successfully.');
