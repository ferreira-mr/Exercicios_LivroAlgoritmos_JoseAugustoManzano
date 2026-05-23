const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, '..', 'src', 'data', 'exercises.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'tests.json');

const exercises = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

// Helper to generate arrays easily
function repeatElements(count, ...elements) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(...elements.map(el => typeof el === 'function' ? el(i) : el));
  }
  return result;
}

const tests = {};

// Fallback parsing logic for Chapter 1 and Chapter 2 examples
function parseExamplesForExercise(ex) {
  const cases = [];
  const rawExamples = ex.examples;
  if (!rawExamples) return null;

  const exampleBlocks = rawExamples.split(/- Exemplo \d+:/gi);
  for (const block of exampleBlocks) {
    if (!block.trim()) continue;

    const entradaMatch = block.match(/-\s*Entrada:\s*(.*)/i);
    const saidaMatch = block.match(/-\s*Saída:\s*(.*)/i);

    if (entradaMatch && saidaMatch) {
      const entradaStr = entradaMatch[1];
      const saidaStr = saidaMatch[1];

      // Match float, integers, negative numbers
      const inputs = [];
      const numberRegex = /-?\d+(?:\.\d+)?/g;
      let match;
      while ((match = numberRegex.exec(entradaStr)) !== null) {
        inputs.push(match[0]);
      }

      // Output sanitization
      let expectedOutput = saidaStr.split('(')[0].trim().split(' ')[0].trim();
      // Remove trailing letters/formatting
      expectedOutput = expectedOutput.replace(/[^\d.-]/g, '');

      if (inputs.length > 0 && expectedOutput) {
        const outputs = [expectedOutput];
        const parsed = parseFloat(expectedOutput);
        if (!isNaN(parsed)) {
          const str = parsed.toString();
          if (!outputs.includes(str)) {
            outputs.push(str);
          }
          if (str.includes('.')) {
            const rounded2 = parsed.toFixed(2);
            if (!outputs.includes(rounded2)) {
              outputs.push(rounded2);
            }
            const rounded1 = parsed.toFixed(1);
            if (!outputs.includes(rounded1)) {
              outputs.push(rounded1);
            }
            const intPart = Math.round(parsed).toString();
            if (!outputs.includes(intPart)) {
              outputs.push(intPart);
            }
          }
        }
        cases.push({
          inputs,
          outputs,
          matchType: "any"
        });
      }
    }
  }
  return cases.length > 0 ? cases : null;
}

// Custom rules for Chapters 3 to 7
const customRules = {
  // ================= CHAPTER 1 & 2: SEQUENCIAL & DECISÃO (MANUAL RULES) =================
  Exercicio06: {
    cases: [
      { inputs: ["5", "10"], outputs: ["10", "5"], matchType: "all" },
      { inputs: ["7", "3"], outputs: ["3", "7"], matchType: "all" }
    ]
  },
  Exercicio07: {
    cases: [
      { inputs: ["1", "2", "3", "4"], outputs: ["3", "4", "5", "6", "7", "2", "8", "12"], matchType: "all" },
      { inputs: ["2", "2", "2", "2"], outputs: ["4", "8"], matchType: "all" }
    ]
  },
  Exercicio15: {
    cases: [
      { inputs: ["2", "3", "4", "5"], outputs: ["8", "8"], matchType: "all" },
      { inputs: ["10", "5", "3", "7"], outputs: ["30", "12"], matchType: "all" }
    ]
  },
  Exercicio16: {
    cases: [
      { inputs: ["1000", "10"], outputs: ["1100", "100"], matchType: "all" },
      { inputs: ["2000", "5"], outputs: ["2100", "100"], matchType: "all" }
    ]
  },
  Exercicio18: {
    cases: [
      { inputs: ["200", "150", "100", "50", "30"], outputs: ["530", "37.74", "28.30", "18.87", "9.43", "5.66"], matchType: "all" },
      { inputs: ["300", "180", "120", "20", "40"], outputs: ["660", "45.45", "27.27", "18.18", "3.03", "6.06"], matchType: "all" }
    ]
  },
  Exercicio19: {
    cases: [
      { inputs: ["10", "5"], outputs: ["15", "5", "50", "2"], matchType: "all" },
      { inputs: ["20", "8"], outputs: ["28", "12", "160", "2.5"], matchType: "all" }
    ]
  },
  Exercicio20: {
    cases: [
      { inputs: ["100", "2"], outputs: ["27.78", "27.7", "27.8"], matchType: "any" },
      { inputs: ["50", "1"], outputs: ["13.89", "13.8", "13.9"], matchType: "any" }
    ]
  },
  Exercicio25: {
    cases: [
      { inputs: ["5"], outputs: ["6", "4"], matchType: "all" },
      { inputs: ["-3"], outputs: ["-2", "-4"], matchType: "all" }
    ]
  },
  Exercicio27: {
    cases: [
      { inputs: ["10", "5"], outputs: ["5"], matchType: "any" },
      { inputs: ["20", "8"], outputs: ["12"], matchType: "any" },
      { inputs: ["-5", "3"], outputs: ["8", "-8"], matchType: "any" }
    ]
  },
  Exercicio28: {
    cases: [
      { inputs: ["-5"], outputs: ["negativo", "neg"], matchType: "any" },
      { inputs: ["10"], outputs: ["positivo", "pos"], matchType: "any" },
      { inputs: ["0"], outputs: ["neutro", "zero"], matchType: "any" }
    ]
  },
  Exercicio29: {
    cases: [
      { inputs: ["7", "6", "4", "5"], outputs: ["5.5", "aprovado"], matchType: "all" },
      { inputs: ["6", "5", "3", "4"], outputs: ["4.5", "reprovado"], matchType: "all" }
    ]
  },
  Exercicio30: {
    cases: [
      { inputs: ["8", "8", "7", "9"], outputs: ["8", "aprovado"], matchType: "all" },
      { inputs: ["5", "6", "5", "6", "8"], outputs: ["5.5", "6.75", "aprovado"], matchType: "all" },
      { inputs: ["4", "4", "4", "4", "3"], outputs: ["4", "3.5", "reprovado"], matchType: "all" }
    ]
  },
  Exercicio35: {
    cases: [
      { inputs: ["10", "5", "8", "12", "3"], outputs: ["12", "3"], matchType: "all" },
      { inputs: ["-1", "-5", "-3", "-8", "-2"], outputs: ["-1", "-8"], matchType: "all" }
    ]
  },
  Exercicio36: {
    cases: [
      { inputs: ["7"], outputs: ["impar", "ímpar"], matchType: "any" },
      { inputs: ["10"], outputs: ["par"], matchType: "any" }
    ]
  },
  Exercicio37: {
    cases: [
      { inputs: ["5"], outputs: ["permitida", "dentro"], matchType: "any" },
      { inputs: ["10"], outputs: ["nao", "não", "fora"], matchType: "any" }
    ]
  },
  // ================= CHAPTER 3: REPETIÇÃO =================
  Exercicio42: {
    cases: [{ inputs: [], outputs: ["225", "40000", "900", "10000"] }]
  },
  Exercicio43: {
    cases: [
      { inputs: ["5"], outputs: ["5 x 1 = 5", "5 x 10 = 50", "25", "35"] },
      { inputs: ["9"], outputs: ["9 x 1 = 9", "9 x 10 = 90", "45", "63"] }
    ]
  },
  Exercicio44: {
    cases: [{ inputs: [], outputs: ["5050"] }]
  },
  Exercicio45: {
    cases: [{ inputs: [], outputs: ["62750"] }]
  },
  Exercicio46: {
    cases: [{ inputs: [], outputs: ["1", "199", "101", "53"] }]
  },
  Exercicio47: {
    cases: [{ inputs: [], outputs: ["4", "196", "100", "88"] }]
  },
  Exercicio48: {
    cases: [{ inputs: [], outputs: ["3^0 = 1", "3^15 = 14348907", "14348907"] }]
  },
  Exercicio49: {
    cases: [
      { inputs: ["2", "10"], outputs: ["1024", "2 elevado a 10"] },
      { inputs: ["5", "3"], outputs: ["125", "5 elevado a 3"] }
    ]
  },
  Exercicio50: {
    cases: [{ inputs: [], outputs: ["0", "1", "377", "233", "144"] }]
  },
  Exercicio51: {
    cases: [{ inputs: [], outputs: ["50", "212", "10°C = 50°F", "100°C = 212°F"] }]
  },
  Exercicio52: {
    cases: [{ inputs: [], outputs: ["18446744073709551615", "1.84"] }]
  },
  Exercicio53: {
    cases: [
      { inputs: repeatElements(15, "1"), outputs: ["15"] },
      { inputs: repeatElements(15, (i) => i % 3 === 0 ? "1" : (i % 3 === 1 ? "2" : "3")), outputs: ["45"] } // sum of 5*(1!+2!+3!) = 5*(1+2+6) = 45
    ]
  },
  Exercicio54: {
    cases: [
      { inputs: repeatElements(10, "10"), outputs: ["100", "10"] },
      { inputs: repeatElements(10, "5"), outputs: ["50", "5"] }
    ]
  },
  Exercicio55: {
    cases: [
      { inputs: ["10", "20", "30", "0"], outputs: ["60", "20", "3"] },
      { inputs: ["8", "12", "-1"], outputs: ["20", "10", "2"] }
    ]
  },
  Exercicio56: {
    cases: [{ inputs: [], outputs: ["Infinity", "infinito"] }]
  },
  Exercicio57: {
    cases: [
      { inputs: ["Sala", "5", "4", "SIM", "Cozinha", "3", "3", "NAO"], outputs: ["29"] },
      { inputs: ["Quarto", "4", "3", "NAO"], outputs: ["12"] }
    ]
  },
  Exercicio58: {
    cases: [
      { inputs: ["10", "5", "20", "-1"], outputs: ["20", "5"] },
      { inputs: ["100", "-5"], outputs: ["100"] }
    ]
  },
  Exercicio59: {
    cases: [
      { inputs: ["15", "3"], outputs: ["5"] },
      { inputs: ["17", "5"], outputs: ["3"] }
    ]
  },
  Exercicio60: {
    cases: [{ inputs: [], outputs: ["225", "39204", "324", "10000"] }]
  },

  // ================= CHAPTER 4: VETORES =================
  Exercicio61: {
    cases: [
      { inputs: repeatElements(10, (i) => `Nome${i}`), outputs: ["Nome0", "Nome9", "Nome4"] }
    ]
  },
  Exercicio62: {
    cases: [
      { inputs: repeatElements(8, (i) => String(i + 1)), outputs: ["3", "6", "24", "15"] }
    ]
  },
  Exercicio63: {
    cases: [
      { inputs: [...repeatElements(20, "10"), ...repeatElements(20, "3")], outputs: ["7"] }
    ]
  },
  Exercicio64: {
    cases: [
      { inputs: repeatElements(15, "2"), outputs: ["4"] }
    ]
  },
  Exercicio65: {
    cases: [
      { inputs: repeatElements(15, "3"), outputs: ["6"] }
    ]
  },
  Exercicio66: {
    cases: [
      { inputs: [...repeatElements(15, "1"), ...repeatElements(15, "2")], outputs: ["1", "2"] }
    ]
  },
  Exercicio67: {
    cases: [
      { inputs: [...repeatElements(20, "A"), ...repeatElements(30, "B")], outputs: ["A", "B"] }
    ]
  },
  Exercicio68: {
    cases: [
      { inputs: repeatElements(20, (i) => String(i + 1)), outputs: ["20", "1", "10"] }
    ]
  },
  Exercicio69: {
    cases: [
      { inputs: [...repeatElements(5, "1"), ...repeatElements(5, "2"), ...repeatElements(5, "3")], outputs: ["1", "2", "3"] }
    ]
  },
  Exercicio70: {
    cases: [
      { inputs: repeatElements(20, "5"), outputs: ["15"] }
    ]
  },
  Exercicio71: {
    cases: [
      { inputs: repeatElements(10, "5"), outputs: ["-5"] }
    ]
  },
  Exercicio72: {
    cases: [
      { inputs: repeatElements(10, "20"), outputs: ["10"] }
    ]
  },
  Exercicio73: {
    cases: [
      { inputs: ["9"], outputs: ["9", "90", "45"] }
    ]
  },
  Exercicio74: {
    cases: [
      { inputs: repeatElements(20, "15"), outputs: ["15"] }
    ]
  },
  Exercicio75: {
    cases: [
      { inputs: repeatElements(25, "25"), outputs: ["77"] }
    ]
  },
  Exercicio76: {
    cases: [
      { inputs: repeatElements(12, "3"), outputs: ["6"] }
    ]
  },
  Exercicio77: {
    cases: [
      { inputs: repeatElements(15, "10"), outputs: ["5", "15"] }
    ]
  },
  Exercicio78: {
    cases: [
      { inputs: [...repeatElements(6, "1"), ...repeatElements(6, "2")], outputs: ["1", "2"] }
    ]
  },
  Exercicio79: {
    cases: [
      { inputs: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"], outputs: ["2", "3", "12", "13"] }
    ]
  },
  Exercicio80: {
    cases: [
      { inputs: [...repeatElements(10, "6"), ...repeatElements(10, "5")], outputs: ["6", "5"] }
    ]
  },
  Exercicio81: {
    cases: [
      { inputs: [...repeatElements(10, "2"), ...repeatElements(10, "4")], outputs: ["2", "4"] }
    ]
  },
  Exercicio82: {
    cases: [
      { inputs: [...repeatElements(15, "2"), ...repeatElements(15, "3")], outputs: ["15"] }
    ]
  },
  Exercicio83: {
    cases: [
      { inputs: [...repeatElements(10, "2"), ...repeatElements(10, "3")], outputs: ["25"] }
    ]
  },
  Exercicio84: {
    cases: [
      { inputs: repeatElements(6, (i) => String(i + 1)), outputs: ["2", "1", "4", "3", "6", "5"] }
    ]
  },
  Exercicio85: {
    cases: [
      { inputs: ["5", "3", "9", "1", "8", "2", "7", "4", "6", "0"], outputs: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] }
    ]
  },
  Exercicio86: {
    cases: [
      { inputs: ["5", "3", "9", "1", "8", "2", "7", "4", "6", "0"], outputs: ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"] }
    ]
  },

  // ================= CHAPTER 5: MATRIZES =================
  Exercicio87: {
    cases: [
      { inputs: [...repeatElements(15, "2"), ...repeatElements(15, "3")], outputs: ["5"] }
    ]
  },
  Exercicio88: {
    cases: [
      { inputs: [...repeatElements(7, "1"), ...repeatElements(7, "2")], outputs: ["1", "2"] }
    ]
  },
  Exercicio89: {
    cases: [
      { inputs: repeatElements(20, "4"), outputs: ["4"] }
    ]
  },
  Exercicio90: {
    cases: [
      { inputs: repeatElements(10, "3"), outputs: ["8", "6", "9"] }
    ]
  },
  Exercicio91: {
    cases: [
      { inputs: [...repeatElements(12, "5"), ...repeatElements(12, "10")], outputs: ["10", "5"] }
    ]
  },
  Exercicio92: {
    cases: [
      { inputs: repeatElements(20, "3"), outputs: ["6"] }
    ]
  },
  Exercicio93: {
    cases: [
      { inputs: repeatElements(20, "25"), outputs: ["77"] }
    ]
  },
  Exercicio94: {
    cases: [
      { inputs: repeatElements(25, "5"), outputs: ["5", "10"] }
    ]
  },
  Exercicio95: {
    cases: [
      { inputs: repeatElements(49, "4"), outputs: ["10", "12"] }
    ]
  },
  Exercicio96: {
    cases: [
      { inputs: repeatElements(30, "10"), outputs: ["15"] },
      { inputs: repeatElements(30, "5"), outputs: ["1"] }
    ]
  },
  Exercicio97: {
    cases: [
      { inputs: repeatElements(25, "3"), outputs: ["15"] }
    ]
  },
  Exercicio98: {
    cases: [
      { inputs: repeatElements(25, "2"), outputs: ["50"] }
    ]
  },
  Exercicio99: {
    cases: [
      { inputs: repeatElements(25, "5"), outputs: ["20"] }
    ]
  },
  Exercicio100: {
    cases: [
      { inputs: [...repeatElements(24, "2"), ...repeatElements(25, "3")], outputs: ["24"] }
    ]
  },
  Exercicio101: {
    cases: [
      { inputs: repeatElements(48, "2"), outputs: ["192", "12"] }
    ]
  },
  Exercicio102: {
    cases: [
      { inputs: [...repeatElements(35, "2"), ...repeatElements(35, "3")], outputs: ["35", "50%"] }
    ]
  },
  Exercicio103: {
    cases: [
      { inputs: repeatElements(20, "2"), outputs: ["10", "8"] }
    ]
  },
  Exercicio104: {
    cases: [
      { inputs: [...repeatElements(4, "2"), ...repeatElements(4, "3"), ...repeatElements(4, "4"), ...repeatElements(4, "5")], outputs: ["4", "9", "16", "25"] }
    ]
  },
  Exercicio105: {
    cases: [
      { inputs: [...repeatElements(20, "12"), ...repeatElements(20, "30")], outputs: ["42"] }
    ]
  },
  Exercicio106: {
    cases: [
      { inputs: [...repeatElements(20, "24"), ...repeatElements(20, "30")], outputs: ["-6"] }
    ]
  },
  Exercicio107: {
    cases: [
      { inputs: [...repeatElements(20, "3"), ...repeatElements(20, "30")], outputs: ["90"] }
    ]
  },
  Exercicio108: {
    cases: [
      { inputs: [...repeatElements(25, "5"), ...repeatElements(25, "10")], outputs: ["15"] }
    ]
  },
  Exercicio109: {
    cases: [
      { inputs: repeatElements(25, "5"), outputs: ["10", "15"] }
    ]
  },

  // ================= CHAPTER 6 & 7: REGISTROS & SUBPROGRAMAS =================
  Exercicio110: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(10, 
            (i) => `Nome${String(i).padStart(2, '0')}`,
            (i) => `Endereço${String(i).padStart(2, '0')}`,
            (i) => `100${i}`
          ),
          "4", // Apresentar todos
          "5"  // Sair
        ],
        outputs: ["Nome00", "Nome09", "Endereço00", "1009"]
      }
    ]
  },
  Exercicio111: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(20, 
            (i) => `Aluno${String(i).padStart(2, '0')}`,
            "6", "6", "6", "6"
          ),
          "3", // Apresentar todos
          "4"  // Sair
        ],
        outputs: ["Aluno00", "Aluno19", "6.0", "Aprovado"]
      }
    ]
  },
  Exercicio112: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(15, 
            (i) => `Nome${String(i).padStart(2, '0')}`,
            "1.7"
          ),
          "5", // Apresentar média e total
          "6"  // Sair
        ],
        outputs: ["Nome00", "Nome14", "1.7"]
      }
    ]
  },
  Exercicio113: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(20, 
            (i) => `10${String(i).padStart(2, '0')}`,
            (i) => `Func${String(i).padStart(2, '0')}`,
            "1200"
          ),
          "4", // Salários acima de 1000
          "7"  // Sair
        ],
        outputs: ["Func00", "Func19", "1200"]
      }
    ]
  },
  Exercicio114: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(10, 
            (i) => `Nome${String(i).padStart(2, '0')}`,
            (i) => `Rua${String(i).padStart(2, '0')}`,
            (i) => `99${i}`
          ),
          "4", // Apresentar todos
          "5"  // Sair
        ],
        outputs: ["Nome00", "Nome09", "Rua09", "990"]
      }
    ]
  },
  Exercicio115: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(20, 
            (i) => `Aluno${String(i).padStart(2, '0')}`,
            "6", "6", "6", "6"
          ),
          "3", // Apresentar todos
          "6"  // Sair
        ],
        outputs: ["Aluno00", "Aluno19", "6.0", "Aprovado"]
      }
    ]
  },
  Exercicio116: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(15, 
            (i) => `Nome${String(i).padStart(2, '0')}`,
            "1.7"
          ),
          "4", // Apresentar todos
          "6"  // Sair
        ],
        outputs: ["Nome00", "Nome14", "1.7"]
      }
    ]
  },
  Exercicio117: {
    cases: [
      {
        inputs: [
          "1", // Cadastrar
          ...repeatElements(20, 
            (i) => `10${String(i).padStart(2, '0')}`,
            (i) => `Func${String(i).padStart(2, '0')}`,
            "1200"
          ),
          "4", // Acima de 1000
          "7"  // Sair
        ],
        outputs: ["Func00", "Func19", "1200"]
      }
    ]
  }
};

// Process all exercises
exercises.forEach(ex => {
  if (customRules[ex.id]) {
    const rule = customRules[ex.id];
    rule.cases = rule.cases.map(c => ({
      matchType: c.matchType || "all",
      ...c
    }));
    tests[ex.id] = rule;
  } else {
    // Parse from examples for chapters 1 and 2
    const cases = parseExamplesForExercise(ex);
    if (cases) {
      tests[ex.id] = { cases };
    } else {
      // Default fallback just in case
      tests[ex.id] = {
        cases: [
          { inputs: ["5"], outputs: ["25", "10", "0", "5"], matchType: "any" }
        ]
      };
    }
  }
});

// Manual overrides for specific Chapter 1/2 exercises if needed
// Exercicio04 requires distance and vehicle consumption. We override to supply 2 inputs
tests["Exercicio04"] = {
  cases: [
    { inputs: ["240", "12"], outputs: ["20"], matchType: "any" },
    { inputs: ["360", "12"], outputs: ["30"], matchType: "any" },
    { inputs: ["180", "12"], outputs: ["15"], matchType: "any" }
  ]
};

// Exercicio05: Prestação em atraso (Original, tempo)
// Let's supply original value and months. In exercises examples, the interest rate of 1% is assumed constant in pseudocode.
// Original = 1000, tempo = 3 -> Prestação = 1030
tests["Exercicio05"] = {
  cases: [
    { inputs: ["1000", "3"], outputs: ["1030"], matchType: "any" },
    { inputs: ["500", "2"], outputs: ["510"], matchType: "any" },
    { inputs: ["1500", "5"], outputs: ["1575"], matchType: "any" }
  ]
};

// Save tests.json
fs.writeFileSync(outputPath, JSON.stringify(tests, null, 2), 'utf8');
console.log(`Successfully generated ${Object.keys(tests).length} test cases in ${outputPath}`);
