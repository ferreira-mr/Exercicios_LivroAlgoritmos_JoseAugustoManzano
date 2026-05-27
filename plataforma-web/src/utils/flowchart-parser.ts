export interface FlowNode {
  id: string;
  type: 'start' | 'end' | 'input' | 'output' | 'process' | 'decision' | 'loop' | 'join';
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  thenBranch?: FlowNode[];
  elseBranch?: FlowNode[];
  bodyBranch?: FlowNode[];
}

export function stringifyPortugolExpr(expr: any): string {
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
      const dims = expr.inicializador.dimensoes.map((d: any) => `[${stringifyPortugolExpr(d)}]`).join('');
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

function getStmtType(stmt: any): string {
  if (!stmt) return '';
  const name = stmt.constructor.name;
  if (['Escreva', 'EscrevaMesmaLinha', 'Var', 'Expressao', 'Se', 'Enquanto', 'Para'].includes(name)) {
    return name;
  }
  if (stmt.caminhoEntao !== undefined) return 'Se';
  if (stmt.inicializador !== undefined && stmt.incrementar !== undefined) return 'Para';
  if (stmt.corpo !== undefined && stmt.condicao !== undefined) return 'Enquanto';
  if (stmt.inicializador !== undefined || stmt.tipoOriginal !== undefined) return 'Var';
  if (stmt.expressao !== undefined) return 'Expressao';
  if (stmt.argumentos !== undefined) return 'Escreva';
  return name;
}

function getExprType(expr: any): string {
  if (!expr) return '';
  const name = expr.constructor.name;
  if (['Leia', 'Atribuir'].includes(name)) {
    return name;
  }
  if (expr.alvo !== undefined && expr.valor !== undefined) return 'Atribuir';
  if (expr.argumentos !== undefined) return 'Leia';
  return name;
}

export function parsePortugolASTToFlowNodes(declarations: any[], functionName: string = 'inicio'): FlowNode[] {
  const funcDecl = declarations.find(
    d => {
      const cleanAssinatura = (d.assinaturaMetodo || '').replace(/[<>]/g, '');
      const cleanLexema = (d.simbolo?.lexema || '').replace(/[<>]/g, '');
      const cleanTarget = functionName.replace(/[<>]/g, '');
      return cleanAssinatura === cleanTarget || cleanLexema === cleanTarget;
    }
  );
  if (!funcDecl || !funcDecl.funcao || !funcDecl.funcao.corpo) {
    return [];
  }

  const parseBlock = (statements: any[]): FlowNode[] => {
    const list: FlowNode[] = [];
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      const type = getStmtType(stmt);
      const id = `pt-${type}-${stmt.linha}-${i}`;

      if (type === 'Comentario') {
        continue;
      }

      if (type === 'Escreva' || type === 'EscrevaMesmaLinha') {
        const args = stmt.argumentos ? stmt.argumentos.map(stringifyPortugolExpr).join(', ') : '';
        list.push({
          id,
          type: 'output',
          text: `escrever(${args})`
        });
      } else if (type === 'Var') {
        const name = stmt.simbolo ? stmt.simbolo.lexema : '';
        const init = stmt.inicializador ? ` = ${stringifyPortugolExpr(stmt.inicializador)}` : '';
        list.push({
          id,
          type: 'process',
          text: `${stmt.tipoOriginal || stmt.tipo} ${name}${init}`
        });
      } else if (type === 'Expressao') {
        const expr = stmt.expressao;
        if (expr) {
          const exprType = getExprType(expr);
          if (exprType === 'Leia') {
            const args = expr.argumentos ? expr.argumentos.map(stringifyPortugolExpr).join(', ') : '';
            list.push({
              id,
              type: 'input',
              text: `ler(${args})`
            });
          } else if (exprType === 'Atribuir') {
            const name = expr.alvo ? stringifyPortugolExpr(expr.alvo) : '';
            const val = expr.valor ? stringifyPortugolExpr(expr.valor) : '';
            list.push({
              id,
              type: 'process',
              text: `${name} = ${val}`
            });
          } else {
            list.push({
              id,
              type: 'process',
              text: stringifyPortugolExpr(expr)
            });
          }
        }
      } else if (type === 'Se') {
        list.push({
          id,
          type: 'decision',
          text: stringifyPortugolExpr(stmt.condicao),
          thenBranch: stmt.caminhoEntao ? parseBlock(stmt.caminhoEntao.declaracoes || []) : [],
          elseBranch: stmt.caminhoSenao ? parseBlock(stmt.caminhoSenao.declaracoes || []) : []
        });
      } else if (type === 'Enquanto') {
        list.push({
          id,
          type: 'loop',
          text: `Enquanto (${stringifyPortugolExpr(stmt.condicao)})`,
          bodyBranch: stmt.corpo ? parseBlock(stmt.corpo.declaracoes || []) : []
        });
      } else if (type === 'Para') {
        const initText = stmt.inicializador ? stringifyPortugolExpr(stmt.inicializador) : '';
        const condText = stmt.condicao ? stringifyPortugolExpr(stmt.condicao) : '';
        const incText = stmt.incrementar ? stringifyPortugolExpr(stmt.incrementar) : '';
        list.push({
          id,
          type: 'loop',
          text: `Para (${initText}; ${condText}; ${incText})`,
          bodyBranch: stmt.corpo ? parseBlock(stmt.corpo.declaracoes || []) : []
        });
      } else {
        list.push({
          id,
          type: 'process',
          text: type
        });
      }
    }
    return list;
  };

  return parseBlock(funcDecl.funcao.corpo);
}

export function parseJSCodeToFlowNodes(code: string, functionName: string = 'principal'): FlowNode[] {
  const bodyCode = extractJSFunctionBody(code, functionName);
  const lines = bodyCode.split('\n');
  const root: FlowNode[] = [];
  const stack: { nodes: FlowNode[]; currentBlock: FlowNode }[] = [];
  let currentList = root;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('//') || line.startsWith('/*')) continue;

    // Check for closing brace
    if (line === '}' || line.startsWith('}')) {
      if (stack.length > 0) {
        const popped = stack.pop()!;
        currentList = popped.nodes;
        
        // If there was an active decision block that just finished its thenBranch,
        // and the next line is an 'else', we don't return to the main list yet.
        // But to keep it simple, the next line handling will take care of else.
      }
      continue;
    }

    // Check for if statement
    const ifMatch = line.match(/^if\s*\((.*)\)\s*\{?/);
    if (ifMatch) {
      const cond = ifMatch[1].trim();
      const node: FlowNode = {
        id: `js-if-${i}`,
        type: 'decision',
        text: cond,
        thenBranch: [],
        elseBranch: []
      };
      currentList.push(node);
      stack.push({ nodes: currentList, currentBlock: node });
      currentList = node.thenBranch!;
      continue;
    }

    // Check for else statement
    if (line.match(/^else\s*\{?/) || line.match(/^\}\s*else\s*\{?/)) {
      if (stack.length > 0) {
        const top = stack[stack.length - 1].currentBlock;
        if (top.type === 'decision') {
          currentList = top.elseBranch!;
          // Put back on stack so it pops correctly at the else block's closing brace
          stack.push({ nodes: stack[stack.length - 1].nodes, currentBlock: top });
        }
      }
      continue;
    }

    // Check for while loop
    const whileMatch = line.match(/^while\s*\((.*)\)\s*\{?/);
    if (whileMatch) {
      const cond = whileMatch[1].trim();
      const node: FlowNode = {
        id: `js-while-${i}`,
        type: 'loop',
        text: `Enquanto (${cond})`,
        bodyBranch: []
      };
      currentList.push(node);
      stack.push({ nodes: currentList, currentBlock: node });
      currentList = node.bodyBranch!;
      continue;
    }

    // Check for for loop
    const forMatch = line.match(/^for\s*\((.*)\)\s*\{?/);
    if (forMatch) {
      const content = forMatch[1].trim();
      const node: FlowNode = {
        id: `js-for-${i}`,
        type: 'loop',
        text: `Para (${content})`,
        bodyBranch: []
      };
      currentList.push(node);
      stack.push({ nodes: currentList, currentBlock: node });
      currentList = node.bodyBranch!;
      continue;
    }

    // Check for write/writeln
    const writeMatch = line.match(/^(?:write|writeln)\((.*)\);?/);
    if (writeMatch) {
      const args = writeMatch[1].trim();
      currentList.push({
        id: `js-write-${i}`,
        type: 'output',
        text: `escrever(${args})`
      });
      continue;
    }

    // Check for read
    const readMatch = line.match(/^(?:const|let|var)?\s*([a-zA-Z0-9_]+)\s*=\s*(?:await\s+)?read\((.*)\);?/);
    if (readMatch) {
      const varName = readMatch[1];
      currentList.push({
        id: `js-read-${i}`,
        type: 'input',
        text: `ler(${varName})`
      });
      continue;
    }

    // Simple variable declaration or assignment
    const assignMatch = line.match(/^(const|let|var)?\s*([a-zA-Z0-9_]+)\s*=\s*(.*);?/);
    if (assignMatch) {
      const keyword = assignMatch[1] ? assignMatch[1] + ' ' : '';
      const varName = assignMatch[2];
      let val = assignMatch[3].trim();
      if (val.endsWith(';')) {
        val = val.slice(0, -1).trim();
      }
      currentList.push({
        id: `js-assign-${i}`,
        type: 'process',
        text: `${keyword}${varName} = ${val}`
      });
      continue;
    }

    // Fallback
    currentList.push({
      id: `js-stmt-${i}`,
      type: 'process',
      text: line.endsWith(';') ? line.slice(0, -1) : line
    });
  }

  return root;
}

export function insertNodeInTree(
  nodes: FlowNode[],
  fromNodeId: string,
  newNode: FlowNode,
  branchType?: 'then' | 'else' | 'body'
): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    if (node.id === fromNodeId) {
      if (branchType === 'then') {
        node.thenBranch = [newNode, ...(node.thenBranch || [])];
        return true;
      } else if (branchType === 'else') {
        node.elseBranch = [newNode, ...(node.elseBranch || [])];
        return true;
      } else if (branchType === 'body') {
        node.bodyBranch = [newNode, ...(node.bodyBranch || [])];
        return true;
      } else {
        nodes.splice(i + 1, 0, newNode);
        return true;
      }
    }

    if (node.thenBranch && insertNodeInTree(node.thenBranch, fromNodeId, newNode, branchType)) {
      return true;
    }
    if (node.elseBranch && insertNodeInTree(node.elseBranch, fromNodeId, newNode, branchType)) {
      return true;
    }
    if (node.bodyBranch && insertNodeInTree(node.bodyBranch, fromNodeId, newNode, branchType)) {
      return true;
    }
  }
  return false;
}

export function deleteNodeInTree(nodes: FlowNode[], targetId: string): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    if (node.id === targetId) {
      nodes.splice(i, 1);
      return true;
    }
    
    if (node.thenBranch && deleteNodeInTree(node.thenBranch, targetId)) {
      return true;
    }
    if (node.elseBranch && deleteNodeInTree(node.elseBranch, targetId)) {
      return true;
    }
    if (node.bodyBranch && deleteNodeInTree(node.bodyBranch, targetId)) {
      return true;
    }
  }
  return false;
}

export function updateNodeInTree(nodes: FlowNode[], targetId: string, text: string): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    
    if (node.id === targetId) {
      node.text = text;
      return true;
    }
    
    if (node.thenBranch && updateNodeInTree(node.thenBranch, targetId, text)) {
      return true;
    }
    if (node.elseBranch && updateNodeInTree(node.elseBranch, targetId, text)) {
      return true;
    }
    if (node.bodyBranch && updateNodeInTree(node.bodyBranch, targetId, text)) {
      return true;
    }
  }
  return false;
}

export function generateCodeFromFlowNodes(
  nodes: FlowNode[], 
  language: 'portugol' | 'javascript',
  indentLevel: number = 2
): string {
  const indent = '  '.repeat(indentLevel);
  let code = '';

  for (const node of nodes) {
    if (node.type === 'start' || node.type === 'end' || node.type === 'join') {
      continue;
    }

    if (node.type === 'input') {
      const match = node.text.match(/^ler\((.*)\)$/);
      const varName = match ? match[1].trim() : 'x';
      if (language === 'portugol') {
        code += `${indent}leia(${varName})\n`;
      } else {
        code += `${indent}${varName} = await read();\n`;
      }
    } 
    else if (node.type === 'output') {
      const match = node.text.match(/^escrever\((.*)\)$/);
      const content = match ? match[1].trim() : '';
      if (language === 'portugol') {
        code += `${indent}escreva(${content})\n`;
      } else {
        code += `${indent}write(${content});\n`;
      }
    } 
    else if (node.type === 'process') {
      let stmt = node.text.trim();
      if (language === 'javascript') {
        if (!stmt.endsWith(';')) stmt += ';';
      }
      code += `${indent}${stmt}\n`;
    } 
    else if (node.type === 'decision') {
      const cond = node.text.trim();
      const thenCode = generateCodeFromFlowNodes(node.thenBranch || [], language, indentLevel + 1);
      const elseCode = generateCodeFromFlowNodes(node.elseBranch || [], language, indentLevel + 1);

      if (language === 'portugol') {
        code += `${indent}se (${cond}) {\n${thenCode}${indent}}`;
        if (node.elseBranch && node.elseBranch.length > 0) {
          code += ` senao {\n${elseCode}${indent}}\n`;
        } else {
          code += '\n';
        }
      } else {
        code += `${indent}if (${cond}) {\n${thenCode}${indent}}`;
        if (node.elseBranch && node.elseBranch.length > 0) {
          code += ` else {\n${elseCode}${indent}}\n`;
        } else {
          code += '\n';
        }
      }
    } 
    else if (node.type === 'loop') {
      if (node.text.startsWith('Enquanto')) {
        const match = node.text.match(/^Enquanto\s*\((.*)\)$/i);
        const cond = match ? match[1].trim() : 'verdadeiro';
        const bodyCode = generateCodeFromFlowNodes(node.bodyBranch || [], language, indentLevel + 1);
        if (language === 'portugol') {
          code += `${indent}enquanto (${cond}) {\n${bodyCode}${indent}}\n`;
        } else {
          code += `${indent}while (${cond}) {\n${bodyCode}${indent}}\n`;
        }
      } else if (node.text.startsWith('Para')) {
        const match = node.text.match(/^Para\s*\((.*)\)$/i);
        const content = match ? match[1].trim() : '';
        const bodyCode = generateCodeFromFlowNodes(node.bodyBranch || [], language, indentLevel + 1);
        if (language === 'portugol') {
          code += `${indent}para (${content}) {\n${bodyCode}${indent}}\n`;
        } else {
          code += `${indent}for (${content}) {\n${bodyCode}${indent}}\n`;
        }
      }
    }
  }

  return code;
}

export function extractJSFunctionBody(code: string, functionName: string): string {
  if (functionName === 'principal') {
    const lines = code.split('\n');
    let output = '';
    let braceCount = 0;
    let insideFunc = false;
    for (const line of lines) {
      const trimmed = line.trim();
      const funcMatch = trimmed.match(/(?:async\s+)?function\s+([a-zA-Z0-9_]+)/) ||
                        trimmed.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/);
      if (funcMatch) {
        insideFunc = true;
        braceCount = 0;
      }
      
      if (!insideFunc) {
        output += line + '\n';
      } else {
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        braceCount += openBraces - closeBraces;
        if (braceCount <= 0) {
          insideFunc = false;
        }
      }
    }
    return output;
  }

  const lines = code.split('\n');
  let output = '';
  let found = false;
  let braceCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!found) {
      const funcMatch = trimmed.match(new RegExp(`(?:async\\s+)?function\\s+${functionName}\\b`)) ||
                        trimmed.match(new RegExp(`(?:const\\s+|let\\s+|var\\s+)${functionName}\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>`));
      if (funcMatch) {
        found = true;
        braceCount = 0;
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        braceCount += openBraces - closeBraces;
        const braceIdx = line.indexOf('{');
        if (braceIdx !== -1) {
          const bodyPart = line.substring(braceIdx + 1).trim();
          if (bodyPart && bodyPart !== '{') {
            output += bodyPart + '\n';
          }
        }
      }
    } else {
      const openBraces = (line.match(/{/g) || []).length;
      const closeBraces = (line.match(/}/g) || []).length;
      braceCount += openBraces - closeBraces;
      if (braceCount <= 0) {
        const lastBraceIdx = line.lastIndexOf('}');
        if (lastBraceIdx !== -1) {
          const beforeBrace = line.substring(0, lastBraceIdx).trim();
          if (beforeBrace) {
            output += beforeBrace + '\n';
          }
        }
        break;
      }
      output += line + '\n';
    }
  }
  return output;
}

export function replaceFunctionBodyInCode(
  code: string,
  functionName: string,
  newBodyCode: string,
  language: 'portugol' | 'javascript'
): string {
  const lines = code.split('\n');
  
  if (language === 'javascript' && functionName === 'principal') {
    const functionRegex = /(?:async\s+)?function\s+[a-zA-Z0-9_]+\s*\(|(?:const|let|var)\s+[a-zA-Z0-9_]+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;
    if (!functionRegex.test(code)) {
      return newBodyCode;
    }
    
    let functionBlocks: { start: number; end: number }[] = [];
    let insideFunc = false;
    let braceCount = 0;
    let funcStartLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      const funcMatch = trimmed.match(/(?:async\s+)?function\s+[a-zA-Z0-9_]+/) ||
                        trimmed.match(/(?:const|let|var)\s+[a-zA-Z0-9_]+\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/);
      if (funcMatch && !insideFunc) {
        insideFunc = true;
        braceCount = 0;
        funcStartLine = i;
      }
      
      if (insideFunc) {
        const openBraces = (lines[i].match(/{/g) || []).length;
        const closeBraces = (lines[i].match(/}/g) || []).length;
        braceCount += openBraces - closeBraces;
        if (braceCount <= 0) {
          functionBlocks.push({ start: funcStartLine, end: i });
          insideFunc = false;
        }
      }
    }
    
    let newCodeLines: string[] = [];
    newCodeLines.push(...newBodyCode.split('\n'));
    newCodeLines.push('');
    for (const block of functionBlocks) {
      for (let i = block.start; i <= block.end; i++) {
        newCodeLines.push(lines[i]);
      }
      newCodeLines.push('');
    }
    return newCodeLines.join('\n').trim();
  }

  let targetFuncRegex: RegExp;
  if (language === 'portugol') {
    targetFuncRegex = new RegExp(`funcao\\s+(?:[a-zA-Z0-9_]+\\s+)?${functionName}\\s*\\(`);
  } else {
    targetFuncRegex = new RegExp(`(?:async\\s+)?function\\s+${functionName}\\s*\\(|(?:const\\s+|let\\s+|var\\s+)${functionName}\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>`);
  }

  let funcStartLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (targetFuncRegex.test(lines[i])) {
      funcStartLineIdx = i;
      break;
    }
  }

  if (funcStartLineIdx === -1) {
    if (language === 'portugol') {
      const lastBraceIdx = code.lastIndexOf('}');
      if (lastBraceIdx !== -1) {
        const signature = functionName === 'inicio' ? 'funcao inicio()' : `funcao ${functionName}()`;
        const newFuncText = `\n  ${signature} {\n${newBodyCode}  }\n`;
        return code.substring(0, lastBraceIdx) + newFuncText + code.substring(lastBraceIdx);
      } else {
        const signature = functionName === 'inicio' ? 'funcao inicio()' : `funcao ${functionName}()`;
        return `programa {\n  ${signature} {\n${newBodyCode}  }\n}`;
      }
    } else {
      const signature = `async function ${functionName}()`;
      return code + `\n\n${signature} {\n${newBodyCode}\n}`;
    }
  }

  let braceCount = 0;
  let blockStartLineIdx = -1;
  let blockEndLineIdx = -1;

  for (let i = funcStartLineIdx; i < lines.length; i++) {
    const line = lines[i];
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    
    if (blockStartLineIdx === -1 && line.includes('{')) {
      blockStartLineIdx = i;
      braceCount = openBraces - closeBraces;
    } else if (blockStartLineIdx !== -1) {
      braceCount += openBraces - closeBraces;
    }

    if (blockStartLineIdx !== -1 && braceCount <= 0) {
      blockEndLineIdx = i;
      break;
    }
  }

  if (blockStartLineIdx === -1 || blockEndLineIdx === -1) {
    return code;
  }

  const beforeLines = lines.slice(0, blockStartLineIdx);
  const afterLines = lines.slice(blockEndLineIdx + 1);

  const startLineText = lines[blockStartLineIdx];
  const braceIndex = startLineText.indexOf('{');
  const signaturePart = startLineText.substring(0, braceIndex + 1);
  
  const endLineText = lines[blockEndLineIdx];
  const lastBraceIdx = endLineText.lastIndexOf('}');
  const trailingPart = endLineText.substring(lastBraceIdx);

  const newFuncLines = [
    signaturePart,
    ...newBodyCode.split('\n').map(line => line ? line : ''),
    trailingPart
  ];

  return [...beforeLines, ...newFuncLines, ...afterLines].join('\n');
}

export function addNewFunctionToCode(
  code: string,
  functionName: string,
  language: 'portugol' | 'javascript'
): string {
  if (language === 'portugol') {
    const lastBraceIdx = code.lastIndexOf('}');
    if (lastBraceIdx !== -1) {
      const newFuncText = `\n  funcao ${functionName}() {\n    \n  }\n`;
      return code.substring(0, lastBraceIdx) + newFuncText + code.substring(lastBraceIdx);
    } else {
      return `programa {\n  funcao ${functionName}() {\n    \n  }\n}`;
    }
  } else {
    const newFuncText = `\n\nasync function ${functionName}() {\n  \n}`;
    return code.trim() + newFuncText;
  }
}

export function deleteFunctionFromCode(
  code: string,
  functionName: string,
  language: 'portugol' | 'javascript'
): string {
  const lines = code.split('\n');
  let targetFuncRegex: RegExp;
  if (language === 'portugol') {
    targetFuncRegex = new RegExp(`funcao\\s+(?:[a-zA-Z0-9_]+\\s+)?${functionName}\\s*\\(`);
  } else {
    targetFuncRegex = new RegExp(`(?:async\\s+)?function\\s+${functionName}\\s*\\(|(?:const\\s+|let\\s+|var\\s+)${functionName}\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>`);
  }

  let funcStartLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (targetFuncRegex.test(lines[i])) {
      funcStartLineIdx = i;
      break;
    }
  }

  if (funcStartLineIdx === -1) {
    return code;
  }

  let braceCount = 0;
  let blockStartLineIdx = -1;
  let blockEndLineIdx = -1;

  for (let i = funcStartLineIdx; i < lines.length; i++) {
    const line = lines[i];
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    
    if (blockStartLineIdx === -1 && line.includes('{')) {
      blockStartLineIdx = i;
      braceCount = openBraces - closeBraces;
    } else if (blockStartLineIdx !== -1) {
      braceCount += openBraces - closeBraces;
    }

    if (blockStartLineIdx !== -1 && braceCount <= 0) {
      blockEndLineIdx = i;
      break;
    }
  }

  if (blockStartLineIdx === -1 || blockEndLineIdx === -1) {
    const before = lines.slice(0, funcStartLineIdx);
    const after = lines.slice(funcStartLineIdx + 1);
    return [...before, ...after].join('\n');
  }

  const beforeLines = lines.slice(0, funcStartLineIdx);
  const afterLines = lines.slice(blockEndLineIdx + 1);

  return [...beforeLines, ...afterLines].join('\n').trim();
}



