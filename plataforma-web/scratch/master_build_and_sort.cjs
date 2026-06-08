const fs = require('fs');
const path = require('path');

const repoRoot = 'c:\\Users\\ferreira-mr\\Projects\\Exercicios_LivroAlgoritmos_JoseAugustoManzano';
const testsFilePath = path.join(repoRoot, 'plataforma-web', 'src', 'data', 'tests.json');
const scratchDir = 'C:\\Users\\ferreira-mr\\.gemini\\antigravity\\brain\\ebdbb425-ed15-4829-99d1-6e7f120018ea\\scratch';

// 1. Helper to find file path of any original book exercise (1 to 120)
function getOriginalBookExercisePath(num) {
  const padded = String(num).padStart(2, '0');
  let folder = '';
  if (num >= 1 && num <= 25) {
    folder = '01_EstruturaSequencial';
  } else if (num >= 27 && num <= 41) {
    folder = '02_EstruturaDeDecisão';
  } else if (num >= 42 && num <= 60) {
    folder = '03_EstruturaDeRepetição';
  } else if (num >= 61 && num <= 85) {
    folder = '04_EstruturaDeDadosDeUmaDimensão';
  } else if (num >= 87 && num <= 109) {
    folder = '05_EstruturaDeDadosDeDuasDimensões';
  } else if (num >= 110 && num <= 113) {
    folder = '06_EstruturasHeterogêneas';
  } else if (num >= 114 && num <= 120) {
    folder = '07_EstruturaDeSubprogramas';
  } else {
    throw new Error(`Invalid original book exercise number: ${num}`);
  }
  
  const pathWithoutAccent = path.join(repoRoot, folder, `Exercicio${padded}.md`);
  if (fs.existsSync(pathWithoutAccent)) {
    return { folder, path: pathWithoutAccent };
  }
  const pathWithAccent = path.join(repoRoot, folder, `Exercício${padded}.md`);
  if (fs.existsSync(pathWithAccent)) {
    return { folder, path: pathWithAccent };
  }
  throw new Error(`Original book exercise file not found for number ${num} in ${folder}`);
}

// 2. Load all original book exercises into memory
console.log("Loading original book exercises into memory...");
const bookExercises = {};
const bookRanges = [
  { start: 1, end: 25 },
  { start: 27, end: 41 },
  { start: 42, end: 60 },
  { start: 61, end: 85 },
  { start: 87, end: 109 },
  { start: 110, end: 113 },
  { start: 114, end: 120 }
];

bookRanges.forEach(range => {
  for (let num = range.start; num <= range.end; num++) {
    const info = getOriginalBookExercisePath(num);
    const content = fs.readFileSync(info.path, 'utf-8');
    const match = content.match(/^#\s*📝\s*Exercício\s*\d+:\s*(.*)/m);
    const title = match ? match[1].trim() : `Exercício ${num}`;
    
    bookExercises[num] = {
      folder: info.folder,
      content: content,
      title: title
    };
  }
});
console.log(`Loaded ${Object.keys(bookExercises).length} book exercises.`);

// 3. Load original tests.json
console.log("Loading original tests.json...");
const originalTests = JSON.parse(fs.readFileSync(testsFilePath, 'utf-8'));

// 4. Delete all existing exercise markdown files
console.log("Cleaning up old markdown files from repository directories...");
const foldersToClean = [
  '01_EstruturaSequencial',
  '02_EstruturaDeDecisão',
  '03_EstruturaDeRepetição',
  '04_EstruturaDeDadosDeUmaDimensão',
  '05_EstruturaDeDadosDeDuasDimensões',
  '06_EstruturasHeterogêneas',
  '07_EstruturaDeSubprogramas'
];

let deletedCount = 0;
foldersToClean.forEach(folder => {
  const dirPath = path.join(repoRoot, folder);
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      if ((file.startsWith('Exercicio') || file.startsWith('Exercício')) && file.endsWith('.md')) {
        fs.unlinkSync(path.join(dirPath, file));
        deletedCount++;
      }
    });
  }
});
console.log(`Deleted ${deletedCount} old markdown files.`);

// 5. Setup sorting mapping arrays (difficulty-ordered sequences)
const ch1Normal = [25, 9, 10, 19, 11, 12, 23, 17, 22, 8, 3, 21, 24, 1, 2, 4, 15, 16, 13, 14, 20, 6, 7, 5, 18];
const ch1Challenges = [31, 29, 28, 32, 26, 27, 30];

const ch2Normal = [44, 42, 47, 43, 33, 34, 45, 46, 57, 53, 39, 40, 56, 35, 55, 52, 50, 51, 41, 36, 48, 54, 38, 37, 49];
const ch2Challenges = [59, 62, 63, 58, 64, 60, 61];

const ch3Normal = [66, 69, 65, 67, 68, 70, 73, 74, 82, 75, 76, 89, 87, 88, 71, 79, 78, 77, 84, 85, 86, 72, 83, 81, 80];
const ch3Challenges = [90, 92, 91, 93, 95, 94, 96];

const ch4Normal = [97, 98, 112, 104, 103, 111, 100, 99, 113, 109, 110, 116, 117, 102, 105, 114, 119, 118, 115, 107, 108, 120, 106, 121, 101];
const ch4Challenges = [123, 126, 122, 124, 127, 128, 125];

const ch5Normal = [129, 130, 153, 146, 138, 145, 132, 131, 137, 147, 143, 144, 150, 151, 135, 136, 152, 139, 148, 134, 149, 141, 142, 140, 133];
const ch5Challenges = [159, 155, 158, 154, 156, 157, 160];

const ch6Normal = [178, 177, 176, 181, 180, 179, 175, 172, 173, 174, 184, 183, 182, 185, 165, 166, 167, 168, 164, 163, 162, 161, 169, 170, 171];
const ch6Challenges = [190, 191, 186, 187, 188, 189, 192];

const chapters = [
  { dir: '01_EstruturaSequencial', name: 'Estrutura Sequencial', sorted: [...ch1Normal, ...ch1Challenges], start: 1, capFile: 'cap1.cjs', bookOffset: 0 },
  { dir: '02_EstruturaDeDecisão', name: 'Estrutura de Decisão', sorted: [...ch2Normal, ...ch2Challenges], start: 33, capFile: 'cap2.cjs', bookOffset: 6 },
  { dir: '03_EstruturaDeRepetição', name: 'Estrutura de Repetição', sorted: [...ch3Normal, ...ch3Challenges], start: 65, capFile: 'cap3.cjs', bookOffset: 23 },
  { dir: '04_EstruturaDeDadosDeUmaDimensão', name: 'Estrutura de Dados de Uma Dimensão (Vetores)', sorted: [...ch4Normal, ...ch4Challenges], start: 97, capFile: 'cap4.cjs', bookOffset: 36 },
  { dir: '05_EstruturaDeDadosDeDuasDimensões', name: 'Estrutura de Dados de Duas Dimensões (Matrizes)', sorted: [...ch5Normal, ...ch5Challenges], start: 129, capFile: 'cap5.cjs', bookOffset: 42 },
  { dir: '06_EstruturasHeterogêneas', name: 'Modularização e Estruturas de Dados', sorted: [...ch6Normal, ...ch6Challenges], start: 161, capFile: 'cap6.cjs', bookOffset: 51 }
];

// 6. Generate and Reorganize Exercises sequentially (1 to 192)
console.log("Reorganizing and generating exercises...");
const newTests = {};
let generatedCount = 0;

chapters.forEach(chap => {
  const capList = require(path.join(scratchDir, chap.capFile));
  
  chap.sorted.forEach((srcNum, idx) => {
    const newNum = chap.start + idx;
    const newNumPadded = String(newNum).padStart(2, '0');
    const newKey = `Exercicio${newNumPadded}`;
    
    const isBook = (chap.start === 1 && srcNum <= 25) ||
                   (chap.start === 33 && srcNum <= 47) ||
                   (chap.start === 65 && srcNum <= 83) ||
                   (chap.start === 97 && srcNum <= 121) ||
                   (chap.start === 129 && srcNum <= 151) ||
                   (chap.start === 161 && srcNum <= 171);
                   
    if (isBook) {
      const origBookNum = srcNum - chap.bookOffset;
      const bookEx = bookExercises[origBookNum];
      if (!bookEx) {
        throw new Error(`Book exercise not found in memory: original ${origBookNum}`);
      }
      
      // Update markdown content header: replace first "# 📝 Exercício \d+:" with "# 📝 Exercício {newNum}:"
      let updatedContent = bookEx.content.replace(/^#\s*📝\s*Exercício\s*\d+:/m, `# 📝 Exercício ${newNum}:`);
      
      // Save it to its original folder (to match expected structure)
      const destDir = path.join(repoRoot, bookEx.folder);
      const destPath = path.join(destDir, `Exercicio${newNumPadded}.md`);
      
      fs.writeFileSync(destPath, updatedContent, 'utf-8');
      generatedCount++;
      
      // Map test cases
      const origKey = `Exercicio${String(origBookNum).padStart(2, '0')}`;
      if (originalTests[origKey]) {
        newTests[newKey] = originalTests[origKey];
      } else {
        console.log(`Warning: Test cases not found for original book exercise ${origKey}`);
      }
    } else {
      // It's a new exercise from cap*.cjs
      const ex = capList.find(e => e.num === srcNum);
      if (!ex) {
        throw new Error(`New exercise not found in cap list: num ${srcNum} in ${chap.capFile}`);
      }
      
      // Generate markdown content
      let exemplosMd = '';
      ex.exemplos.forEach((ej, index) => {
        exemplosMd += `- Exemplo ${index + 1}:\n  - Entrada: ${ej.entrada}\n  - Saída: ${ej.saida}\n`;
      });
      if (exemplosMd.endsWith('\n')) {
        exemplosMd = exemplosMd.slice(0, -1);
      }
      
      const markdownContent = `# 📝 Exercício ${newNum}: ${ex.title}

## 📖 Descrição
${ex.description}

## 🚶 Passo a Passo
1. Entrada de Dados:
   - ${ex.entrada}
2. Processamento:
   - ${ex.processamento}
3. Saída de Dados:
   - ${ex.saida}
   
## 🧪 Exemplos
${exemplosMd}
   
## 💻 Exemplo em Pseudocódigo
\`\`\`plaintext
${ex.pseudocode}
\`\`\`
`;
      // Determine destination directory from ex.chapterDir
      const destDir = path.join(repoRoot, ex.chapterDir);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      const destPath = path.join(destDir, `Exercicio${newNumPadded}.md`);
      fs.writeFileSync(destPath, markdownContent, 'utf-8');
      generatedCount++;
      
      // Map test cases
      const formattedCases = ex.testCases.map(tc => {
        return {
          inputs: tc.inputs,
          outputs: tc.outputs,
          matchType: tc.matchType || "any"
        };
      });
      newTests[newKey] = {
        cases: formattedCases
      };
    }
  });
});

console.log(`Generated/Reorganized ${generatedCount} markdown files in total.`);

// 7. Write out new tests.json
fs.writeFileSync(testsFilePath, JSON.stringify(newTests, null, 2), 'utf-8');
console.log(`Successfully rewrote tests.json with ${Object.keys(newTests).length} suites.`);
console.log("Master build and sort completed successfully!");
