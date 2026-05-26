import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Plus, Minus, Maximize2, X, AlertCircle } from 'lucide-react';
import type { FlowNode } from '../utils/flowchart-parser';
import { 
  parsePortugolASTToFlowNodes, 
  parseJSCodeToFlowNodes,
  insertNodeInTree,
  deleteNodeInTree,
  updateNodeInTree,
  generateCodeFromFlowNodes
} from '../utils/flowchart-parser';

interface FlowchartTabProps {
  code: string;
  language: 'portugol' | 'javascript';
  astDeclarations?: any[];
  onChangeCode?: (newCode: string) => void;
  activeLine?: number | null;
}

interface LayoutNode {
  node: FlowNode;
  x: number;
  y: number;
  width: number;
  height: number;
  lines: { 
    x1: number; 
    y1: number; 
    x2: number; 
    y2: number; 
    arrow?: boolean; 
    label?: string;
    insertPoint?: { fromNodeId: string; branchType?: 'then' | 'else' | 'body' }
  }[];
}

function layoutNodes(
  nodes: FlowNode[], 
  startX: number, 
  startY: number
): { layoutNodes: LayoutNode[]; width: number; height: number; endY: number } {
  let currentY = startY;
  const list: LayoutNode[] = [];
  let maxWidth = 160;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const isSimple = ['start', 'end', 'input', 'output', 'process'].includes(node.type);
    
    if (isSimple) {
      const w = 150;
      const h = 45;
      const x = startX - w / 2;
      const y = currentY;
      
      list.push({
        node,
        x,
        y,
        width: w,
        height: h,
        lines: i < nodes.length - 1 ? [{ 
          x1: startX, y1: y + h, x2: startX, y2: y + h + 30, arrow: true,
          insertPoint: { fromNodeId: node.id }
        }] : []
      });
      
      currentY += h + 30;
    } else if (node.type === 'decision') {
      const w = 160;
      const h = 55;
      const x = startX - w / 2;
      const y = currentY;
      
      const branchStartY = currentY + h + 35;
      
      const thenLayout = layoutNodes(node.thenBranch || [], startX - 110, branchStartY);
      const elseLayout = layoutNodes(node.elseBranch || [], startX + 110, branchStartY);
      
      const maxBranchEndY = Math.max(thenLayout.endY, elseLayout.endY);
      const joinY = maxBranchEndY + 20;
      const joinW = 12;
      const joinH = 12;
      const joinX = startX - joinW / 2;
      
      const lines: LayoutNode['lines'] = [
        // True branch (left)
        { x1: startX - w / 2, y1: y + h / 2, x2: startX - 110, y2: y + h / 2 },
        { 
          x1: startX - 110, y1: y + h / 2, x2: startX - 110, y2: branchStartY, arrow: true, label: 'Sim',
          insertPoint: { fromNodeId: node.id, branchType: 'then' }
        },
        
        // False branch (right)
        { x1: startX + w / 2, y1: y + h / 2, x2: startX + 110, y2: y + h / 2 },
        { 
          x1: startX + 110, y1: y + h / 2, x2: startX + 110, y2: branchStartY, arrow: true, label: 'Não',
          insertPoint: { fromNodeId: node.id, branchType: 'else' }
        }
      ];
      
      // Connect branches back to join node
      if (node.thenBranch && node.thenBranch.length > 0) {
        lines.push({ x1: startX - 110, y1: thenLayout.endY - 30, x2: startX - 110, y2: joinY + joinH / 2 });
        lines.push({ x1: startX - 110, y1: joinY + joinH / 2, x2: startX - joinW / 2, y2: joinY + joinH / 2, arrow: true });
      } else {
        lines.push({ x1: startX - 110, y1: y + h / 2, x2: startX - 110, y2: joinY + joinH / 2 });
        lines.push({ x1: startX - 110, y1: joinY + joinH / 2, x2: startX - joinW / 2, y2: joinY + joinH / 2, arrow: true });
      }
      
      if (node.elseBranch && node.elseBranch.length > 0) {
        lines.push({ x1: startX + 110, y1: elseLayout.endY - 30, x2: startX + 110, y2: joinY + joinH / 2 });
        lines.push({ x1: startX + 110, y1: joinY + joinH / 2, x2: startX + joinW / 2, y2: joinY + joinH / 2, arrow: true });
      } else {
        lines.push({ x1: startX + 110, y1: y + h / 2, x2: startX + 110, y2: joinY + joinH / 2 });
        lines.push({ x1: startX + 110, y1: joinY + joinH / 2, x2: startX + joinW / 2, y2: joinY + joinH / 2, arrow: true });
      }
      
      list.push({
        node,
        x,
        y,
        width: w,
        height: h,
        lines
      });
      
      list.push(...thenLayout.layoutNodes);
      list.push(...elseLayout.layoutNodes);
      
      const joinNode: FlowNode = { id: `${node.id}-join`, type: 'join', text: '' };
      list.push({
        node: joinNode,
        x: joinX,
        y: joinY,
        width: joinW,
        height: joinH,
        lines: i < nodes.length - 1 ? [{ 
          x1: startX, y1: joinY + joinH, x2: startX, y2: joinY + joinH + 30, arrow: true,
          insertPoint: { fromNodeId: node.id }
        }] : []
      });
      
      currentY = joinY + joinH + 30;
      maxWidth = Math.max(maxWidth, 260);
    } else if (node.type === 'loop') {
      const w = 160;
      const h = 55;
      const x = startX - w / 2;
      const y = currentY;
      
      const bodyStartX = startX + 140;
      const bodyStartY = y + h + 30;
      const bodyLayout = layoutNodes(node.bodyBranch || [], bodyStartX, bodyStartY);
      const bodyEndY = Math.max(bodyLayout.endY, y + h + 60);
      
      const loopBackY = bodyEndY - 10;
      
      const lines: LayoutNode['lines'] = [
        // True branch exits from right of loop block, goes right, then turns down to loop body
        { x1: startX + w / 2, y1: y + h / 2, x2: bodyStartX, y2: y + h / 2 },
        { 
          x1: bodyStartX, y1: y + h / 2, x2: bodyStartX, y2: bodyStartY, arrow: true, label: 'Verdade',
          insertPoint: { fromNodeId: node.id, branchType: 'body' }
        },
        
        // Loop-back line: goes down from loop body end, left, up, right back to main line
        { x1: bodyStartX, y1: bodyEndY - 30, x2: bodyStartX, y2: loopBackY },
        { x1: bodyStartX, y1: loopBackY, x2: startX - 110, y2: loopBackY },
        { x1: startX - 110, y1: loopBackY, x2: startX - 110, y2: y - 15 },
        { x1: startX - 110, y1: y - 15, x2: startX, y2: y - 15, arrow: true },
        
        // False branch exits from bottom of loop block and goes straight down
        { 
          x1: startX, y1: y + h, x2: startX, y2: y + h + 30, arrow: true, label: 'Falso',
          insertPoint: { fromNodeId: node.id }
        }
      ];
      
      list.push({
        node,
        x,
        y,
        width: w,
        height: h,
        lines
      });
      
      list.push(...bodyLayout.layoutNodes);
      
      currentY = Math.max(y + h + 30, loopBackY + 30);
      
      const loopRightBoundary = bodyStartX - startX + bodyLayout.width / 2;
      const loopLeftBoundary = 110;
      maxWidth = Math.max(maxWidth, Math.max(loopLeftBoundary * 2, loopRightBoundary * 2));
    }
  }

  return {
    layoutNodes: list,
    width: maxWidth,
    height: currentY - startY,
    endY: currentY
  };
}

interface BlockData {
  declType?: string;
  declName?: string;
  declValue?: string;
  procVar?: string;
  procExpr?: string;
  inputVar?: string;
  outputExpr?: string;
  decCond?: string;
  loopType?: 'Enquanto' | 'Para';
  loopCond?: string;
  loopInit?: string;
  loopInc?: string;
}

function parseNodeText(type: string, text: string, language: 'portugol' | 'javascript', isDeclare?: boolean): BlockData {
  const data: BlockData = {};
  const t = text.trim();
  
  if (isDeclare) {
    const match = t.match(/^(inteiro|real|caracter|logico|let|const|var)\s+([a-zA-Z0-9_]+)(?:\s*=\s*(.*))?$/i);
    if (match) {
      data.declType = match[1];
      data.declName = match[2];
      data.declValue = match[3] || '';
    } else {
      data.declType = language === 'portugol' ? 'inteiro' : 'let';
      data.declName = t;
      data.declValue = '';
    }
    return data;
  }
  
  if (type === 'process') {
    const match = t.match(/^([a-zA-Z0-9_]+)\s*=\s*(.*)$/);
    if (match) {
      data.procVar = match[1];
      data.procExpr = match[2];
    } else {
      data.procVar = '';
      data.procExpr = t;
    }
  } else if (type === 'input') {
    const match = t.match(/^ler\((.*)\)$/i);
    if (match) {
      data.inputVar = match[1].trim();
    } else {
      data.inputVar = t;
    }
  } else if (type === 'output') {
    const match = t.match(/^escrever\((.*)\)$/i);
    if (match) {
      data.outputExpr = match[1].trim();
    } else {
      data.outputExpr = t;
    }
  } else if (type === 'decision') {
    data.decCond = t;
  } else if (type === 'loop') {
    if (t.toLowerCase().startsWith('para')) {
      data.loopType = 'Para';
      const match = t.match(/^Para\s*\((.*?);\s*(.*?);\s*(.*)\)$/i);
      if (match) {
        data.loopInit = match[1].trim();
        data.loopCond = match[2].trim();
        data.loopInc = match[3].trim();
      } else {
        data.loopInit = '';
        data.loopCond = t;
        data.loopInc = '';
      }
    } else {
      data.loopType = 'Enquanto';
      const match = t.match(/^Enquanto\s*\((.*)\)$/i);
      if (match) {
        data.loopCond = match[1].trim();
      } else {
        data.loopCond = t;
      }
    }
  }
  
  return data;
}

function generateNodeText(type: string, data: BlockData, isDeclare: boolean): string {
  if (isDeclare) {
    const typeKeyword = data.declType || 'let';
    const varName = data.declName || 'x';
    const val = data.declValue ? data.declValue.trim() : '';
    return val ? `${typeKeyword} ${varName} = ${val}` : `${typeKeyword} ${varName}`;
  }
  
  if (type === 'process') {
    const varName = data.procVar ? data.procVar.trim() : '';
    const expr = data.procExpr ? data.procExpr.trim() : '';
    return varName ? `${varName} = ${expr}` : expr;
  } else if (type === 'input') {
    const varName = data.inputVar ? data.inputVar.trim() : '';
    return `ler(${varName})`;
  } else if (type === 'output') {
    const expr = data.outputExpr ? data.outputExpr.trim() : '';
    return `escrever(${expr})`;
  } else if (type === 'decision') {
    return data.decCond ? data.decCond.trim() : 'x > 0';
  } else if (type === 'loop') {
    if (data.loopType === 'Para') {
      const init = data.loopInit ? data.loopInit.trim() : '';
      const cond = data.loopCond ? data.loopCond.trim() : '';
      const inc = data.loopInc ? data.loopInc.trim() : '';
      return `Para (${init}; ${cond}; ${inc})`;
    } else {
      return `Enquanto (${data.loopCond ? data.loopCond.trim() : 'x < 10'})`;
    }
  }
  return '';
}

function getDeclaredVariables(nodes: FlowNode[]): string[] {
  const vars: string[] = [];
  
  const scan = (list: FlowNode[]) => {
    for (const node of list) {
      if (node.type === 'process') {
        const match = node.text.trim().match(/^(inteiro|real|caracter|logico|let|const|var)\s+([a-zA-Z0-9_]+)/i);
        if (match) {
          vars.push(match[2]);
        }
      }
      if (node.thenBranch) scan(node.thenBranch);
      if (node.elseBranch) scan(node.elseBranch);
      if (node.bodyBranch) scan(node.bodyBranch);
    }
  };
  
  scan(nodes);
  return Array.from(new Set(vars));
}

interface AutocompleteInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  declaredVars: string[];
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  required,
  autoFocus,
  className,
  declaredVars
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [caretPos, setCaretPos] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Compute current word and suggestions
  const caretWord = useMemo(() => {
    if (caretPos === 0) return null;
    const textBeforeCaret = value.slice(0, caretPos);
    const match = textBeforeCaret.match(/[a-zA-Z_][a-zA-Z0-9_]*$/);
    return match ? { word: match[0], startPos: caretPos - match[0].length } : null;
  }, [value, caretPos]);

  const suggestions = useMemo(() => {
    if (!caretWord || declaredVars.length === 0) return [];
    const prefix = caretWord.word.toLowerCase();
    return declaredVars.filter(v => v.toLowerCase().startsWith(prefix));
  }, [caretWord, declaredVars]);

  // Adjust active index if suggestions shrink
  useEffect(() => {
    setActiveIndex(0);
  }, [suggestions]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    if (!caretWord) return;
    const textBefore = value.slice(0, caretWord.startPos);
    const textAfter = value.slice(caretPos);
    const newValue = textBefore + suggestion + textAfter;
    const newCaretPos = caretWord.startPos + suggestion.length;

    onChange(newValue);
    setShowSuggestions(false);

    // Restore caret position
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCaretPos, newCaretPos);
        setCaretPos(newCaretPos);
      }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length > 0 && showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowSuggestions(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    const selectionStart = e.target.selectionStart || 0;
    setCaretPos(selectionStart);
    setShowSuggestions(true);
  };

  const handleKeyUpOrClick = (e: React.MouseEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      setCaretPos(inputRef.current.selectionStart || 0);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        className={className}
        style={{ width: '100%' }}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUpOrClick}
        onClick={handleKeyUpOrClick}
        required={required}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="flow-autocomplete-dropdown"
          style={{
            position: 'absolute',
            top: '105%',
            left: 0,
            right: 0,
            background: 'var(--bg-elevated, #161c28)',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            maxHeight: '150px',
            overflowY: 'auto',
            zIndex: 1000,
            padding: '4px'
          }}
        >
          {suggestions.map((s, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <div
                key={s}
                onClick={() => handleSelectSuggestion(s)}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  color: 'var(--text-primary, #f1f5f9)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  borderLeft: isSelected ? '2px solid var(--accent-cyan, #06b6d4)' : '2px solid transparent',
                  transition: 'background 0.1s ease',
                  fontFamily: 'monospace'
                }}
              >
                {s}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface NodeConfigModalProps {
  node: { id: string; type: string; text: string; isDeclare?: boolean };
  language: 'portugol' | 'javascript';
  declaredVars: string[];
  onSave: (text: string) => void;
  onClose: () => void;
}

const NodeConfigModal: React.FC<NodeConfigModalProps> = ({ node, language, declaredVars, onSave, onClose }) => {
  const initialData = useMemo(() => {
    return parseNodeText(node.type, node.text, language, node.isDeclare);
  }, [node, language]);

  // Declare states
  const [declType, setDeclType] = useState(initialData.declType || (language === 'portugol' ? 'inteiro' : 'let'));
  const [declName, setDeclName] = useState(initialData.declName || '');
  const [declValue, setDeclValue] = useState(initialData.declValue || '');

  // Process states
  const [procVar, setProcVar] = useState(initialData.procVar || '');
  const [procExpr, setProcExpr] = useState(initialData.procExpr || '');

  // Input states
  const [inputVar, setInputVar] = useState(initialData.inputVar || '');

  // Output states
  const [outputExpr, setOutputExpr] = useState(initialData.outputExpr || '');

  // Decision states
  const [decCond, setDecCond] = useState(initialData.decCond || '');

  // Loop states
  const [loopType, setLoopType] = useState<'Enquanto' | 'Para'>(initialData.loopType || 'Enquanto');
  const [loopCond, setLoopCond] = useState(initialData.loopCond || '');
  const [loopInit, setLoopInit] = useState(initialData.loopInit || '');
  const [loopInc, setLoopInc] = useState(initialData.loopInc || '');

  // Validation Error state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clear error message when inputs change
  useEffect(() => {
    setErrorMsg(null);
  }, [
    declType, declName, declValue,
    procVar, procExpr,
    inputVar,
    outputExpr,
    decCond,
    loopType, loopCond, loopInit, loopInc
  ]);

  const allProcVars = useMemo(() => {
    if (procVar && !declaredVars.includes(procVar)) {
      return [procVar, ...declaredVars];
    }
    return declaredVars;
  }, [procVar, declaredVars]);

  const allInputVars = useMemo(() => {
    if (inputVar && !declaredVars.includes(inputVar)) {
      return [inputVar, ...declaredVars];
    }
    return declaredVars;
  }, [inputVar, declaredVars]);

  const validateExpression = (expr: string): string | null => {
    const trimmed = expr.trim();
    if (!trimmed) return 'A expressão não pode estar vazia.';
    
    let openParens = 0;
    let openBrackets = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    
    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];
      
      // Skip escaped characters
      if (i > 0 && trimmed[i - 1] === '\\') continue;
      
      if (char === "'" && !inDoubleQuote) inSingleQuote = !inSingleQuote;
      if (char === '"' && !inSingleQuote) inDoubleQuote = !inDoubleQuote;
      if (inSingleQuote || inDoubleQuote) continue;
      
      if (char === '(') openParens++;
      if (char === ')') openParens--;
      if (char === '[') openBrackets++;
      if (char === ']') openBrackets--;
      
      if (openParens < 0) {
        return 'Erro de sintaxe: parênteses fechados incorretamente.';
      }
      if (openBrackets < 0) {
        return 'Erro de sintaxe: colchetes fechados incorretamente.';
      }
    }
    if (inSingleQuote || inDoubleQuote) {
      return 'Erro de sintaxe: aspas não fechadas.';
    }
    if (openParens !== 0) {
      return 'Erro de sintaxe: parênteses não balanceados.';
    }
    if (openBrackets !== 0) {
      return 'Erro de sintaxe: colchetes não balanceados.';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate based on node type
    if (node.isDeclare) {
      if (!declName.trim()) {
        setErrorMsg('Por favor, preencha o nome da variável.');
        return;
      }
      const varNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
      if (!varNameRegex.test(declName.trim())) {
        setErrorMsg("Nome de variável inválido. Deve começar com letra ou '_' e conter apenas letras, números e '_'.");
        return;
      }
    } else if (node.type === 'process') {
      const err = validateExpression(procExpr);
      if (err) {
        setErrorMsg(err);
        return;
      }
    } else if (node.type === 'input') {
      if (!inputVar) {
        setErrorMsg('Por favor, selecione uma variável para entrada de dados.');
        return;
      }
    } else if (node.type === 'output') {
      const err = validateExpression(outputExpr);
      if (err) {
        setErrorMsg(err);
        return;
      }
    } else if (node.type === 'decision') {
      const err = validateExpression(decCond);
      if (err) {
        setErrorMsg(err);
        return;
      }
    } else if (node.type === 'loop') {
      if (loopType === 'Enquanto') {
        const err = validateExpression(loopCond);
        if (err) {
          setErrorMsg(err);
          return;
        }
      } else {
        if (!loopInit.trim()) {
          setErrorMsg('Por favor, preencha a inicialização do contador.');
          return;
        }
        if (!loopCond.trim()) {
          setErrorMsg('Por favor, preencha a condição de parada.');
          return;
        }
        if (!loopInc.trim()) {
          setErrorMsg('Por favor, preencha o passo / incremento.');
          return;
        }
        const errInit = validateExpression(loopInit);
        if (errInit) {
          setErrorMsg(`Inicialização: ${errInit}`);
          return;
        }
        const errCond = validateExpression(loopCond);
        if (errCond) {
          setErrorMsg(`Condição: ${errCond}`);
          return;
        }
        const errInc = validateExpression(loopInc);
        if (errInc) {
          setErrorMsg(`Incremento: ${errInc}`);
          return;
        }
      }
    }

    const data: BlockData = {
      declType, declName, declValue,
      procVar, procExpr,
      inputVar,
      outputExpr,
      decCond,
      loopType, loopCond, loopInit, loopInc
    };
    const text = generateNodeText(node.type, data, !!node.isDeclare);
    onSave(text);
  };

  // Get description/title based on block type
  let title = '';
  let helpText = '';

  if (node.isDeclare) {
    title = 'Configurar Declaração de Variável';
    helpText = language === 'portugol'
      ? 'Use para criar uma variável e reservar espaço na memória. Escolha o tipo de dado (inteiro, real, caracter ou logico), dê um nome a ela e, opcionalmente, defina seu valor inicial.'
      : 'Use para criar uma variável com um modificador de escopo (let, const ou var), dê um nome a ela e, opcionalmente, defina seu valor inicial.';
  } else {
    switch (node.type) {
      case 'process':
        title = 'Configurar Atribuição (Processamento)';
        helpText = 'Permite realizar cálculos ou definir valores e guardar o resultado em uma variável. Se você deixar o campo de variável de destino em branco, funcionará como um processamento livre (ex: chamada de função).';
        break;
      case 'input':
        title = 'Configurar Entrada (Leia)';
        helpText = 'Pede para o usuário fornecer um dado pelo console/teclado. O valor inserido será guardado na variável especificada abaixo.';
        break;
      case 'output':
        title = 'Configurar Saída (Escreva)';
        helpText = 'Exibe um texto ou o resultado de um cálculo/variável na tela. Para textos literais, use aspas duplas, ex: "Resultado = ". Para variáveis, use apenas o nome delas, ex: x. Use o operador + para juntar textos e variáveis.';
        break;
      case 'decision':
        title = 'Configurar Decisão (Se)';
        helpText = 'Avalia uma condição lógica que deve ser verdadeira ou falsa (ex: idade >= 18). Se for verdadeira, segue pelo caminho da esquerda (Sim), senão segue pelo caminho da direita (Não).';
        break;
      case 'loop':
        title = 'Configurar Repetição (Estrutura de Loop)';
        helpText = 'Executa repetidamente as instruções de seu corpo enquanto a condição especificada for verdadeira. Pode ser uma repetição com condição (Enquanto) ou controlada por um contador (Para).';
        break;
    }
  }

  return (
    <div className="flow-modal-backdrop" onClick={onClose}>
      <div className="flow-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flow-modal-header">
          <h3 className="flow-modal-title">{title}</h3>
          <button type="button" className="flow-modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flow-modal-body">
            <div className="flow-modal-help-box">{helpText}</div>
            
            {node.isDeclare && (
              <>
                <div className="flow-modal-field-group">
                  <label className="flow-modal-label">Tipo da Variável</label>
                  <select 
                    className="flow-modal-select" 
                    value={declType} 
                    onChange={(e) => setDeclType(e.target.value)}
                  >
                    {language === 'portugol' ? (
                      <>
                        <option value="inteiro">inteiro (números inteiros: 0, 1, -5)</option>
                        <option value="real">real (números decimais: 1.5, -3.14)</option>
                        <option value="caracter">caracter (textos / strings: "Ana")</option>
                        <option value="logico">logico (verdadeiro ou falso)</option>
                      </>
                    ) : (
                      <>
                        <option value="let">let (variável com escopo de bloco)</option>
                        <option value="const">const (constante, valor fixo)</option>
                        <option value="var">var (variável tradicional)</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="flow-modal-field-group">
                  <label className="flow-modal-label">Nome da Variável</label>
                  <input 
                    type="text" 
                    className="flow-modal-input" 
                    placeholder="ex: idade" 
                    value={declName} 
                    onChange={(e) => setDeclName(e.target.value)} 
                    required 
                    autoFocus
                  />
                </div>
                <div className="flow-modal-field-group">
                  <label className="flow-modal-label">Valor Inicial (Opcional)</label>
                  <input 
                    type="text" 
                    className="flow-modal-input" 
                    placeholder="ex: 0" 
                    value={declValue} 
                    onChange={(e) => setDeclValue(e.target.value)} 
                  />
                </div>
              </>
            )}

            {!node.isDeclare && node.type === 'process' && (
              <>
                <div className="flow-modal-field-group">
                  <label className="flow-modal-label">Variável de Destino (Opcional)</label>
                  {allProcVars.length > 0 ? (
                    <select 
                      className="flow-modal-select"
                      value={procVar}
                      onChange={(e) => setProcVar(e.target.value)}
                    >
                      <option value="">-- Processamento Livre (Sem atribuição) --</option>
                      {allProcVars.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  ) : (
                    <div style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', padding: '0.25rem 0' }}>
                      Nenhuma variável declarada. Adicione um bloco de Declaração antes.
                    </div>
                  )}
                </div>
                <div className="flow-modal-field-group">
                  <label className="flow-modal-label">Valor / Expressão</label>
                  <AutocompleteInput 
                    className="flow-modal-input" 
                    placeholder="ex: x + y" 
                    value={procExpr} 
                    onChange={setProcExpr} 
                    required
                    declaredVars={declaredVars}
                  />
                </div>
              </>
            )}

            {node.type === 'input' && (
              <div className="flow-modal-field-group">
                <label className="flow-modal-label">Nome da Variável</label>
                {allInputVars.length > 0 ? (
                  <select 
                    className="flow-modal-select"
                    value={inputVar}
                    onChange={(e) => setInputVar(e.target.value)}
                    required
                  >
                    <option value="" disabled>-- Selecione uma variável --</option>
                    {allInputVars.map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                ) : (
                  <div style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', padding: '0.25rem 0' }}>
                    Nenhuma variável declarada. Adicione um bloco de Declaração antes.
                  </div>
                )}
              </div>
            )}

            {node.type === 'output' && (
              <div className="flow-modal-field-group">
                <label className="flow-modal-label">Conteúdo a Escrever</label>
                <AutocompleteInput 
                  className="flow-modal-input" 
                  placeholder={language === 'portugol' ? 'ex: "Olá " + nome' : 'ex: "Olá ", nome'} 
                  value={outputExpr} 
                  onChange={setOutputExpr} 
                  required 
                  autoFocus
                  declaredVars={declaredVars}
                />
              </div>
            )}

            {node.type === 'decision' && (
              <div className="flow-modal-field-group">
                <label className="flow-modal-label">Condição</label>
                <AutocompleteInput 
                  className="flow-modal-input" 
                  placeholder="ex: x > 0" 
                  value={decCond} 
                  onChange={setDecCond} 
                  required 
                  autoFocus
                  declaredVars={declaredVars}
                />
              </div>
            )}

            {node.type === 'loop' && (
              <>
                <div className="flow-modal-field-group">
                  <label className="flow-modal-label">Tipo de Repetição</label>
                  <select 
                    className="flow-modal-select" 
                    value={loopType} 
                    onChange={(e) => setLoopType(e.target.value as 'Enquanto' | 'Para')}
                  >
                    <option value="Enquanto">Enquanto (condicional simples)</option>
                    <option value="Para">Para (com contador inicializado)</option>
                  </select>
                </div>
                
                {loopType === 'Enquanto' ? (
                  <div className="flow-modal-field-group">
                    <label className="flow-modal-label">Condição de Repetição</label>
                    <AutocompleteInput 
                      className="flow-modal-input" 
                      placeholder="ex: contador < 10" 
                      value={loopCond} 
                      onChange={setLoopCond} 
                      required 
                      autoFocus
                      declaredVars={declaredVars}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flow-modal-field-group">
                      <label className="flow-modal-label">Inicialização</label>
                      <AutocompleteInput 
                        className="flow-modal-input" 
                        placeholder={language === 'portugol' ? 'ex: i = 0' : 'ex: let i = 0'} 
                        value={loopInit} 
                        onChange={setLoopInit} 
                        required
                        declaredVars={declaredVars}
                      />
                    </div>
                    <div className="flow-modal-field-group">
                      <label className="flow-modal-label">Condição de Parada</label>
                      <AutocompleteInput 
                        className="flow-modal-input" 
                        placeholder="ex: i < 10" 
                        value={loopCond} 
                        onChange={setLoopCond} 
                        required
                        declaredVars={declaredVars}
                      />
                    </div>
                    <div className="flow-modal-field-group">
                      <label className="flow-modal-label">Passo / Incremento</label>
                      <AutocompleteInput 
                        className="flow-modal-input" 
                        placeholder="ex: i++" 
                        value={loopInc} 
                        onChange={setLoopInc} 
                        required
                        declaredVars={declaredVars}
                      />
                    </div>
                  </>
                )}
              </>
            )}
            
            {errorMsg && (
              <div 
                style={{ 
                  color: 'var(--accent-rose, #f43f5e)', 
                  fontSize: '0.85rem', 
                  background: 'rgba(244, 63, 94, 0.08)', 
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '500'
                }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
          <div className="flow-modal-footer">
            <button type="button" className="flow-modal-btn cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="flow-modal-btn save">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function isNodeActive(nodeId: string, activeLine: number | null | undefined): boolean {
  if (activeLine === null || activeLine === undefined) return false;
  
  if (nodeId.startsWith('pt-')) {
    const parts = nodeId.split('-');
    if (parts.length >= 4) {
      const lineNum = parseInt(parts[parts.length - 2], 10);
      return lineNum === activeLine;
    }
  } else if (nodeId.startsWith('js-')) {
    const parts = nodeId.split('-');
    if (parts.length >= 3) {
      const lineIdx = parseInt(parts[parts.length - 1], 10);
      return (lineIdx + 1) === activeLine;
    }
  }
  return false;
}

export default function FlowchartTab({ code, language, astDeclarations, onChangeCode, activeLine }: FlowchartTabProps) {
  // Editing states
  const [activeModalNode, setActiveModalNode] = useState<{ id: string; type: string; text: string; isDeclare?: boolean } | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [insertMenu, setInsertMenu] = useState<{ x: number; y: number; fromNodeId: string; branchType?: 'then' | 'else' | 'body' } | null>(null);

  // Local tree state for editing
  const [treeNodes, setTreeNodes] = useState<FlowNode[]>([]);

  const declaredVars = useMemo(() => {
    return getDeclaredVariables(treeNodes);
  }, [treeNodes]);

  // Zoom & Pan states
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial centering of the flowchart inside the visible container on load
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      // Start centered on the diagram (diagram middle is at startX = 300)
      setTranslate({ x: centerX - 300, y: 20 });
    }
  }, []);

  // Prevent default scroll during wheel zooms via a raw listener (React onWheel doesn't support { passive: false })
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomIntensity = 0.08;
      const nextScale = e.deltaY < 0
        ? Math.min(scale + zoomIntensity, 3.0)
        : Math.max(scale - zoomIntensity, 0.3);

      // Zoom towards mouse cursor
      const xs = (mouseX - translate.x) / scale;
      const ys = (mouseY - translate.y) / scale;

      setTranslate({
        x: mouseX - xs * nextScale,
        y: mouseY - ys * nextScale
      });
      setScale(nextScale);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [scale, translate]);

  // Zoom control helpers
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.15, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.15, 0.3));
  };

  const resetZoom = () => {
    setScale(1);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTranslate({ x: rect.width / 2 - 300, y: 20 });
    } else {
      setTranslate({ x: 0, y: 0 });
    }
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Don't drag if user is interacting with text inputs, buttons, menus or nodes
    const isInteractive = 
      target.closest('.flow-node') || 
      target.closest('.flow-insert-menu') || 
      target.closest('.flow-zoom-controls') || 
      target.tagName === 'INPUT' || 
      target.tagName === 'BUTTON';

    if (!isInteractive) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setPanStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch pan handlers (for basic mobile support)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const isInteractive = 
      target.closest('.flow-node') || 
      target.closest('.flow-insert-menu') || 
      target.closest('.flow-zoom-controls') || 
      target.tagName === 'INPUT' || 
      target.tagName === 'BUTTON';

    if (!isInteractive && e.touches.length === 1) {
      setIsPanning(true);
      setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isPanning && e.touches.length === 1) {
      const dx = e.touches[0].clientX - panStart.x;
      const dy = e.touches[0].clientY - panStart.y;
      setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setPanStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Synchronize local tree with compiled changes
  useEffect(() => {
    try {
      if (language === 'portugol' && astDeclarations) {
        const parsed = parsePortugolASTToFlowNodes(astDeclarations);
        setTreeNodes(parsed);
      } else {
        const parsed = parseJSCodeToFlowNodes(code);
        setTreeNodes(parsed);
      }
    } catch (e) {
      console.error('Error generating flowchart nodes:', e);
    }
  }, [code, language, astDeclarations]);

  // Wrap in Start / End nodes for layouts
  const layout = useMemo(() => {
    const startNode: FlowNode = { id: 'start', type: 'start', text: 'Início' };
    const endNode: FlowNode = { id: 'end', type: 'end', text: 'Fim' };
    const fullList = [startNode, ...treeNodes, endNode];
    
    return layoutNodes(fullList, 300, 20);
  }, [treeNodes]);

  const displayNodeText = (text: string) => {
    if (text.length > 18) {
      return text.slice(0, 16) + '...';
    }
    return text;
  };

  // Sync state mutation back to editor
  const syncTreeToCode = (updatedTree: FlowNode[]) => {
    if (!onChangeCode) return;
    
    const bodyCode = generateCodeFromFlowNodes(updatedTree, language, language === 'portugol' ? 2 : 0);
    
    const fullCode = language === 'portugol'
      ? `programa {\n  funcao inicio() {\n${bodyCode}  }\n}`
      : bodyCode;

    onChangeCode(fullCode);
  };

  const saveNodeText = (nodeId: string, text: string) => {
    if (!text.trim()) return;

    const treeCopy = JSON.parse(JSON.stringify(treeNodes));
    const success = updateNodeInTree(treeCopy, nodeId, text);
    if (success) {
      setTreeNodes(treeCopy);
      syncTreeToCode(treeCopy);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    setHoveredNodeId(null);
    const treeCopy = JSON.parse(JSON.stringify(treeNodes));
    const success = deleteNodeInTree(treeCopy, nodeId);
    if (success) {
      setTreeNodes(treeCopy);
      syncTreeToCode(treeCopy);
    }
  };

  const handleOpenInsertMenu = (x: number, y: number, fromNodeId: string, branchType?: 'then' | 'else' | 'body') => {
    setInsertMenu({ x, y, fromNodeId, branchType });
  };

  const handleInsertNode = (type: 'declare' | 'process' | 'input' | 'output' | 'decision' | 'loop') => {
    if (!insertMenu) return;
    const { fromNodeId, branchType } = insertMenu;
    setInsertMenu(null);

    const randomId = Math.random().toString(36).substring(2, 7);
    const id = `visual-${type}-${randomId}`;

    let text = '';
    let thenBranch: FlowNode[] = [];
    let elseBranch: FlowNode[] = [];
    let bodyBranch: FlowNode[] = [];

    const actualType = type === 'declare' ? 'process' : type;

    switch (type) {
      case 'declare': {
        let name = 'x';
        if (declaredVars.includes(name)) {
          let count = 1;
          while (declaredVars.includes(`x${count}`)) {
            count++;
          }
          name = `x${count}`;
        }
        text = language === 'portugol' ? `inteiro ${name}` : `let ${name}`;
        break;
      }
      case 'process':
        text = '';
        break;
      case 'input':
        text = declaredVars.length > 0 ? `ler(${declaredVars[0]})` : 'ler()';
        break;
      case 'output':
        text = 'escrever("olá")';
        break;
      case 'decision':
        text = declaredVars.length > 0 ? `${declaredVars[0]} > 0` : 'x > 0';
        thenBranch = [];
        elseBranch = [];
        break;
      case 'loop':
        text = declaredVars.length > 0 ? `Enquanto (${declaredVars[0]} < 10)` : 'Enquanto (x < 10)';
        bodyBranch = [];
        break;
    }

    const newNode: FlowNode = {
      id,
      type: actualType,
      text,
      thenBranch: actualType === 'decision' ? thenBranch : undefined,
      elseBranch: actualType === 'decision' ? elseBranch : undefined,
      bodyBranch: actualType === 'loop' ? bodyBranch : undefined
    };

    const treeCopy = JSON.parse(JSON.stringify(treeNodes));
    let success = false;
    if (fromNodeId === 'start') {
      treeCopy.unshift(newNode);
      success = true;
    } else {
      success = insertNodeInTree(treeCopy, fromNodeId, newNode, branchType);
    }
    if (success) {
      setTreeNodes(treeCopy);
      syncTreeToCode(treeCopy);
      
      setActiveModalNode({
        id,
        type: actualType,
        text,
        isDeclare: type === 'declare'
      });
    }
  };

  if (!layout) {
    return (
      <div className="flowchart-empty-state">
        <p className="text-sm text-slate-400">
          Escreva um algoritmo válido no editor ou adicione o primeiro nó para visualizar o fluxograma correspondente.
        </p>
      </div>
    );
  }

  const menuItemStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary, #cbd5e1)',
    padding: '6px 12px',
    fontSize: '11px',
    fontFamily: 'var(--font-sans)',
    fontWeight: '500',
    textAlign: 'left' as const,
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'var(--transition-smooth)'
  };

  const zoomBtnStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary, #cbd5e1)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-smooth)'
  };

  return (
    <div 
      ref={containerRef}
      className="flowchart-container" 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        padding: '0',
        position: 'relative',
        cursor: isPanning ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
    >
      {/* Invisible backdrop to dismiss insert menu */}
      {insertMenu && (
        <div 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 90 }}
          onClick={() => setInsertMenu(null)}
        />
      )}

      {/* Floating Insert Dropdown */}
      {insertMenu && (
        <div 
          className="flow-insert-menu glass"
          style={{
            position: 'absolute',
            left: `${insertMenu.x * scale + translate.x}px`,
            top: `${insertMenu.y * scale + translate.y}px`,
            transform: 'translate(-50%, -50%)',
            background: 'var(--bg-elevated, #161c28)',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            borderRadius: '8px',
            padding: '4px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            zIndex: 100
          }}
        >
          <button className="flow-insert-menu-item" onClick={() => handleInsertNode('declare')} style={menuItemStyle}>Declaração (Variável)</button>
          <button className="flow-insert-menu-item" onClick={() => handleInsertNode('process')} style={menuItemStyle}>Atribuição</button>
          <button className="flow-insert-menu-item" onClick={() => handleInsertNode('input')} style={menuItemStyle}>Entrada (Ler)</button>
          <button className="flow-insert-menu-item" onClick={() => handleInsertNode('output')} style={menuItemStyle}>Saída (Escrever)</button>
          <button className="flow-insert-menu-item" onClick={() => handleInsertNode('decision')} style={menuItemStyle}>Decisão (Se)</button>
          <button className="flow-insert-menu-item" onClick={() => handleInsertNode('loop')} style={menuItemStyle}>Repetição (Enquanto)</button>
          <div style={{ height: '1px', background: 'var(--border-color, rgba(255,255,255,0.08))', margin: '2px 0' }} />
          <button className="flow-insert-menu-item" onClick={() => setInsertMenu(null)} style={{ ...menuItemStyle, color: 'var(--accent-rose, #f43f5e)' }}>Cancelar</button>
        </div>
      )}

      <svg 
        width="100%" 
        height="100%" 
        style={{ display: 'block', background: 'transparent' }}
      >
        {/* Definition for arrow markers and background pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--flow-grid-color)" strokeWidth="1" />
          </pattern>
          <marker 
            id="arrow" 
            viewBox="0 0 10 10" 
            refX="6" 
            refY="5" 
            markerWidth="6" 
            markerHeight="6" 
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--flow-line-color, #64748b)" />
          </marker>
          <marker 
            id="arrow-hover" 
            viewBox="0 0 10 10" 
            refX="6" 
            refY="5" 
            markerWidth="6" 
            markerHeight="6" 
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-cyan, #06b6d4)" />
          </marker>
        </defs>

        {/* Global zoom/pan group */}
        <g 
          transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`} 
          style={{ transformOrigin: '0px 0px' }}
        >
          {/* Canvas grid background inside the group so it moves & scales */}
          <rect x="-5000" y="-5000" width="10000" height="10000" fill="url(#grid)" pointerEvents="none" />

        {/* 1. Render Lines and Arrows */}
        {layout.layoutNodes.map((lNode) => (
          <React.Fragment key={`lines-${lNode.node.id}`}>
            {lNode.lines.map((line, idx) => {
              const midX = (line.x1 + line.x2) / 2;
              const midY = (line.y1 + line.y2) / 2;
              
              return (
                <g key={`line-${lNode.node.id}-${idx}`}>
                  {line.insertPoint ? (
                    <g 
                      className="flow-connection-interactive"
                      onClick={() => handleOpenInsertMenu(midX, midY, line.insertPoint!.fromNodeId, line.insertPoint!.branchType)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Thick transparent line to easily capture hover/click */}
                      <line 
                        x1={line.x1} 
                        y1={line.y1} 
                        x2={line.x2} 
                        y2={line.y2} 
                        stroke="transparent" 
                        strokeWidth="12"
                        pointerEvents="stroke"
                      />
                      {/* Visible connection line */}
                      <line 
                        x1={line.x1} 
                        y1={line.y1} 
                        x2={line.x2} 
                        y2={line.y2} 
                        stroke="var(--flow-line-color, #64748b)" 
                        strokeWidth="2"
                        className="flow-connect-line"
                        markerEnd={line.arrow ? "url(#arrow)" : undefined}
                      />
                    </g>
                  ) : (
                    <line 
                      x1={line.x1} 
                      y1={line.y1} 
                      x2={line.x2} 
                      y2={line.y2} 
                      stroke="var(--flow-line-color, #64748b)" 
                      strokeWidth="2"
                      markerEnd={line.arrow ? "url(#arrow)" : undefined}
                    />
                  )}
                  {line.label && (
                    <text 
                      x={midX + (line.x1 === line.x2 ? 8 : 0)} 
                      y={midY - (line.y1 === line.y2 ? 6 : 0)} 
                      className="flow-line-label"
                      textAnchor={line.x1 === line.x2 ? "start" : "middle"}
                      fill="var(--flow-line-color, #64748b)"
                      fontSize="9px"
                      fontWeight="bold"
                    >
                      {line.label}
                    </text>
                  )}
                </g>
              );
            })}
          </React.Fragment>
        ))}

        {/* 2. Render Nodes */}
        {layout.layoutNodes.map((lNode) => {
          const { node, x, y, width, height } = lNode;
          
          if (node.type === 'join') {
            return (
              <circle 
                key={node.id} 
                cx={x + width / 2} 
                cy={y + height / 2} 
                r={5} 
                fill="var(--border-color, rgba(255,255,255,0.2))"
                stroke="none"
              />
            );
          }

          // Choose shape details based on node type
          let shape: React.ReactNode;
          let colorClass: string;
          
          const isDeclaration = node.type === 'process' && (
            /^(inteiro|real|caracter|logico|let|const|var)\s/i.test(node.text)
          );

          if (isDeclaration) {
            shape = (
              <g>
                <rect x={x} y={y} width={width} height={height} rx={4} ry={4} />
                <line x1={x + 12} y1={y} x2={x + 12} y2={y + height} />
                <line x1={x + width - 12} y1={y} x2={x + width - 12} y2={y + height} />
              </g>
            );
            colorClass = "flow-declare";
          } else {
            switch (node.type) {
              case 'start':
                shape = <rect x={x} y={y} width={width} height={height} rx={height/2} ry={height/2} />;
                colorClass = "flow-start";
                break;
              case 'end':
                shape = <rect x={x} y={y} width={width} height={height} rx={height/2} ry={height/2} />;
                colorClass = "flow-end";
                break;
              case 'input':
                shape = <polygon points={`${x + 12},${y} ${x + width},${y} ${x + width - 12},${y + height} ${x},${y + height}`} />;
                colorClass = "flow-input";
                break;
              case 'output':
                shape = <polygon points={`${x + 12},${y} ${x + width},${y} ${x + width - 12},${y + height} ${x},${y + height}`} />;
                colorClass = "flow-output";
                break;
              case 'process':
                shape = <rect x={x} y={y} width={width} height={height} rx={4} ry={4} />;
                colorClass = "flow-process";
                break;
              case 'decision':
                shape = <polygon points={`${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height} ${x},${y + height / 2}`} />;
                colorClass = "flow-decision";
                break;
              case 'loop':
                shape = <polygon points={`${x + 12},${y} ${x + width - 12},${y} ${x + width},${y + height / 2} ${x + width - 12},${y + height} ${x + 12},${y + height} ${x},${y + height / 2}`} />;
                colorClass = "flow-loop";
                break;
              default:
                shape = <rect x={x} y={y} width={width} height={height} />;
                colorClass = "flow-process";
            }
          }

          const isHovered = hoveredNodeId === node.id && node.type !== 'start' && node.type !== 'end';

          const btnX = (node.type === 'decision' || node.type === 'loop')
            ? x + width - 18
            : x + width - 12;

          const btnY = (node.type === 'decision' || node.type === 'loop')
            ? y + height / 2
            : y + 12;

          const isActive = isNodeActive(node.id, activeLine);

          return (
            <g 
              key={node.id} 
              className={`flow-node ${colorClass} ${isActive ? 'active-node-execution' : ''}`}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onDoubleClick={() => {
                if (node.type !== 'start' && node.type !== 'end') {
                  setActiveModalNode({
                    id: node.id,
                    type: node.type,
                    text: node.text,
                    isDeclare: isDeclaration
                  });
                }
              }}
            >
              <title>{node.text}</title>
              {React.cloneElement(shape as React.ReactElement<React.SVGProps<SVGElement>>, {
                stroke: "currentColor",
                strokeWidth: 2,
                fill: "currentColor"
              })}
              <text 
                x={x + width / 2} 
                y={y + height / 2 + 4} 
                textAnchor="middle" 
                fontSize="11.5px"
                fontWeight="600"
                fontFamily="var(--font-sans)"
                fill="currentColor"
              >
                {displayNodeText(node.text)}
              </text>

              {/* Hover Delete Action Button */}
              {isHovered && (
                <g 
                  className="flow-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(node.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={btnX} cy={btnY} r={7} fill="var(--accent-rose, #f43f5e)" stroke="var(--bg-elevated, #161c28)" strokeWidth={1} />
                  <path d={`M ${btnX - 3} ${btnY - 3} L ${btnX + 3} ${btnY + 3} M ${btnX - 3} ${btnY + 3} L ${btnX + 3} ${btnY - 3}`} stroke="#000" strokeWidth={1.5} />
                </g>
              )}
            </g>
          );
        })}
        </g>
      </svg>

      {/* Floating Zoom / Pan Controls Overlay */}
      <div 
        className="flow-zoom-controls glass"
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 80,
          background: 'var(--bg-elevated, #161c28)',
          border: '1px solid var(--border-color, rgba(255,255,255,0.08))'
        }}
      >
        <span 
          style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            fontFamily: 'var(--font-sans)', 
            color: 'var(--text-secondary, #cbd5e1)',
            minWidth: '38px',
            textAlign: 'center'
          }}
        >
          {Math.round(scale * 100)}%
        </span>
        <div style={{ width: '1px', height: '14px', background: 'var(--border-color, rgba(255,255,255,0.08))' }} />
        <button 
          onClick={zoomOut}
          className="zoom-widget-btn"
          title="Afastar (-)"
          style={zoomBtnStyle}
        >
          <Minus style={{ width: '14px', height: '14px' }} />
        </button>
        <button 
          onClick={zoomIn}
          className="zoom-widget-btn"
          title="Aproximar (+)"
          style={zoomBtnStyle}
        >
          <Plus style={{ width: '14px', height: '14px' }} />
        </button>
        <button 
          onClick={resetZoom}
          className="zoom-widget-btn"
          title="Resetar Zoom (100%)"
          style={zoomBtnStyle}
        >
          <Maximize2 style={{ width: '14px', height: '14px' }} />
        </button>
      </div>

      {activeModalNode && (
        <NodeConfigModal
          node={activeModalNode}
          language={language}
          declaredVars={declaredVars}
          onSave={(newText) => {
            saveNodeText(activeModalNode.id, newText);
            setActiveModalNode(null);
          }}
          onClose={() => setActiveModalNode(null)}
        />
      )}
    </div>
  );
}
