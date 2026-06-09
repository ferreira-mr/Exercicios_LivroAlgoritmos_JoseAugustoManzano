const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa {
  inteiro global_var = 5
  funcao inicio() {
    inteiro local_var = 10
    se (local_var > 0) {
      escreva(local_var)
    } senao {
      leia(local_var)
    }
    enquanto (local_var < 20) {
      local_var = local_var + 1
    }
    para (inteiro i = 0; i < 5; i++) {
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
  
  console.log('--- GLOBAL DECLARATIONS ---');
  parsed.declaracoes.forEach((d, idx) => {
    console.log(`GlobalDecl ${idx}: class=${d.constructor.name}, keys=[${Object.keys(d).join(', ')}]`);
  });

  const inicioDecl = parsed.declaracoes.find(
    d => d.assinaturaMetodo === 'inicio' || d.simbolo?.lexema === 'inicio'
  );
  
  console.log('--- LOCAL STATEMENTS ---');
  inicioDecl.funcao.corpo.forEach((stmt, idx) => {
    if (!stmt) return;
    console.log(`Stmt ${idx}: class=${stmt.constructor.name}, keys=[${Object.keys(stmt).join(', ')}]`);
    if (stmt.constructor.name === 'Se') {
      const thenStmts = stmt.caminhoEntao?.declaracoes || stmt.caminhoEntao || [];
      const elseStmts = stmt.caminhoSenao?.declaracoes || stmt.caminhoSenao || [];
      console.log(`  Se then class=${thenStmts[0]?.constructor?.name}, keys=[${Object.keys(thenStmts[0] || {}).join(', ')}]`);
      console.log(`  Se else class=${elseStmts[0]?.constructor?.name}, keys=[${Object.keys(elseStmts[0] || {}).join(', ')}]`);
    }
    if (stmt.constructor.name === 'Expressao') {
      console.log(`  Expressao.expressao class=${stmt.expressao?.constructor?.name}, keys=[${Object.keys(stmt.expressao || {}).join(', ')}]`);
    }
  });
}

test().catch(console.error);
