const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa {
  funcao inicio() {
    escreva(somar(1, 2))
  }
  funcao inteiro somar(inteiro a, inteiro b) {
    retorne a + b
  }
}
`;

async function test() {
  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lex = lexer.mapear(code.split('\n'), -1);
  const parsed = await parser.analisar(lex, -1);
  console.log('--- DECLARATIONS ---');
  console.log(JSON.stringify(parsed.declaracoes, null, 2));
}

test().catch(console.error);
