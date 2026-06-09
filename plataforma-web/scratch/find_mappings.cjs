const fs = require('fs');
const readline = require('readline');

const targetFile = 'c:\\Users\\ferreira-mr\\Projects\\Exercicios_LivroAlgoritmos_JoseAugustoManzano\\plataforma-web\\src\\components\\FlowchartTab.tsx';

async function search() {
  const fileStream = fs.createReadStream(targetFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (lineCount >= 50 && lineCount <= 250) {
      if (line.includes('30') || line.includes('60')) {
        console.log(`${lineCount}: ${line.trim()}`);
      }
    }
  }
}

search();
