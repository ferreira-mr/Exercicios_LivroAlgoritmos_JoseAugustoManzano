const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa {
  funcao inicio() {
    inteiro numero
    inteiro sucessor
    inteiro antecessor

    leia(numero)
    sucessor = numero + 1
    antecessor numero - 1

    escreva(sucessor)
    escreva(antecessor)
  }
}
`;

async function test() {
  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lex = lexer.mapear(code.split('\n'), -1);
  console.log('--- Lexer errors ---', lex.erros);
  const parsed = await parser.analisar(lex, -1);
  console.log('--- Parser errors ---', parsed.erros);
  const inicioDecl = parsed.declaracoes[0]?.funcao?.corpo || parsed.declaracoes[0]?.corpo;
  console.log('--- AST Corpo ---', JSON.stringify(inicioDecl, null, 2));
}

test().catch(console.error);
