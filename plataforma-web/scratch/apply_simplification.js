import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

const chapters = [
  '01_EstruturaSequencial',
  '02_EstruturaDeDecisão',
  '03_EstruturaDeRepetição',
  '04_EstruturaDeDadosDeUmaDimensão',
  '05_EstruturaDeDadosDeDuasDimensões',
  '06_EstruturasHeterogêneas',
  '07_EstruturaDeSubprogramas'
];

function simplifyDescription(desc) {
  let text = desc.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. Remove redundant second sentence (describing inputs, processing, outputs in a wordy way)
  text = text.replace(/O programa (receberá|irá|deve|lerá|fará|realizará|solicitará|apresentará).*?(exibirá|exibindo|apresentará|apresentando|apresentar|exibir|mostrar|resultado).*?\.$/gi, '');
  text = text.replace(/O programa de computador receberá.*?exibirá.*?\.$/gi, '');
  text = text.replace(/O programa de computador lerá.*?apresentará.*?\.$/gi, '');
  text = text.replace(/As entradas.*?exibirá.*?\.$/gi, '');

  text = text.trim();

  // 2. Simplify prefix to "Escreva um programa..."
  const prefixRules = [
    { regex: /^Este exercício tem como objetivo desenvolver um programa simples para\s+/i, replace: 'Escreva um programa para ' },
    { regex: /^Este exercício tem como objetivo desenvolver um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício consiste em desenvolver um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício consiste em desenvolver um programa para\s+/i, replace: 'Escreva um programa para ' },
    { regex: /^Este exercício consiste no desenvolvimento de um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício consiste em elaborar um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício propõe o desenvolvimento de um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício tem por objetivo desenvolver um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício consiste em criar um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício tem o objetivo de desenvolver um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício consiste na elaboração de um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este exercício propõe a elaboração de um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Este programa consiste em apresentar\s+/i, replace: 'Escreva um programa que apresente ' },
    { regex: /^Este programa permite calcular\s+/i, replace: 'Escreva um programa que calcule ' },
    { regex: /^Este programa converte\s+/i, replace: 'Escreva um programa que converta ' },
    { regex: /^Este programa calcula\s+/i, replace: 'Escreva um programa que calcule ' },
    { regex: /^Este programa apresenta\s+/i, replace: 'Escreva um programa que apresente ' },
    { regex: /^Este programa lerá\s+/i, replace: 'Escreva um programa que leia ' },
    { regex: /^Este programa lê\s+/i, replace: 'Escreva um programa que leia ' },
    { regex: /^Este programa realiza\s+/i, replace: 'Escreva um programa que realize ' },
    { regex: /^Elaborar um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Elaborar um programa\s+/i, replace: 'Escreva um programa ' },
    { regex: /^Desenvolva um programa de agenda que\s+/i, replace: 'Escreva um programa de agenda que ' },
    { regex: /^Desenvolva um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Crie um programa de computador que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Crie um programa que\s+/i, replace: 'Escreva um programa que ' },
    { regex: /^Considerando os registros de 20 funcionários, com os campos matrícula, nome e salário, desenvolver um programa que\s+/i, replace: 'Escreva um programa que, utilizando registros de 20 funcionários (matrícula, nome e salário), ' },
    { regex: /^Considerando os registros de 20 funcionários, com os campos matrícula, nome e salário, crie um programa que\s+/i, replace: 'Escreva um programa que, utilizando registros de 20 funcionários (matrícula, nome e salário), ' }
  ];

  for (const p of prefixRules) {
    if (p.regex.test(text)) {
      text = text.replace(p.regex, p.replace);
      break;
    }
  }

  // 3. Grammatical adjustments to subjunctive/imperative
  text = text.replace(/\bapresenta\b/g, 'apresente');
  text = text.replace(/\bexibe\b/g, 'exiba');
  text = text.replace(/\binforma\b/g, 'informe');
  text = text.replace(/\bretorna\b/g, 'retorne');
  text = text.replace(/\barmazena\b/g, 'armazene');
  text = text.replace(/\bconstrói\b/g, 'construa');
  text = text.replace(/\bcalcula\b/g, 'calcule');
  text = text.replace(/\befetua\b/g, 'efetue');
  text = text.replace(/\brealiza\b/g, 'realize');
  text = text.replace(/\bmostra\b/g, 'mostre');
  text = text.replace(/\bresolve\b/g, 'resolva');
  text = text.replace(/\bclassifica\b/g, 'classifique');
  text = text.replace(/\bordena\b/g, 'ordene');

  // General formatting clean up
  text = text.replace(/\s+/g, ' ').trim();

  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (!text.endsWith('.')) {
      text += '.';
    }
  }

  return text;
}

function processMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Split by headers (e.g. ## )
  const parts = content.split(/\n##\s+/);
  let modified = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('📖 Descrição') || part.startsWith('Descrição')) {
      const headerLine = part.match(/^(?:📖\s*)?Descrição\r?\n/i)[0];
      const originalDesc = part.substring(headerLine.length).trim();
      const simplifiedDesc = simplifyDescription(originalDesc);

      if (originalDesc !== simplifiedDesc) {
        // Reconstruct this part with the simplified description
        parts[i] = headerLine + simplifiedDesc + '\n';
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, parts.join('\n## '), 'utf-8');
    return true;
  }
  return false;
}

function run() {
  console.log('Simplifying all exercise markdown files...');
  let modifiedCount = 0;
  let totalCount = 0;

  for (const chapter of chapters) {
    const chapterPath = path.join(workspaceRoot, chapter);
    if (!fs.existsSync(chapterPath)) {
      console.warn(`Chapter directory not found: ${chapterPath}`);
      continue;
    }

    const files = fs.readdirSync(chapterPath).filter(f => f.startsWith('Exercicio') && f.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(chapterPath, file);
      totalCount++;
      try {
        const wasModified = processMarkdownFile(filePath);
        if (wasModified) {
          modifiedCount++;
        }
      } catch (err) {
        console.error(`Error simplifying ${filePath}:`, err);
      }
    }
  }

  console.log(`Simplified ${modifiedCount} of ${totalCount} files.`);

  // Now, compile all exercises to exercises.json
  console.log('Running compile-exercises.js to update exercises.json...');
  try {
    const compileScriptPath = path.join(workspaceRoot, 'plataforma-web/scripts/compile-exercises.js');
    execSync(`node "${compileScriptPath}"`, { stdio: 'inherit' });
    console.log('Successfully recompiled exercises.json!');
  } catch (err) {
    console.error('Error compiling exercises:', err);
  }
}

run();
