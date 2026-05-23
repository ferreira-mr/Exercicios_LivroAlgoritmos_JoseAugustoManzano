import React, { useMemo } from 'react';
import type { FlowNode } from '../utils/flowchart-parser';
import { 
  parsePortugolASTToFlowNodes, 
  parseJSCodeToFlowNodes 
} from '../utils/flowchart-parser';

interface FlowchartTabProps {
  code: string;
  language: 'portugol' | 'javascript';
  astDeclarations?: any[];
}

interface LayoutNode {
  node: FlowNode;
  x: number;
  y: number;
  width: number;
  height: number;
  lines: { x1: number; y1: number; x2: number; y2: number; arrow?: boolean; label?: string }[];
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
        lines: i < nodes.length - 1 ? [{ x1: startX, y1: y + h, x2: startX, y2: y + h + 30, arrow: true }] : []
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
        { x1: startX - 110, y1: y + h / 2, x2: startX - 110, y2: branchStartY, arrow: true, label: 'Sim' },
        
        // False branch (right)
        { x1: startX + w / 2, y1: y + h / 2, x2: startX + 110, y2: y + h / 2 },
        { x1: startX + 110, y1: y + h / 2, x2: startX + 110, y2: branchStartY, arrow: true, label: 'Não' }
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
        lines: i < nodes.length - 1 ? [{ x1: startX, y1: joinY + joinH, x2: startX, y2: joinY + joinH + 30, arrow: true }] : []
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
        { x1: startX, y1: y + h, x2: startX, y2: bodyStartY, arrow: true, label: 'Verdade' },
        
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
        lines: i < nodes.length - 1 ? [{ x1: startX, y1: exitJunctionY + joinH / 2, x2: startX, y2: exitJunctionY + joinH / 2 + 30, arrow: true }] : []
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

export default function FlowchartTab({ code, language, astDeclarations }: FlowchartTabProps) {
  // Convert source code to FlowNode list
  const flowNodes = useMemo(() => {
    try {
      if (language === 'portugol' && astDeclarations) {
        return parsePortugolASTToFlowNodes(astDeclarations);
      } else {
        return parseJSCodeToFlowNodes(code);
      }
    } catch (e) {
      console.error('Error generating flowchart nodes:', e);
      return [];
    }
  }, [code, language, astDeclarations]);

  // Wrap in Start / End nodes
  const layout = useMemo(() => {
    if (flowNodes.length === 0) return null;
    
    const startNode: FlowNode = { id: 'start', type: 'start', text: 'Início' };
    const endNode: FlowNode = { id: 'end', type: 'end', text: 'Fim' };
    const fullList = [startNode, ...flowNodes, endNode];
    
    return layoutNodes(fullList, 300, 20);
  }, [flowNodes]);

  const displayNodeText = (text: string) => {
    if (text.length > 18) {
      return text.slice(0, 16) + '...';
    }
    return text;
  };

  if (!layout || flowNodes.length === 0) {
    return (
      <div className="flowchart-empty-state">
        <p className="text-sm text-slate-400">
          Escreva um algoritmo válido no editor para visualizar o fluxograma correspondente.
        </p>
      </div>
    );
  }

  // Calculate SVG dimensions
  const svgWidth = 600;
  const svgHeight = layout.height + 40;

  return (
    <div className="flowchart-container" style={{ width: '100%', height: '100%', overflow: 'auto', padding: '1rem' }}>
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
              // Parallelogram (斜平行四边形)
              shape = <polygon points={`${x + 12},${y} ${x + width},${y} ${x + width - 12},${y + height} ${x},${y + height}`} />;
              colorClass = "flow-input";
              break;
            case 'output':
              // Parallelogram
              shape = <polygon points={`${x + 12},${y} ${x + width},${y} ${x + width - 12},${y + height} ${x},${y + height}`} />;
              colorClass = "flow-output";
              break;
            case 'process':
              // Rectangle
              shape = <rect x={x} y={y} width={width} height={height} />;
              colorClass = "flow-process";
              break;
            case 'decision':
              // Diamond (Rhombus)
              shape = <polygon points={`${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height} ${x},${y + height / 2}`} />;
              colorClass = "flow-decision";
              break;
            case 'loop':
              // Hexagon
              shape = <polygon points={`${x + 12},${y} ${x + width - 12},${y} ${x + width},${y + height / 2} ${x + width - 12},${y + height} ${x + 12},${y + height} ${x},${y + height / 2}`} />;
              colorClass = "flow-loop";
              break;
            default:
              shape = <rect x={x} y={y} width={width} height={height} />;
              colorClass = "flow-process";
          }

          return (
            <g key={node.id} className={`flow-node ${colorClass}`}>
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
            </g>
          );
        })}
      </svg>
    </div>
  );
}
