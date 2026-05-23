import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Plus, Minus, Maximize2 } from 'lucide-react';
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
    
    const fullCode = language === 'portugol'
      ? `programa {\n  funcao inicio() {\n${bodyCode}  }\n}`
      : bodyCode;

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

          const btnX = node.type === 'decision'
            ? x + width * 0.78
            : node.type === 'loop'
              ? x + width - 12
              : x + width - 4;

          const btnY = node.type === 'decision'
            ? y + height * 0.22
            : y + 4;

          // Editable inline text input
          if (editingNodeId === node.id) {
            return (
              <g key={node.id} className={`flow-node ${colorClass}`}>
                {React.cloneElement(shape as React.ReactElement<React.SVGProps<SVGElement>>, {
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
              {/* Invisible hit target to maintain hover when moving to delete button */}
              <rect 
                x={x - 10} 
                y={y - 10} 
                width={width + 20} 
                height={height + 20} 
                fill="transparent" 
                pointerEvents="all" 
              />
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
    </div>
  );
}
