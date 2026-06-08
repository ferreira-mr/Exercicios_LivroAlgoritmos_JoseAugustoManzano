const fs = require('fs');
const path = require('path');

const repoRoot = 'c:\\Users\\ferreira-mr\\Projects\\Exercicios_LivroAlgoritmos_JoseAugustoManzano';
const exercisesFile = path.join(repoRoot, 'plataforma-web', 'src', 'data', 'exercises.json');

const exercises = JSON.parse(fs.readFileSync(exercisesFile, 'utf-8'));

console.log(`Checking ${exercises.length} exercises...`);
let ok = true;
exercises.forEach((ex, idx) => {
  const expectedNum = idx + 1;
  if (ex.number !== expectedNum) {
    console.log(`Mismatch at index ${idx}: expected number ${expectedNum}, got ${ex.number} (title: ${ex.title}, id: ${ex.id})`);
    ok = false;
  }
});

if (ok) {
  console.log("All exercises are in perfect sequential order (1 to 192)!");
} else {
  console.log("Found sequence mismatches!");
}
