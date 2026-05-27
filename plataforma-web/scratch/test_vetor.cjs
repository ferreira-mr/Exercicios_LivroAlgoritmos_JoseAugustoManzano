const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } = require('@designliquido/portugol-studio');

function stringifyPortugolExpr(expr) {
  if (!expr) return '';

  // Handle array/vector index assignment (like vetor[0] = 10)
  if (expr.objeto !== undefined && expr.indice !== undefined && expr.valor !== undefined) {
    const obj = stringifyPortugolExpr(expr.objeto);
    const idx = stringifyPortugolExpr(expr.indice);
    const val = stringifyPortugolExpr(expr.valor);
    return `${obj}[${idx}] = ${val}`;
  }

  // Handle array/vector index access/read (like vetor[0] or entidadeChamada[0])
  if ((expr.objeto !== undefined || expr.entidadeChamada !== undefined) && expr.indice !== undefined) {
    const obj = stringifyPortugolExpr(expr.objeto || expr.entidadeChamada);
    const idx = stringifyPortugolExpr(expr.indice);
    return `${obj}[${idx}]`;
  }

  // Handle variable declarations
  if (expr.simbolo && expr.tipoOriginal !== undefined) {
    const name = expr.simbolo.lexema;
    if (expr.tipoOriginal.includes('[]') && expr.inicializador && expr.inicializador.dimensoes) {
      const baseType = expr.tipoOriginal.replace(/\[\]/g, '');
      const dims = expr.inicializador.dimensoes.map(d => `[${stringifyPortugolExpr(d)}]`).join('');
      return `${baseType} ${name}${dims}`;
    }
    const init = expr.inicializador ? ` = ${stringifyPortugolExpr(expr.inicializador)}` : '';
    return `${expr.tipoOriginal || expr.tipo} ${name}${init}`;
  }

  // Handle assignment (Atribuir)
  if (expr.alvo !== undefined && expr.valor !== undefined) {
    const name = stringifyPortugolExpr(expr.alvo);
    const val = stringifyPortugolExpr(expr.valor);
    return `${name} = ${val}`;
  }

  // Handle unary increment / decrement (e.g. i++ / ++i)
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

const code = `
programa {
  funcao inicio() {
    inteiro vetor[5]
    vetor[0] = 10
    escreva(vetor[0])
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
  console.log('--- VETOR DECLARATION STRINGIFIED ---');
  console.log(stringifyPortugolExpr(inicioDecl.funcao.corpo[0]));
  console.log('--- VETOR ASSIGNMENT STRINGIFIED ---');
  console.log(stringifyPortugolExpr(inicioDecl.funcao.corpo[1].expressao));
  console.log('--- VETOR ACCESS STRINGIFIED ---');
  console.log(stringifyPortugolExpr(inicioDecl.funcao.corpo[2].argumentos[0]));
}

test().catch(console.error);
