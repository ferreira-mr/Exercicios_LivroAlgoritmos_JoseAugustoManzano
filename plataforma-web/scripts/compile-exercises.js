import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to script
const workspaceRoot = path.resolve(__dirname, '../..');
const outputDir = path.resolve(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'exercises.json');

const chapters = [
  { dir: '01_EstruturaSequencial', name: 'Estrutura Sequencial' },
  { dir: '02_EstruturaDeDecisão', name: 'Estrutura de Decisão' },
  { dir: '03_EstruturaDeRepetição', name: 'Estrutura de Repetição' },
  { dir: '04_EstruturaDeDadosDeUmaDimensão', name: 'Estrutura de Dados de Uma Dimensão (Vetores)' },
  { dir: '05_EstruturaDeDadosDeDuasDimensões', name: 'Estrutura de Dados de Duas Dimensões (Matrizes)' },
  { dir: '06_EstruturasHeterogêneas', name: 'Estruturas Heterogêneas (Registros)' },
  { dir: '07_EstruturaDeSubprogramas', name: 'Estrutura de Subprogramas (Funções e Procedimentos)' }
];

function parseExercise(filePath, chapterName, chapterDir) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath, '.md');
  
  // Extract number and title from header
  const titleMatch = content.match(/^#\s*📝\s*Exercício\s*(\d+):\s*(.*)/m);
  let number = 0;
  let title = filename;
  
  if (titleMatch) {
    number = parseInt(titleMatch[1], 10);
    title = titleMatch[2].trim();
  } else {
    // Fallback: try parsing number from filename
    const numMatch = filename.match(/\d+/);
    if (numMatch) {
      number = parseInt(numMatch[0], 10);
    }
  }

  // Split by headers (e.g. ## )
  const parts = content.split(/\n##\s+/);
  let description = '';
  let steps = '';
  let examples = '';
  let pseudocode = '';

  for (const part of parts) {
    if (part.startsWith('📖 Descrição') || part.startsWith('Descrição')) {
      description = part.replace(/^.*?Descrição\r?\n/, '').trim();
    } else if (part.startsWith('🚶 Passo a Passo') || part.startsWith('Passo a Passo')) {
      steps = part.replace(/^.*?Passo a Passo\r?\n/, '').trim();
    } else if (part.startsWith('🧪 Exemplos') || part.startsWith('Exemplos')) {
      examples = part.replace(/^.*?Exemplos\r?\n/, '').trim();
    } else if (part.startsWith('💻 Exemplo em Pseudocódigo') || part.startsWith('Exemplo em Pseudocódigo')) {
      let codePart = part.replace(/^.*?Exemplo em Pseudocódigo\r?\n/, '').trim();
      // Remove code block backticks if present
      codePart = codePart.replace(/^```[a-zA-Z]*\r?\n/, '').replace(/\r?\n```$/, '').trim();
      pseudocode = codePart;
    }
  }

  return {
    id: filename,
    number,
    title,
    chapterDir,
    chapterName,
    description,
    steps,
    examples,
    pseudocode
  };
}

function run() {
  console.log('Compiling exercises...');
  const allExercises = [];

  for (const chapter of chapters) {
    const chapterPath = path.join(workspaceRoot, chapter.dir);
    if (!fs.existsSync(chapterPath)) {
      console.warn(`Chapter directory not found: ${chapterPath}`);
      continue;
    }

    const files = fs.readdirSync(chapterPath)
      .filter(f => f.startsWith('Exercicio') && f.endsWith('.md'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        return numA - numB;
      });

    console.log(`Processing ${files.length} exercises in ${chapter.dir}...`);

    for (const file of files) {
      const filePath = path.join(chapterPath, file);
      try {
        const exerciseData = parseExercise(filePath, chapter.name, chapter.dir);
        allExercises.push(exerciseData);
      } catch (err) {
        console.error(`Error parsing ${filePath}:`, err);
      }
    }
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(allExercises, null, 2), 'utf-8');
  console.log(`Successfully compiled ${allExercises.length} exercises into ${outputFile}`);
}

run();
