const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa {
  funcao inicio() {
      VALOR_DOLAR = 6.29
      leia(valor_reais)
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
  const body = inicioDecl.funcao.corpo;
  const assignmentStmt = body[0];
  const leiaStmt = body[1];
  console.log('assignmentStmt.expressao constructor:', assignmentStmt.expressao.constructor.name);
  console.log('assignmentStmt.expressao.alvo constructor:', assignmentStmt.expressao.alvo.constructor.name);
  console.log('leiaStmt.expressao constructor:', leiaStmt.expressao.constructor.name);
  console.log('leiaStmt.expressao.argumentos[0] constructor:', leiaStmt.expressao.argumentos[0].constructor.name);
  console.log('leiaStmt.expressao.argumentos[0].expressao constructor:', leiaStmt.expressao.argumentos[0].expressao.constructor.name);
}

test().catch(console.error);
