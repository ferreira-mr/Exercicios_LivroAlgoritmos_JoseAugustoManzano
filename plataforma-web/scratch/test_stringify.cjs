const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

function stringifyPortugolExpr(expr) {
  if (!expr) return '';

  // Handle variable declarations
  if (expr.simbolo && expr.tipoOriginal !== undefined) {
    const name = expr.simbolo.lexema;
    const init = expr.inicializador ? ` = ${stringifyPortugolExpr(expr.inicializador)}` : '';
    return `${expr.tipoOriginal || expr.tipo} ${name}${init}`;
  }

  // Handle assignment (Atribuir)
  if (expr.alvo !== undefined && expr.valor !== undefined) {
    const name = stringifyPortugolExpr(expr.alvo);
    const val = stringifyPortugolExpr(expr.valor);
    return `${name} = ${val}`;
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
  console.log('--- INICIALIZADOR STRINGIFIED ---');
  console.log(stringifyPortugolExpr(paraNode.inicializador));
  console.log('--- CONDICAO STRINGIFIED ---');
  console.log(stringifyPortugolExpr(paraNode.condicao));
  console.log('--- INCREMENTAR STRINGIFIED ---');
  console.log(stringifyPortugolExpr(paraNode.incrementar));
}

test().catch(console.error);
