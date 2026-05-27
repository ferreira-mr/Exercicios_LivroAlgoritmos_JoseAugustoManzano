const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa {
  funcao inicio() {
    para (inteiro i = 0; i < 10; i = i + 1) {
      escreva(i)
    }
  }
}
`;

async function test() {
  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lex = lexer.mapear(code.split('\n'), -1);
  const parsed = await parser.analisar(lex, -1);
  
  const inicioDecl = parsed.declaracoes.find(
    d => d.assinaturaMetodo === 'inicio' || d.simbolo?.lexema === 'inicio'
  );
  const paraNode = inicioDecl.funcao.corpo[0];
  console.log('--- PARA NODE ---');
  console.log(JSON.stringify(paraNode, null, 2));
}

test().catch(console.error);
