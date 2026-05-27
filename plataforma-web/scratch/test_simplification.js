import fs from 'fs';
import path from 'path';

const jsonPath = 'c:/Users/ferreira-mr/Projects/Exercicios_LivroAlgoritmos_JoseAugustoManzano/plataforma-web/src/data/exercises.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

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

const comparison = data.map(ex => {
  return `ID: ${ex.id} (${ex.title})\nBEFORE: ${ex.description}\nAFTER:  ${simplifyDescription(ex.description)}`;
}).join('\n\n---\n\n');

fs.writeFileSync('c:/Users/ferreira-mr/Projects/Exercicios_LivroAlgoritmos_JoseAugustoManzano/plataforma-web/scratch/simplification_comparison.txt', comparison, 'utf-8');
console.log('Comparison saved to scratch/simplification_comparison.txt');
