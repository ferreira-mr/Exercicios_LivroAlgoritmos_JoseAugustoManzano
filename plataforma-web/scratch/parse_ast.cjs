const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `programa {
  funcao inicio() {
    inteiro x
    x = 5
    enquanto (x < 10) {
      x = x + 1
    }
    para (inteiro i = 0; i < 5; i++) {
      escreva(i)
    }
  }
}`;

const lexer = new LexadorPortugolStudio();
const parser = new AvaliadorSintaticoPortugolStudio();
const lex = lexer.mapear(code.split('\n'), -1);

async function run() {
  const parsed = await parser.analisar(lex, -1);
  const d = parsed.declaracoes[0];
  console.log('funcao.corpo length:', d.funcao.corpo.length);
  d.funcao.corpo.forEach((stmt, idx) => {
    console.log(`\nNode ${idx}: ${stmt.constructor.name}`);
    if (stmt.constructor.name === 'Expressao') {
      console.log('  Expressao type:', stmt.expressao.constructor.name);
      if (stmt.expressao.constructor.name === 'Atribuir') {
        console.log('    atribuir alvo constructor:', stmt.expressao.alvo.constructor.name);
        console.log('    atribuir alvo keys:', Object.keys(stmt.expressao.alvo));
        if (stmt.expressao.alvo.simbolo) {
          console.log('      alvo simbolo lexema:', stmt.expressao.alvo.simbolo.lexema);
        }
      }
    }
    if (stmt.constructor.name === 'Enquanto') {
      console.log('  enquanto keys:', Object.keys(stmt));
      console.log('  enquanto corpo constructor:', stmt.corpo.constructor.name);
      console.log('  enquanto corpo keys:', Object.keys(stmt.corpo));
      if (stmt.corpo.declaracoes) {
        console.log('    enquanto corpo.declaracoes:', stmt.corpo.declaracoes.map(s => s.constructor.name));
      }
    }
    if (stmt.constructor.name === 'Para') {
      console.log('  para keys:', Object.keys(stmt));
      console.log('  para corpo constructor:', stmt.corpo.constructor.name);
      console.log('  para corpo keys:', Object.keys(stmt.corpo));
      if (stmt.corpo.declaracoes) {
        console.log('    para corpo.declaracoes:', stmt.corpo.declaracoes.map(s => s.constructor.name));
      }
    }
  });
}

run().catch(console.error);
