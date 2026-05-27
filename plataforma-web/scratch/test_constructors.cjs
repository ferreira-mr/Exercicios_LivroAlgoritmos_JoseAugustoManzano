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
  console.log('inicializador constructor:', paraNode.inicializador.constructor.name);
  console.log('condicao constructor:', paraNode.condicao.constructor.name);
  console.log('condicao.esquerda constructor:', paraNode.condicao.esquerda.constructor.name);
  console.log('incrementar constructor:', paraNode.incrementar.constructor.name);
  console.log('incrementar.alvo constructor:', paraNode.incrementar.alvo.constructor.name);
}

test().catch(console.error);
