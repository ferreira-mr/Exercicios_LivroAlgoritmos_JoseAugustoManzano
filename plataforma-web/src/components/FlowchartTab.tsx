import React, { useMemo, useState, useEffect } from 'react';
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
      
      const bodyStartY = currentY + h + 35;
      const bodyLayout = layoutNodes(node.bodyBranch || [], startX, bodyStartY);
      const bodyEndY = bodyLayout.endY;
      
      const exitJunctionY = bodyEndY + 10;
      const joinW = 10;
      const joinH = 10;
      
      const lines: LayoutNode['lines'] = [
        // Down into body
        { 
          x1: startX, y1: y + h, x2: startX, y2: bodyStartY, arrow: true, label: 'Verdade',
          insertPoint: { fromNodeId: node.id, branchType: 'body' }
        },
        
        // Loop back up from body end
        { x1: startX, y1: bodyEndY - 30, x2: startX - 100, y2: bodyEndY - 30 },
        { x1: startX - 100, y1: bodyEndY - 30, x2: startX - 100, y2: y + h / 2 },
        { x1: startX - 100, y1: y + h / 2, x2: startX - w / 2, y2: y + h / 2, arrow: true },
        
        // Exit loop (right branch)
        { x1: startX + w / 2, y1: y + h / 2, x2: startX + 100, y2: y + h / 2 },
        { x1: startX + 100, y1: y + h / 2, x2: startX + 100, y2: exitJunctionY },
        { x1: startX + 100, y1: exitJunctionY, x2: startX, y2: exitJunctionY, arrow: true, label: 'Falso' }
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
      
      const exitJunctionNode: FlowNode = { id: `${node.id}-exit`, type: 'join', text: '' };
      list.push({
        node: exitJunctionNode,
        x: startX - joinW / 2,
        y: exitJunctionY - joinH / 2,
        width: joinW,
        height: joinH,
        lines: i < nodes.length - 1 ? [{ 
          x1: startX, y1: exitJunctionY + joinH / 2, x2: startX, y2: exitJunctionY + joinH / 2 + 30, arrow: true,
          insertPoint: { fromNodeId: node.id }
        }] : []
      });
      
      currentY = exitJunctionY + joinH / 2 + 30;
      maxWidth = Math.max(maxWidth, 220);
    }
  }

  return {
    layoutNodes: list,
    width: maxWidth,
    height: currentY - startY,
    endY: currentY
  };
}

export default function FlowchartTab({ code, language, astDeclarations, onChangeCode }: FlowchartTabProps) {
  // Editing states
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [insertMenu, setInsertMenu] = useState<{ x: number; y: number; fromNodeId: string; branchType?: 'then' | 'else' | 'body' } | null>(null);

  // Local tree state for editing
  const [treeNodes, setTreeNodes] = useState<FlowNode[]>([]);

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
    if (treeNodes.length === 0) return null;
    
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
    
    let fullCode = '';
    if (language === 'portugol') {
      fullCode = `programa {\n  funcao inicio() {\n${bodyCode}  }\n}`;
    } else {
      fullCode = bodyCode;
    }

    onChangeCode(fullCode);
  };

  const saveNodeText = (nodeId: string, text: string) => {
    setEditingNodeId(null);
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

  const handleInsertNode = (type: 'process' | 'input' | 'output' | 'decision' | 'loop') => {
    if (!insertMenu) return;
    const { fromNodeId, branchType } = insertMenu;
    setInsertMenu(null);

    const randomId = Math.random().toString(36).substring(2, 7);
    const id = `visual-${type}-${randomId}`;

    let text = '';
    let thenBranch: FlowNode[] = [];
    let elseBranch: FlowNode[] = [];
    let bodyBranch: FlowNode[] = [];

    switch (type) {
      case 'process':
        text = 'x = 0';
        break;
      case 'input':
        text = 'ler(x)';
        break;
      case 'output':
        text = 'escrever("olá")';
        break;
      case 'decision':
        text = 'x > 0';
        thenBranch = [];
        elseBranch = [];
        break;
      case 'loop':
        text = 'Enquanto (x < 10)';
        bodyBranch = [];
        break;
    }

    const newNode: FlowNode = {
      id,
      type,
      text,
      thenBranch: type === 'decision' ? thenBranch : undefined,
      elseBranch: type === 'decision' ? elseBranch : undefined,
      bodyBranch: type === 'loop' ? bodyBranch : undefined
    };

    const treeCopy = JSON.parse(JSON.stringify(treeNodes));
    const success = insertNodeInTree(treeCopy, fromNodeId, newNode, branchType);
    if (success) {
      setTreeNodes(treeCopy);
      syncTreeToCode(treeCopy);
      
      // Focus inline input immediately to edit node parameters
      setTimeout(() => {
        setEditingNodeId(id);
      }, 80);
    }
  };

  if (!layout || treeNodes.length === 0) {
    return (
      <div className="flowchart-empty-state">
        <p className="text-sm text-slate-400">
          Escreva um algoritmo válido no editor ou adicione o primeiro nó para visualizar o fluxograma correspondente.
        </p>
      </div>
    );
  }

  const svgWidth = 600;
  const svgHeight = layout.height + 40;

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

  return (
    <div 
      className="flowchart-container" 
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'auto', 
        padding: '1rem',
        position: 'relative'
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
            left: `${insertMenu.x}px`,
            top: `${insertMenu.y}px`,
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
        width={svgWidth} 
        height={svgHeight} 
        viewBox={`0 0 600 ${svgHeight}`}
        style={{ margin: '0 auto', display: 'block' }}
      >
        {/* Definition for arrow markers */}
        <defs>
          <marker 
            id="arrow" 
            viewBox="0 0 10 10" 
            refX="6" 
            refY="5" 
            markerWidth="6" 
            markerHeight="6" 
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted, #64748b)" />
          </marker>
        </defs>

        {/* 1. Render Lines and Arrows */}
        {layout.layoutNodes.map((lNode) => (
          <React.Fragment key={`lines-${lNode.node.id}`}>
            {lNode.lines.map((line, idx) => {
              const midX = (line.x1 + line.x2) / 2;
              const midY = (line.y1 + line.y2) / 2;
              
              return (
                <g key={`line-${lNode.node.id}-${idx}`}>
                  <line 
                    x1={line.x1} 
                    y1={line.y1} 
                    x2={line.x2} 
                    y2={line.y2} 
                    stroke="var(--border-color, rgba(255,255,255,0.15))" 
                    strokeWidth="2"
                    markerEnd={line.arrow ? "url(#arrow)" : undefined}
                  />
                  {line.label && (
                    <text 
                      x={midX + (line.x1 === line.x2 ? 8 : 0)} 
                      y={midY - (line.y1 === line.y2 ? 6 : 0)} 
                      className="flow-line-label"
                      textAnchor={line.x1 === line.x2 ? "start" : "middle"}
                      fill="var(--text-muted, #64748b)"
                      fontSize="9px"
                      fontWeight="bold"
                    >
                      {line.label}
                    </text>
                  )}
                  {/* Plus button for inserting node */}
                  {line.insertPoint && (
                    <g 
                      className="flow-insert-btn"
                      onClick={() => handleOpenInsertMenu(midX, midY, line.insertPoint!.fromNodeId, line.insertPoint!.branchType)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle 
                        cx={midX} 
                        cy={midY} 
                        r={8} 
                        fill="var(--bg-elevated, #161c28)" 
                        stroke="var(--accent-cyan, #06b6d4)" 
                        strokeWidth="1.5" 
                      />
                      <line x1={midX - 4} y1={midY} x2={midX + 4} y2={midY} stroke="var(--text-primary, #f8fafc)" strokeWidth="1.5" />
                      <line x1={midX} y1={midY - 4} x2={midX} y2={midY + 4} stroke="var(--text-primary, #f8fafc)" strokeWidth="1.5" />
                    </g>
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
          let shape = null;
          let colorClass = "";
          
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
              shape = <rect x={x} y={y} width={width} height={height} />;
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

          const isHovered = hoveredNodeId === node.id && node.type !== 'start' && node.type !== 'end';

          // Editable inline text input
          if (editingNodeId === node.id) {
            return (
              <g key={node.id} className={`flow-node ${colorClass}`}>
                {React.cloneElement(shape as React.ReactElement<any>, {
                  stroke: "var(--accent-cyan, #06b6d4)",
                  strokeWidth: 2.5,
                  fill: "currentColor"
                })}
                <foreignObject 
                  x={x + 8} 
                  y={y + height / 2 - 12} 
                  width={width - 16} 
                  height={24}
                >
                  <input
                    type="text"
                    defaultValue={node.text}
                    onBlur={(e) => saveNodeText(node.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveNodeText(node.id, e.currentTarget.value);
                      if (e.key === 'Escape') setEditingNodeId(null);
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'var(--bg-elevated, #161c28)',
                      color: 'var(--text-primary, #f8fafc)',
                      border: '1px solid var(--accent-cyan, #06b6d4)',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace',
                      textAlign: 'center',
                      outline: 'none',
                      padding: '0 2px'
                    }}
                    autoFocus
                  />
                </foreignObject>
              </g>
            );
          }

          return (
            <g 
              key={node.id} 
              className={`flow-node ${colorClass}`}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onDoubleClick={() => {
                if (node.type !== 'start' && node.type !== 'end') {
                  setEditingNodeId(node.id);
                }
              }}
            >
              <title>{node.text}</title>
              {React.cloneElement(shape as React.ReactElement<any>, {
                stroke: "currentColor",
                strokeWidth: 2,
                fill: "currentColor"
              })}
              <text 
                x={x + width / 2} 
                y={y + height / 2 + 4} 
                textAnchor="middle" 
                fontSize="11px"
                fontWeight="500"
                fontFamily="JetBrains Mono, monospace"
                fill="var(--bg-main, #0f172a)"
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
                  <circle cx={x + width - 4} cy={y + 4} r={7} fill="var(--accent-rose, #f43f5e)" stroke="var(--bg-elevated, #161c28)" strokeWidth={1} />
                  <path d={`M ${x + width - 7} ${y + 1} L ${x + width - 1} ${y + 7} M ${x + width - 7} ${y + 7} L ${x + width - 1} ${y + 1}`} stroke="#000" strokeWidth={1.5} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
