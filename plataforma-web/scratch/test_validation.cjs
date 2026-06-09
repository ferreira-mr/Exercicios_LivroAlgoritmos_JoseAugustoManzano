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

function stringifyPortugolExpr(expr) {
  if (!expr) return '';
  if (expr.objeto !== undefined && expr.indice !== undefined && expr.valor !== undefined) {
    return `${stringifyPortugolExpr(expr.objeto)}[${stringifyPortugolExpr(expr.indice)}] = ${stringifyPortugolExpr(expr.valor)}`;
  }
  if ((expr.objeto !== undefined || expr.entidadeChamada !== undefined) && expr.indice !== undefined) {
    return `${stringifyPortugolExpr(expr.objeto || expr.entidadeChamada)}[${stringifyPortugolExpr(expr.indice)}]`;
  }
  if (expr.simbolo && expr.tipoOriginal !== undefined) {
    const name = expr.simbolo.lexema;
    const init = expr.inicializador ? ` = ${stringifyPortugolExpr(expr.inicializador)}` : '';
    return `${expr.tipoOriginal || expr.tipo} ${name}${init}`;
  }
  if (expr.alvo !== undefined && expr.valor !== undefined) {
    return `${stringifyPortugolExpr(expr.alvo)} = ${stringifyPortugolExpr(expr.valor)}`;
  }
  if (expr.operador && expr.operando) {
    const lex = expr.operador.lexema;
    const op = stringifyPortugolExpr(expr.operando);
    if (expr.incidenciaOperador === 'DEPOIS') {
      return `${op}${lex}`;
    } else {
      return `${lex}${op}`;
    }
  }
  if (expr.valor !== undefined) {
    if (typeof expr.valor === 'string') return `"${expr.valor}"`;
    return String(expr.valor);
  }
  if (expr.simbolo) {
    return expr.simbolo.lexema;
  }
  if (expr.expressao) {
    return stringifyPortugolExpr(expr.expressao);
  }
  if (expr.esquerda && expr.operador && expr.direita) {
    return `${stringifyPortugolExpr(expr.esquerda)} ${expr.operador.lexema} ${stringifyPortugolExpr(expr.direita)}`;
  }
  if (expr.argumentos) {
    const args = expr.argumentos.map(stringifyPortugolExpr).join(', ');
    const name = expr.simbolo ? expr.simbolo.lexema : (expr.entidadeChamada ? stringifyPortugolExpr(expr.entidadeChamada) : '');
    return `${name}(${args})`;
  }
  return '';
}

function getStaticErrors(declarations) {
  const errors = [];

  function checkStatement(stmt) {
    if (!stmt) return;
    
    const name = stmt.constructor?.name;
    let type = '';
    if (['Escreva', 'EscrevaMesmaLinha', 'Var', 'Expressao', 'Se', 'Enquanto', 'Para'].includes(name)) {
      type = name;
    } else if (stmt.caminhoEntao !== undefined) {
      type = 'Se';
    } else if (stmt.inicializador !== undefined && stmt.incrementar !== undefined) {
      type = 'Para';
    } else if (stmt.corpo !== undefined && stmt.condicao !== undefined) {
      type = 'Enquanto';
    } else if (stmt.inicializador !== undefined || stmt.tipoOriginal !== undefined) {
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
          const lineNum = stmt.linha || expr.linha || 1;
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
          
          errors.push({ line: lineNum, message });
        }
      }
    } else if (type === 'Se') {
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

  declarations.forEach(decl => {
    if (decl && decl.funcao && decl.funcao.corpo) {
      if (Array.isArray(decl.funcao.corpo)) {
        decl.funcao.corpo.forEach(checkStatement);
      }
    } else if (decl && decl.corpo) {
      if (Array.isArray(decl.corpo)) {
        decl.corpo.forEach(checkStatement);
      }
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
