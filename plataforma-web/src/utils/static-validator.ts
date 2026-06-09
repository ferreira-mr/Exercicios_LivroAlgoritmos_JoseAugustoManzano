import { stringifyPortugolExpr } from './flowchart-parser';

export interface StaticError {
  line: number;
  message: string;
  startCol?: number;
  endCol?: number;
  severity?: 'error' | 'warning';
}

/**
 * Helper to collect all variable names referenced inside an expression
 */
function collectVariablesInExpr(expr: any, vars: Set<string>) {
  if (!expr) return;
  const isVarRef = expr.simbolo && 
    (expr.simbolo.tipo === 'IDENTIFICADOR' || expr.simbolo.tipo === 'VARIAVEL') && 
    expr.tipoOriginal === undefined && 
    expr.argumentos === undefined;
  if (isVarRef && expr.simbolo.lexema) {
    vars.add(expr.simbolo.lexema);
  }
  if (expr.esquerda) collectVariablesInExpr(expr.esquerda, vars);
  if (expr.direita) collectVariablesInExpr(expr.direita, vars);
  if (expr.expressao) collectVariablesInExpr(expr.expressao, vars);
  if (expr.valor && typeof expr.valor === 'object') collectVariablesInExpr(expr.valor, vars);
  if (expr.alvo) collectVariablesInExpr(expr.alvo, vars);
  if (expr.indice) collectVariablesInExpr(expr.indice, vars);
  if (expr.objeto) collectVariablesInExpr(expr.objeto, vars);
  if (expr.entidadeChamada) collectVariablesInExpr(expr.entidadeChamada, vars);
  if (Array.isArray(expr.argumentos)) {
    expr.argumentos.forEach((arg: any) => collectVariablesInExpr(arg, vars));
  }
}

/**
 * Helper to check if any of the specified variables are modified (assigned/written to) inside a statement
 */
function hasWriteToVariables(stmt: any, vars: Set<string>): boolean {
  if (!stmt) return false;
  
  if (stmt.expressao) {
    const expr = stmt.expressao;
    if (expr.alvo !== undefined && expr.valor !== undefined) {
      const targetVars = new Set<string>();
      collectVariablesInExpr(expr.alvo, targetVars);
      for (let v of targetVars) {
        if (vars.has(v)) return true;
      }
    }
    const isLeia = expr.simbolo && (expr.simbolo.tipo === 'LEIA' || expr.simbolo.lexema === 'leia');
    if (isLeia && Array.isArray(expr.argumentos)) {
      const targetVars = new Set<string>();
      expr.argumentos.forEach((arg: any) => collectVariablesInExpr(arg, targetVars));
      for (let v of targetVars) {
        if (vars.has(v)) return true;
      }
    }
    if (expr.operador && expr.operando && ['++', '--', '+=', '-=', '*=', '/='].includes(expr.operador.lexema || '')) {
      const targetVars = new Set<string>();
      collectVariablesInExpr(expr.operando, targetVars);
      for (let v of targetVars) {
        if (vars.has(v)) return true;
      }
    }
  }

  // Recurse control statements and blocks
  const thenStmts = stmt.caminhoEntao?.declaracoes || stmt.caminhoEntao || [];
  if (Array.isArray(thenStmts)) {
    for (let s of thenStmts) {
      if (hasWriteToVariables(s, vars)) return true;
    }
  }
  const elseStmts = stmt.caminhoSenao?.declaracoes || stmt.caminhoSenao || [];
  if (Array.isArray(elseStmts)) {
    for (let s of elseStmts) {
      if (hasWriteToVariables(s, vars)) return true;
    }
  }
  const bodyStmts = stmt.corpo?.declaracoes || stmt.corpo || [];
  if (Array.isArray(bodyStmts)) {
    for (let s of bodyStmts) {
      if (hasWriteToVariables(s, vars)) return true;
    }
  }
  if (stmt.inicializador && hasWriteToVariables(stmt.inicializador, vars)) return true;
  if (stmt.incrementar && hasWriteToVariables(stmt.incrementar, vars)) return true;

  return false;
}

/**
 * Validates Portugol Studio AST declarations for:
 * 1. Standalone expressions with no side effects.
 * 2. Undeclared variable references.
 * 3. Unused variables/parameters and assigned-but-never-read warnings.
 * 4. Statically detected division by zero.
 * 5. Loops where condition variables are never updated (infinite loop).
 */
export function getStaticErrors(declarations: any[]): StaticError[] {
  const errors: StaticError[] = [];

  // 1. Collect Globals and Functions
  const declaredGlobals = new Set<string>();
  const globalRefs = new Map<string, { reads: number; writes: number; decl: any }>();
  const functions: any[] = [];

  declarations.forEach(decl => {
    if (!decl) return;
    if (decl.funcao) {
      functions.push(decl);
    } else if (decl.tipoOriginal !== undefined || decl.tipo !== undefined || (decl.simbolo !== undefined && decl.funcao === undefined)) {
      const name = decl.simbolo?.lexema;
      if (name) {
        declaredGlobals.add(name);
        const hasInit = decl.inicializador !== undefined;
        globalRefs.set(name, { reads: 0, writes: hasInit ? 1 : 0, decl });
      }
    }
  });

  // Helper to check expressions for undeclared variables and track reads/writes
  function checkExprVariables(
    expr: any, 
    lineNum: number, 
    locals: Set<string>, 
    localRefs: Map<string, { reads: number; writes: number; decl: any }>,
    isWrite: boolean = false,
    isRead: boolean = true
  ) {
    if (!expr) return;

    // Static check for division by zero
    if (
      expr.operador && 
      expr.operador.lexema === '/' && 
      expr.direita && 
      (expr.direita.valor === 0 || expr.direita.valor === 0.0)
    ) {
      errors.push({
        line: lineNum,
        message: 'Divisão por zero detectada.',
        startCol: expr.direita.simbolo?.colunaInicio || 1,
        endCol: (expr.direita.simbolo?.colunaFim ? expr.direita.simbolo.colunaFim + 1 : 10),
        severity: 'warning'
      });
    }

    const isVarRef = expr.simbolo && 
      (expr.simbolo.tipo === 'IDENTIFICADOR' || expr.simbolo.tipo === 'VARIAVEL') && 
      expr.tipoOriginal === undefined && 
      expr.argumentos === undefined;

    if (isVarRef) {
      const name = expr.simbolo.lexema;
      const isLibrary = name.includes('.');
      if (!isLibrary) {
        if (!declaredGlobals.has(name) && !locals.has(name)) {
          errors.push({
            line: lineNum,
            message: `A variável '${name}' não foi declarada. Declare-a antes de usar (ex: real ${name}).`,
            startCol: expr.simbolo.colunaInicio || 1,
            endCol: (expr.simbolo.colunaFim ? expr.simbolo.colunaFim + 1 : (expr.simbolo.colunaInicio ? expr.simbolo.colunaInicio + name.length : 10)),
            severity: 'error'
          });
        } else {
          // Record usages
          const ref = localRefs.get(name) || globalRefs.get(name);
          if (ref) {
            if (isRead) ref.reads++;
            if (isWrite) ref.writes++;
          }
        }
      }
    }

    // Determine sub-expression roles
    if (expr.esquerda) checkExprVariables(expr.esquerda, lineNum, locals, localRefs, false, true);
    if (expr.direita) checkExprVariables(expr.direita, lineNum, locals, localRefs, false, true);
    
    // Assignment: target = value
    if (expr.alvo !== undefined && expr.valor !== undefined) {
      checkExprVariables(expr.alvo, lineNum, locals, localRefs, true, false);
      checkExprVariables(expr.valor, lineNum, locals, localRefs, false, true);
    } else {
      if (expr.alvo) checkExprVariables(expr.alvo, lineNum, locals, localRefs, isWrite, isRead);
      if (expr.valor && typeof expr.valor === 'object') checkExprVariables(expr.valor, lineNum, locals, localRefs, isWrite, isRead);
    }

    // Leia / Escreva arguments
    const isLeia = expr.simbolo && (expr.simbolo.tipo === 'LEIA' || expr.simbolo.lexema === 'leia');
    if (isLeia && Array.isArray(expr.argumentos)) {
      expr.argumentos.forEach((arg: any) => checkExprVariables(arg, lineNum, locals, localRefs, true, false));
    } else if (Array.isArray(expr.argumentos)) {
      expr.argumentos.forEach((arg: any) => checkExprVariables(arg, lineNum, locals, localRefs, false, true));
    }

    if (expr.expressao) {
      // If the parent is an Expressao statement containing an increment/decrement:
      const inner = expr.expressao;
      const isIncrement = inner.operador && inner.operando && 
        ['++', '--', '+=', '-=', '*=', '/='].includes(inner.operador.lexema || '');
      if (isIncrement) {
        checkExprVariables(inner.operando, lineNum, locals, localRefs, true, true);
      } else {
        checkExprVariables(inner, lineNum, locals, localRefs, isWrite, isRead);
      }
    }

    if (expr.indice) checkExprVariables(expr.indice, lineNum, locals, localRefs, false, true);
    if (expr.objeto) checkExprVariables(expr.objeto, lineNum, locals, localRefs, isWrite, isRead);
    if (expr.entidadeChamada) checkExprVariables(expr.entidadeChamada, lineNum, locals, localRefs, false, true);
  }

  // 2. Process each function
  functions.forEach(funcDecl => {
    const declaredLocals = new Set<string>();
    const localRefs = new Map<string, { reads: number; writes: number; decl: any }>();

    // Collect Parameters
    if (Array.isArray(funcDecl.funcao.parametros)) {
      funcDecl.funcao.parametros.forEach((p: any) => {
        const name = p.simbolo?.lexema;
        if (name) {
          declaredLocals.add(name);
          localRefs.set(name, { reads: 0, writes: 0, decl: p });
        }
      });
    }

    // Collect local variables declared inside the function body
    function collectLocalDeclarations(stmt: any) {
      if (!stmt) return;
      const isVar = stmt.tipoOriginal !== undefined || stmt.tipo !== undefined || (stmt.simbolo !== undefined && stmt.funcao === undefined && stmt.condicao === undefined && stmt.corpo === undefined && stmt.expressao === undefined && stmt.argumentos === undefined);
      
      if (isVar) {
        const varName = stmt.simbolo?.lexema;
        if (varName) {
          declaredLocals.add(varName);
          const hasInit = stmt.inicializador !== undefined;
          localRefs.set(varName, { reads: 0, writes: hasInit ? 1 : 0, decl: stmt });
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
    function checkStatement(stmt: any) {
      if (!stmt) return;
      
      const lineNum = stmt.linha || 1;
      
      // Check expressions inside this statement
      if (stmt.expressao) {
        checkExprVariables(stmt.expressao, lineNum, declaredLocals, localRefs);
      }
      if (stmt.condicao) {
        checkExprVariables(stmt.condicao, lineNum, declaredLocals, localRefs, false, true);
      }
      if (stmt.inicializador) {
        checkExprVariables(stmt.inicializador, lineNum, declaredLocals, localRefs);
      }
      if (stmt.incrementar) {
        checkExprVariables(stmt.incrementar, lineNum, declaredLocals, localRefs, true, true);
      }
      if (Array.isArray(stmt.argumentos)) {
        stmt.argumentos.forEach((arg: any) => checkExprVariables(arg, lineNum, declaredLocals, localRefs, false, true));
      }
      if (stmt.inicializador?.expressao) {
        checkExprVariables(stmt.inicializador.expressao, lineNum, declaredLocals, localRefs);
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

      if (type === 'Expressao') {
        const expr = stmt.expressao;
        if (expr) {
          const isAssignment = expr.alvo !== undefined && expr.valor !== undefined;
          const isVectorAssignment = expr.objeto !== undefined && expr.indice !== undefined && expr.valor !== undefined;
          const isCall = expr.argumentos !== undefined;
          const isIncrementDecrement = expr.operador && expr.operando && 
            ['++', '--', '+=', '-=', '*=', '/='].includes(expr.operador.lexema || '');

          if (!isAssignment && !isVectorAssignment && !isCall && !isIncrementDecrement) {
            let exprStr = '';
            try {
              exprStr = stringifyPortugolExpr(expr);
            } catch (e) {
              exprStr = expr.simbolo?.lexema || 'expressão';
            }
            
            let message = `Instrução inválida: a expressão '${exprStr}' não realiza nenhuma ação (sem atribuição ou chamada de função).`;
            if (expr.simbolo && expr.simbolo.tipo === 'IDENTIFICADOR') {
              message += ` Você esqueceu de atribuir um valor usando o operador '='? Ex: ${exprStr} = <valor>`;
            }

            let startCol = 1;
            let endCol = 10;
            if (expr.simbolo?.colunaInicio) {
              startCol = expr.simbolo.colunaInicio;
              endCol = (expr.simbolo.colunaFim ? expr.simbolo.colunaFim + 1 : startCol + 1);
            } else if (expr.esquerda?.simbolo?.colunaInicio) {
              startCol = expr.esquerda.simbolo.colunaInicio;
              endCol = (expr.direita?.simbolo?.colunaFim ? expr.direita.simbolo.colunaFim + 1 : startCol + 1);
            }

            errors.push({
              line: lineNum,
              message,
              startCol,
              endCol,
              severity: 'error'
            });
          }
        }
      }

      // Recurse control statement blocks
      if (type === 'Se') {
        const thenStmts = stmt.caminhoEntao?.declaracoes || stmt.caminhoEntao || [];
        const elseStmts = stmt.caminhoSenao?.declaracoes || stmt.caminhoSenao || [];
        if (Array.isArray(thenStmts)) thenStmts.forEach(checkStatement);
        if (Array.isArray(elseStmts)) elseStmts.forEach(checkStatement);
      } else if (type === 'Enquanto') {
        // Statically check for infinite loops
        if (stmt.condicao) {
          const condVars = new Set<string>();
          collectVariablesInExpr(stmt.condicao, condVars);
          if (condVars.size > 0 && !hasWriteToVariables(stmt, condVars)) {
            errors.push({
              line: lineNum,
              message: 'Possível loop infinito: nenhuma das variáveis da condição do loop é modificada dentro do corpo.',
              startCol: stmt.condicao.simbolo?.colunaInicio || 1,
              endCol: (stmt.condicao.simbolo?.colunaFim ? stmt.condicao.simbolo.colunaFim + 1 : 20),
              severity: 'warning'
            });
          }
        }
        
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

    // Check unused local variables and parameters
    localRefs.forEach((ref, name) => {
      const isParam = funcDecl.funcao.parametros?.some((p: any) => p.simbolo?.lexema === name);
      if (ref.reads === 0 && ref.writes === 0) {
        const typeStr = isParam ? 'O parâmetro' : 'A variável';
        errors.push({
          line: ref.decl.linha || 1,
          message: `${typeStr} '${name}' não está sendo usada.`,
          startCol: ref.decl.simbolo?.colunaInicio || 1,
          endCol: (ref.decl.simbolo?.colunaFim ? ref.decl.simbolo.colunaFim + 1 : (ref.decl.simbolo?.colunaInicio ? ref.decl.simbolo.colunaInicio + name.length : 10)),
          severity: 'warning'
        });
      } else if (ref.reads === 0 && ref.writes > 0 && !isParam) {
        errors.push({
          line: ref.decl.linha || 1,
          message: `A variável '${name}' foi declarada e atribuída, mas seu valor nunca é lido.`,
          startCol: ref.decl.simbolo?.colunaInicio || 1,
          endCol: (ref.decl.simbolo?.colunaFim ? ref.decl.simbolo.colunaFim + 1 : (ref.decl.simbolo?.colunaInicio ? ref.decl.simbolo.colunaInicio + name.length : 10)),
          severity: 'warning'
        });
      }
    });
  });

  // 3. Check unused global variables
  globalRefs.forEach((ref, name) => {
    if (ref.reads === 0 && ref.writes === 0) {
      errors.push({
        line: ref.decl.linha || 1,
        message: `A variável global '${name}' não está sendo usada.`,
        startCol: ref.decl.simbolo?.colunaInicio || 1,
        endCol: (ref.decl.simbolo?.colunaFim ? ref.decl.simbolo.colunaFim + 1 : (ref.decl.simbolo?.colunaInicio ? ref.decl.simbolo.colunaInicio + name.length : 10)),
        severity: 'warning'
      });
    } else if (ref.reads === 0 && ref.writes > 0) {
      errors.push({
        line: ref.decl.linha || 1,
        message: `A variável global '${name}' foi declarada e atribuída, mas seu valor nunca é lido.`,
        startCol: ref.decl.simbolo?.colunaInicio || 1,
        endCol: (ref.decl.simbolo?.colunaFim ? ref.decl.simbolo.colunaFim + 1 : (ref.decl.simbolo?.colunaInicio ? ref.decl.simbolo.colunaInicio + name.length : 10)),
        severity: 'warning'
      });
    }
  });

  return errors;
}
