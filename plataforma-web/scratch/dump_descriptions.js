import fs from 'fs';
import path from 'path';

const jsonPath = 'c:/Users/ferreira-mr/Projects/Exercicios_LivroAlgoritmos_JoseAugustoManzano/plataforma-web/src/data/exercises.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const output = data.map(ex => `${ex.id} (${ex.title}):\n${ex.description}\n`).join('\n---\n\n');
fs.writeFileSync('c:/Users/ferreira-mr/Projects/Exercicios_LivroAlgoritmos_JoseAugustoManzano/plataforma-web/scratch/descriptions.txt', output, 'utf-8');
console.log('Descriptions dumped successfully to scratch/descriptions.txt');
