const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const codeWithParserError = `
programa {
  funcao inicio() {
      VALOR_DOLAR = 6.29
      leia(valor_reais)
      escreva("hello" // missing parenthesis here
  }
}
`;

async function test() {
  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lex = lexer.mapear(codeWithParserError.split('\n'), -1);
  const parsed = await parser.analisar(lex, -1);
  console.log('--- Parser Errors ---', parsed.erros);
  console.log('--- Declaracoes ---', JSON.stringify(parsed.declaracoes, null, 2));
}

test().catch(console.error);
