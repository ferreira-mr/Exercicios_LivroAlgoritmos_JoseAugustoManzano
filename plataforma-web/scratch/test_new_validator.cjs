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

function getStaticErrors(declarations) {
  const errors = [];

  // 1. Collect Globals and Functions
  const declaredGlobals = new Set();
  const functions = [];

  declarations.forEach(decl => {
    if (!decl) return;
    if (decl.funcao) {
      functions.push(decl);
    } else if (decl.tipoOriginal !== undefined || decl.tipo !== undefined || (decl.simbolo !== undefined && decl.funcao === undefined)) {
      const name = decl.simbolo?.lexema;
      if (name) {
        declaredGlobals.add(name);
      }
    }
  });

  // Helper to check expressions for undeclared variables
  function checkExprVariables(expr, lineNum, locals) {
    if (!expr) return;

    const isVarRef = expr.simbolo && 
      (expr.simbolo.tipo === 'IDENTIFICADOR' || expr.simbolo.tipo === 'VARIAVEL') && 
      expr.tipoOriginal === undefined && 
      expr.argumentos === undefined;

    if (isVarRef) {
      const name = expr.simbolo.lexema;
      const isLibrary = name.includes('.');
      if (!isLibrary && !declaredGlobals.has(name) && !locals.has(name)) {
        errors.push({
          line: lineNum,
          message: `A variável '${name}' não foi declarada. Declare-a antes de usar (ex: real ${name}).`,
          startCol: expr.simbolo.colunaInicio || 1,
          endCol: expr.simbolo.colunaFim || (expr.simbolo.colunaInicio ? expr.simbolo.colunaInicio + name.length : 10)
        });
      }
    }

    // Recurse sub-expressions
    if (expr.esquerda) checkExprVariables(expr.esquerda, lineNum, locals);
    if (expr.direita) checkExprVariables(expr.direita, lineNum, locals);
    if (expr.expressao) checkExprVariables(expr.expressao, lineNum, locals);
    if (expr.valor && typeof expr.valor === 'object') checkExprVariables(expr.valor, lineNum, locals);
    if (expr.alvo) checkExprVariables(expr.alvo, lineNum, locals);
    if (expr.indice) checkExprVariables(expr.indice, lineNum, locals);
    if (expr.objeto) checkExprVariables(expr.objeto, lineNum, locals);
    if (expr.entidadeChamada) checkExprVariables(expr.entidadeChamada, lineNum, locals);
    if (Array.isArray(expr.argumentos)) {
      expr.argumentos.forEach((arg) => checkExprVariables(arg, lineNum, locals));
    }
  }

  // 2. Process each function
  functions.forEach(funcDecl => {
    const declaredLocals = new Set();

    // Collect Parameters
    if (Array.isArray(funcDecl.funcao.parametros)) {
      funcDecl.funcao.parametros.forEach((p) => {
        const name = p.simbolo?.lexema;
        if (name) {
          declaredLocals.add(name);
        }
      });
    }

    // Collect local variables declared inside the function body
    function collectLocalDeclarations(stmt) {
      if (!stmt) return;
      const isVar = stmt.tipoOriginal !== undefined || stmt.tipo !== undefined || (stmt.simbolo !== undefined && stmt.funcao === undefined && stmt.condicao === undefined && stmt.corpo === undefined && stmt.expressao === undefined && stmt.argumentos === undefined);
      
      if (isVar) {
        const varName = stmt.simbolo?.lexema;
        if (varName) {
          declaredLocals.add(varName);
        }
      }

      // Recurse control statements
      if (stmt.caminhoEntao) {
        const thenStmts = stmt.caminhoEntao.declaracoes || stmt.caminhoEntao || [];
        if (Array.isArray(thenStmts)) thenStmts.forEach(collectLocalDeclarations);
      }
      if (stmt.caminhoSenao) {
        const elseStmts = stmt.caminhoSenao.declaracoes || stmt.caminhoSenao || [];
        if (Array.isArray(elseStmts)) elseStmts.forEach(collectLocalDeclarations);
      }
      if (stmt.corpo) {
        const bodyStmts = stmt.corpo.declaracoes || stmt.corpo || [];
        if (Array.isArray(bodyStmts)) bodyStmts.forEach(collectLocalDeclarations);
      }
      if (stmt.inicializador) {
        collectLocalDeclarations(stmt.inicializador);
      }
    }

    const body = funcDecl.funcao.corpo?.declaracoes || funcDecl.funcao.corpo || [];
    if (Array.isArray(body)) {
      body.forEach(collectLocalDeclarations);
    }

    // Check statements in the function body
    function checkStatement(stmt) {
      if (!stmt) return;
      
      const lineNum = stmt.linha || 1;
      
      // Check expressions inside this statement
      if (stmt.expressao) {
        checkExprVariables(stmt.expressao, lineNum, declaredLocals);
      }
      if (stmt.condicao) {
        checkExprVariables(stmt.condicao, lineNum, declaredLocals);
      }
      if (stmt.inicializador) {
        checkExprVariables(stmt.inicializador, lineNum, declaredLocals);
      }
      if (stmt.incrementar) {
        checkExprVariables(stmt.incrementar, lineNum, declaredLocals);
      }
      if (Array.isArray(stmt.argumentos)) {
        stmt.argumentos.forEach((arg) => checkExprVariables(arg, lineNum, declaredLocals));
      }
      if (stmt.inicializador?.expressao) {
        checkExprVariables(stmt.inicializador.expressao, lineNum, declaredLocals);
      }

      // Check for standalone expressions with no action
      let type = '';
      if (stmt.caminhoEntao !== undefined && stmt.condicao !== undefined) {
        type = 'Se';
      } else if (stmt.inicializador !== undefined && stmt.condicao !== undefined && stmt.incrementar !== undefined && stmt.corpo !== undefined) {
        type = 'Para';
      } else if (stmt.corpo !== undefined && stmt.condicao !== undefined) {
        type = 'Enquanto';
      } else if (stmt.tipoOriginal !== undefined || stmt.tipo !== undefined || (stmt.simbolo !== undefined && stmt.funcao === undefined && stmt.condicao === undefined && stmt.corpo === undefined && stmt.expressao === undefined && stmt.argumentos === undefined)) {
        type = 'Var';
      } else if (stmt.expressao !== undefined) {
        type = 'Expressao';
      } else if (stmt.argumentos !== undefined) {
        type = 'Escreva';
      }

      // Recurse control statement blocks
      if (type === 'Se') {
        const thenStmts = stmt.caminhoEntao?.declaracoes || stmt.caminhoEntao || [];
        const elseStmts = stmt.caminhoSenao?.declaracoes || stmt.caminhoSenao || [];
        if (Array.isArray(thenStmts)) thenStmts.forEach(checkStatement);
        if (Array.isArray(elseStmts)) elseStmts.forEach(checkStatement);
      } else if (type === 'Enquanto') {
        const bodyStmts = stmt.corpo?.declaracoes || stmt.corpo || [];
        if (Array.isArray(bodyStmts)) bodyStmts.forEach(checkStatement);
      } else if (type === 'Para') {
        const bodyStmts = stmt.corpo?.declaracoes || stmt.corpo || [];
        if (Array.isArray(bodyStmts)) bodyStmts.forEach(checkStatement);
      }
    }

    if (Array.isArray(body)) {
      body.forEach(checkStatement);
    }
  });

  return errors;
}

async function test() {
  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lex = lexer.mapear(code.split('\n'), -1);
  const parsed = await parser.analisar(lex, -1);
  const errors = getStaticErrors(parsed.declaracoes);
  console.log('--- Static Validation Errors ---');
  console.log(errors);
}

test().catch(console.error);
