const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'exercises.json');
const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

console.log(`Total exercises found: ${exercises.length}`);

const stats = {
  hasExamples: 0,
  noExamples: 0,
  chapters: {}
};

exercises.forEach(ex => {
  if (!stats.chapters[ex.chapterDir]) {
    stats.chapters[ex.chapterDir] = { count: 0, hasExamples: 0 };
  }
  stats.chapters[ex.chapterDir].count++;
  
  if (ex.examples && ex.examples.trim()) {
    stats.hasExamples++;
    stats.chapters[ex.chapterDir].hasExamples++;
  } else {
    stats.noExamples++;
  }
});

console.log(JSON.stringify(stats, null, 2));
