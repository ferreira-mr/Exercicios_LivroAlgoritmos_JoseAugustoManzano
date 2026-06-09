const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa {
  // Exercício: 5 - Conversão de Dólar para Real
  
  funcao inicio() {
    // Escreva seu código aqui
      VALOR_DOLAR = 6.29
      leia(valor_reais)
  
  }
}
`;

async function test() {
  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lex = lexer.mapear(code.split('\n'), -1);
  console.log('--- Lexer Errors ---', lex.erros);
  const parsed = await parser.analisar(lex, -1);
  console.log('--- Parser Errors ---', parsed.erros);
  console.log('--- Declaracoes Length ---', parsed.declaracoes.length);
}

test().catch(console.error);
