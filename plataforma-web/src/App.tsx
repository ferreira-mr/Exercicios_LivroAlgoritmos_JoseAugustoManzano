import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import { 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Code, 
  Terminal, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  Menu,
  Sun,
  Moon,
  BookOpen, 
  Sparkles, 
  RefreshCw, 
  Award,
  Workflow
} from 'lucide-react';

import exercisesData from './data/exercises.json';
import testsOverrides from './data/tests.json';
import { runCode, runJSCode } from './utils/runner';
import { registerPortugolLanguage } from './utils/portugol-monaco';
import { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio } from '@designliquido/portugol-studio';
import FlowchartTab from './components/FlowchartTab';

interface Exercise {
  id: string;
  number: number;
  title: string;
  chapterDir: string;
  chapterName: string;
  description: string;
  steps: string;
  examples: string;
  pseudocode: string;
}

interface ConsoleLine {
  type: 'stdout' | 'stderr' | 'stdin';
  text: string;
}

interface TestResult {
  inputs: string[];
  expected: string[];
  actual: string;
  passed: boolean;
  error?: string;
}

// Convert exercises data to type-safe array
const exercises = exercisesData as Exercise[];

function getDefaultCode(exercise: Exercise, language: 'portugol' | 'javascript' = 'portugol'): string {
  if (language === 'javascript') {
    return `// Exercício: ${exercise.number} - ${exercise.title}
// Utilize "await read()" para ler dados do console.
// Utilize "write()" ou "writeln()" para imprimir saídas na tela.

const valor = parseFloat(await read("Digite um número: "));
writeln("O valor duplicado é: " + (valor * 2));
`;
  }

  return `programa {
  // Exercício: ${exercise.number} - ${exercise.title}
  
  funcao inicio() {
    // Escreva seu código aqui
    
  }
}`;
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-slate-100 highlight-term">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-pink-600 dark:text-pink-400 font-semibold">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

interface ParsedStep {
  title: string;
  items: string[];
}

function parseSteps(stepsText: string): ParsedStep[] {
  if (!stepsText) return [];
  const lines = stepsText.split('\n');
  const stepsList: ParsedStep[] = [];
  let currentStep: ParsedStep | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    const headerMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (headerMatch) {
      if (currentStep) {
        stepsList.push(currentStep);
      }
      currentStep = {
        title: headerMatch[2].replace(/:$/, ''),
        items: []
      };
      continue;
    }
    
    if (trimmed.startsWith('- ')) {
      if (currentStep) {
        currentStep.items.push(trimmed.substring(2));
      }
    } else {
      if (currentStep) {
        currentStep.items.push(trimmed);
      }
    }
  }
  
  if (currentStep) {
    stepsList.push(currentStep);
  }
  
  return stepsList;
}

interface ParsedExample {
  name: string;
  entrada: string;
  saida: string;
  processamento?: string;
}

function parseExamples(examplesText: string): ParsedExample[] {
  if (!examplesText) return [];
  const blocks = examplesText.split(/- Exemplo \d+:/gi);
  const list: ParsedExample[] = [];
  
  let exampleIndex = 1;
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    const entradaMatch = block.match(/-\s*Entrada:\s*(.*)/i);
    const saidaMatch = block.match(/-\s*Saída:\s*(.*)/i);
    const procMatch = block.match(/-\s*Processamento:\s*(.*)/i);
    
    if (entradaMatch && saidaMatch) {
      list.push({
        name: `Exemplo ${exampleIndex++}`,
        entrada: entradaMatch[1].trim(),
        saida: saidaMatch[1].trim(),
        processamento: procMatch ? procMatch[1].trim() : undefined
      });
    }
  }
  return list;
}



export default function App() {
  // --- STATE ---
  const [activeEx, setActiveEx] = useState<Exercise>(exercises[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [code, setCode] = useState('');

  // Active Language state
  const [activeLanguage, setActiveLanguage] = useState<'portugol' | 'javascript'>(() => {
    const saved = localStorage.getItem('manzano_active_language');
    return (saved as 'portugol' | 'javascript') || 'portugol';
  });

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('manzano_theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  // Sidebar collapsible state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('manzano_sidebar_collapsed');
    return saved === 'true';
  });
  
  // Collapse state for Chapters
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({});
  
  // Interactive Console
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([]);
  const [inputRequired, setInputRequired] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputResolverRef = useRef<((val: string) => void) | null>(null);
  
  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [activeTab, setActiveTab] = useState<'console' | 'tests'>('console');
  
  // Persistence (saved progress)
  const [completedExs, setCompletedExs] = useState<string[]>([]);
  const [savedCodes, setSavedCodes] = useState<Record<string, string>>({});
  
  // Left Panel Tab state
  const [leftTab, setLeftTab] = useState<'enunciado' | 'fluxograma'>('enunciado');
  
  // AST state for Portugol code to render flowchart in real-time
  const [astDeclarations, setAstDeclarations] = useState<any[]>([]);

  
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const consoleInputRef = useRef<HTMLInputElement>(null);

  // --- INITIAL LOAD & SYNC ---
  useEffect(() => {
    // Load progress from localStorage
    const savedCompleted = localStorage.getItem('manzano_completed');
    if (savedCompleted) {
      setCompletedExs(JSON.parse(savedCompleted));
    }
    
    const savedCodesStr = localStorage.getItem('manzano_saved_codes');
    if (savedCodesStr) {
      setSavedCodes(JSON.parse(savedCodesStr));
    }
    
    const lastActiveId = localStorage.getItem('manzano_active_id');
    if (lastActiveId) {
      const found = exercises.find(ex => ex.id === lastActiveId);
      if (found) setActiveEx(found);
    }
  }, []);

  // Sync theme changes to html class and localStorage
  useEffect(() => {
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    localStorage.setItem('manzano_theme', theme);
  }, [theme]);

  // Sync sidebarCollapsed changes to localStorage
  useEffect(() => {
    localStorage.setItem('manzano_sidebar_collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Sync activeLanguage changes to localStorage
  useEffect(() => {
    localStorage.setItem('manzano_active_language', activeLanguage);
  }, [activeLanguage]);

  // Parse Portugol code in real-time with a debounce to feed the flowchart
  useEffect(() => {
    if (activeLanguage !== 'portugol') return;
    if (!code) return;
    
    const parseCode = async () => {
      try {
        const lexer = new LexadorPortugolStudio();
        const parser = new AvaliadorSintaticoPortugolStudio();
        const lex = lexer.mapear(code.split('\n'), -1);
        const parsed = await parser.analisar(lex, -1);
        if (parsed && parsed.declaracoes) {
          setAstDeclarations(parsed.declaracoes);
        }
      } catch (e) {
        // Silent error while editing code
      }
    };

    const timer = setTimeout(parseCode, 500);
    return () => clearTimeout(timer);
  }, [code, activeLanguage]);

  // Update editor code when active exercise or language changes
  useEffect(() => {
    if (activeEx) {
      const codeKey = `${activeEx.id}_${activeLanguage}`;
      const saved = savedCodes[codeKey];
      if (saved) {
        setCode(saved);
      } else {
        setCode(getDefaultCode(activeEx, activeLanguage));
      }
      // Reset runner status
      setConsoleLines([
        { type: 'stdout', text: 'Console pronto para execução. Clique em "Executar" para iniciar.' }
      ]);
      setTestResults(null);
      setActiveTab('console');
      setInputRequired(false);
      
      // Save active ID
      localStorage.setItem('manzano_active_id', activeEx.id);
    }
  }, [activeEx, activeLanguage, savedCodes]);

  // Scroll to console bottom
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLines]);

  // Focus console input when input is required
  useEffect(() => {
    if (inputRequired) {
      consoleInputRef.current?.focus();
    }
  }, [inputRequired]);

  // --- FUNCTIONS ---
  const saveCode = (newCode: string) => {
    setCode(newCode);
    const codeKey = `${activeEx.id}_${activeLanguage}`;
    const updated = { ...savedCodes, [codeKey]: newCode };
    setSavedCodes(updated);
    localStorage.setItem('manzano_saved_codes', JSON.stringify(updated));
  };

  const handleEditorMount = (_editor: any, monaco: Monaco) => {
    registerPortugolLanguage(monaco);
  };

  const toggleChapter = (dir: string) => {
    setCollapsedChapters(prev => ({ ...prev, [dir]: !prev[dir] }));
  };

  const runCodeInteractive = async () => {
    if (isRunning || isTesting) return;
    
    setIsRunning(true);
    setActiveTab('console');
    setConsoleLines([{ type: 'stdout', text: '--- EXECUÇÃO INICIADA ---' }]);
    
    const runner = activeLanguage === 'javascript' ? runJSCode : runCode;
    const result = await runner({
      code,
      onOutput: (text) => {
        setConsoleLines(prev => [...prev, { type: 'stdout', text }]);
      },
      onInputRequired: (prompt, onSubmit) => {
        setInputPrompt(prompt || 'Digite um valor:');
        setInputRequired(true);
        inputResolverRef.current = onSubmit;
      },
      onClearScreen: () => {
        setConsoleLines([]);
      }
    });

    setInputRequired(false);
    setIsRunning(false);

    if (result.success) {
      setConsoleLines(prev => [...prev, { type: 'stdout', text: '\n--- EXECUÇÃO CONCLUÍDA COM SUCESSO ---' }]);
    } else {
      setConsoleLines(prev => [
        ...prev,
        ...result.errors.map(err => ({ type: 'stderr' as const, text: err })),
        { type: 'stderr', text: '\n--- EXECUÇÃO FINALIZADA COM ERROS ---' }
      ]);
    }
  };

  const handleConsoleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRequired || !inputResolverRef.current) return;

    const val = inputValue;
    setInputValue('');
    setInputRequired(false);
    
    // Log user input to console
    setConsoleLines(prev => [...prev, { type: 'stdin', text: `${inputPrompt} ${val}` }]);
    
    // Resolve callback to resume execution
    const resolve = inputResolverRef.current;
    inputResolverRef.current = null;
    resolve(val);
  };

  const runAutomatedTests = async () => {
    if (isRunning || isTesting) return;

    setIsTesting(true);
    setActiveTab('tests');
    setTestResults([]);

    // 1. Get test cases
    const cases = getTestCases(activeEx);

    if (cases.length === 0) {
      setTestResults(null);
      setIsTesting(false);
      alert('Não foi possível identificar exemplos de teste para este exercício. Realize a verificação manual executando o algoritmo.');
      return;
    }

    const results: TestResult[] = [];

    // 2. Execute each test case
    for (const testCase of cases) {
      let testOutput = '';
      const runner = activeLanguage === 'javascript' ? runJSCode : runCode;
      const runRes = await runner({
        code,
        inputs: testCase.inputs,
        onOutput: (text) => {
          testOutput += text + '\n';
        }
      });

      let passed = false;
      let error = '';

      if (runRes.success) {
        // Match output
        const cleanActual = testOutput.toLowerCase().replace(/\s+/g, ' ');
        const matchAll = testCase.matchType === 'all';
        if (matchAll) {
          passed = testCase.outputs.every(expected => {
            const cleanExpected = expected.toLowerCase().trim();
            return cleanActual.includes(cleanExpected);
          });
        } else {
          passed = testCase.outputs.some(expected => {
            const cleanExpected = expected.toLowerCase().trim();
            return cleanActual.includes(cleanExpected);
          });
        }
      } else {
        passed = false;
        error = runRes.errors.join('\n');
      }

      results.push({
        inputs: testCase.inputs,
        expected: testCase.outputs,
        actual: testOutput.trim(),
        passed,
        error
      });
    }

    setTestResults(results);
    setIsTesting(false);

    // 3. Save progress if all tests passed
    const allPassed = results.every(r => r.passed);
    if (allPassed && !completedExs.includes(activeEx.id)) {
      const updated = [...completedExs, activeEx.id];
      setCompletedExs(updated);
      localStorage.setItem('manzano_completed', JSON.stringify(updated));
    }
  };

  const getTestCases = (ex: Exercise): { inputs: string[]; outputs: string[]; matchType?: 'all' | 'any' }[] => {
    // 1. Check overrides first
    const override = (testsOverrides as any)[ex.id];
    if (override && override.cases && override.cases.length > 0) {
      return override.cases;
    }

    // 2. Dynamic fallback parsing from examples text
    const cases: { inputs: string[]; outputs: string[] }[] = [];
    const rawExamples = ex.examples;
    if (!rawExamples) return cases;

    const exampleBlocks = rawExamples.split(/- Exemplo \d+:/gi);
    for (const block of exampleBlocks) {
      if (!block.trim()) continue;

      const entradaMatch = block.match(/-\s*Entrada:\s*(.*)/i);
      const saidaMatch = block.match(/-\s*Saída:\s*(.*)/i);

      if (entradaMatch && saidaMatch) {
        const entradaStr = entradaMatch[1];
        const saidaStr = saidaMatch[1];

        // Match float, integers, negative numbers
        const inputs: string[] = [];
        const numberRegex = /-?\d+(?:\.\d+)?/g;
        let match;
        while ((match = numberRegex.exec(entradaStr)) !== null) {
          inputs.push(match[0]);
        }

        // Output sanitization
        let expectedOutput = saidaStr.split('(')[0].trim().split(' ')[0].trim();
        // Remove trailing letters/formatting
        expectedOutput = expectedOutput.replace(/[^\d.-]/g, '');

        if (inputs.length > 0 && expectedOutput) {
          cases.push({
            inputs,
            outputs: [expectedOutput]
          });
        }
      }
    }

    return cases;
  };

  const resetExercise = () => {
    if (window.confirm('Tem certeza de que deseja restaurar o código original deste exercício?')) {
      const codeKey = `${activeEx.id}_${activeLanguage}`;
      const updated = { ...savedCodes };
      delete updated[codeKey];
      setSavedCodes(updated);
      localStorage.setItem('manzano_saved_codes', JSON.stringify(updated));
      setCode(getDefaultCode(activeEx, activeLanguage));
    }
  };

  // Group exercises by chapter for rendering in the sidebar
  const chaptersMap = new Map<string, { name: string; exercises: Exercise[] }>();
  exercises.forEach((ex) => {
    if (!chaptersMap.has(ex.chapterDir)) {
      chaptersMap.set(ex.chapterDir, { name: ex.chapterName, exercises: [] });
    }
    chaptersMap.get(ex.chapterDir)!.exercises.push(ex);
  });

  const chapters = Array.from(chaptersMap.entries()).map(([dir, data]) => ({
    dir,
    name: data.name,
    exercises: data.exercises.sort((a, b) => a.number - b.number)
  }));

  // Filtering for Search
  const filteredChapters = chapters.map(chap => {
    const matchedExs = chap.exercises.filter(ex => 
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...chap,
      exercises: matchedExs
    };
  }).filter(chap => chap.exercises.length > 0);

  const totalExercisesCount = exercises.length;
  const completedPercent = totalExercisesCount > 0 
    ? Math.round((completedExs.length / totalExercisesCount) * 100)
    : 0;

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className={`sidebar glass ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-row">
            <div className="brand">
              <BookOpen className="brand-icon w-6 h-6" />
              <h1 className="brand-title">Manzano Portugol</h1>
            </div>
            <button 
              onClick={() => setSidebarCollapsed(true)} 
              className="sidebar-collapse-btn"
              title="Recolher menu"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${completedPercent}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span>Progresso Geral</span>
            <span>{completedExs.length} / {totalExercisesCount} ({completedPercent}%)</span>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar exercício..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <nav className="sidebar-content">
          {(searchQuery ? filteredChapters : chapters).map((chap) => {
            const isCollapsed = !searchQuery && collapsedChapters[chap.dir];
            const completedInChapter = chap.exercises.filter(ex => completedExs.includes(ex.id)).length;
            
            return (
              <div key={chap.dir} className="chapter-group">
                <div 
                  className={`chapter-header ${activeEx.chapterDir === chap.dir ? 'active' : ''}`}
                  onClick={() => toggleChapter(chap.dir)}
                >
                  <div className="chapter-title">
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span>{chap.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {completedInChapter}/{chap.exercises.length}
                  </span>
                </div>

                {!isCollapsed && (
                  <div className="exercise-list">
                    {chap.exercises.map((ex) => {
                      const isActive = activeEx.id === ex.id;
                      const isCompleted = completedExs.includes(ex.id);
                      
                      return (
                        <div
                          key={ex.id}
                          onClick={() => setActiveEx(ex)}
                          className={`exercise-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                          title={ex.title}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                          ) : (
                            <div className="w-3.5 h-3.5 flex-shrink-0 rounded-full border border-slate-700"></div>
                          )}
                          <span className="truncate">Ex {ex.number}: {ex.title}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* WORKSPACE */}
      <main className="workspace-container">
        {/* TOP SPLIT PANELS */}
        <div className="main-panels">
          {/* LEFT: Markdown Description */}
          <section className="instruction-panel glass">
            <div className="panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {sidebarCollapsed && (
                  <button 
                    onClick={() => setSidebarCollapsed(false)}
                    className="sidebar-toggle-floating-btn"
                    title="Mostrar menu lateral"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                )}
                <div className="language-selector-tabs" style={{ display: 'flex', gap: '4px' }}>
                  <button 
                    className={`lang-tab ${leftTab === 'enunciado' ? 'active' : ''}`}
                    onClick={() => setLeftTab('enunciado')}
                  >
                    <BookOpen className="w-3.5 h-3.5" style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} /> Enunciado
                  </button>
                  <button 
                    className={`lang-tab ${leftTab === 'fluxograma' ? 'active' : ''}`}
                    onClick={() => setLeftTab('fluxograma')}
                  >
                    <Workflow className="w-3.5 h-3.5" style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} /> Fluxograma
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="instruction-content">
              {leftTab === 'enunciado' ? (
                <>
                  {/* Description Card */}
                  <div className="description-card">
                    <div className="section-title-wrapper">
                      <BookOpen className="section-title-icon text-cyan" />
                      <span className="section-title-text">Enunciado</span>
                    </div>
                    <p className="description-text">
                      {parseInlineMarkdown(activeEx.description)}
                    </p>
                  </div>

                  {/* Steps timeline card */}
                  {activeEx.steps && parseSteps(activeEx.steps).length > 0 && (
                    <div className="timeline-section">
                      <h3 className="section-subtitle">
                        <Sparkles className="subtitle-icon text-purple" /> Passo a Passo
                      </h3>
                      <div className="steps-timeline">
                        {parseSteps(activeEx.steps).map((step, idx) => (
                          <div key={idx} className="step-item">
                            {/* Step Icon Indicator */}
                            <div className="step-indicator">
                              {idx + 1}
                            </div>
                            {/* Step Content */}
                            <div className="step-content">
                              <h4 className="step-title">{step.title}</h4>
                              {/* Step Sub-items */}
                              {step.items.length > 0 && (
                                <ul className="step-sublist">
                                  {step.items.map((sub, sIdx) => (
                                    <li key={sIdx} className="step-subitem">
                                      <span className="step-bullet">•</span>
                                      <span className="step-subitem-text">{parseInlineMarkdown(sub)}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examples terminal layout */}
                  {activeEx.examples && parseExamples(activeEx.examples).length > 0 && (
                    <div className="examples-section">
                      <h3 className="section-subtitle">
                        <Award className="subtitle-icon text-amber" /> Exemplos de E/S
                      </h3>
                      <div className="examples-grid">
                        {parseExamples(activeEx.examples).map((item, idx) => (
                          <div key={idx} className="terminal-card">
                            {/* Header */}
                            <div className="terminal-header">
                              <div className="terminal-dots">
                                <span className="dot dot-red"></span>
                                <span className="dot dot-yellow"></span>
                                <span className="dot dot-green"></span>
                              </div>
                              <span className="terminal-title">{item.name}</span>
                            </div>
                            {/* Body */}
                            <div className="terminal-body">
                              <div className="terminal-row">
                                <span className="terminal-label">Entrada:</span>
                                <span className="terminal-input">{item.entrada}</span>
                              </div>
                              {item.processamento && (
                                <div className="terminal-comment">
                                  // {item.processamento}
                                </div>
                              )}
                              <div className="terminal-row">
                                <span className="terminal-label">Saída:</span>
                                <span className="terminal-output">{item.saida}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <FlowchartTab 
                  code={code} 
                  language={activeLanguage} 
                  astDeclarations={astDeclarations} 
                />
              )}
            </div>
          </section>

          {/* RIGHT: Monaco Editor */}
          <section className="editor-panel">
            <div className="panel-header">
              <span className="panel-title">
                <Code className="w-4 h-4 text-purple-400" /> {activeLanguage === 'javascript' ? 'Editor JavaScript' : 'Editor Portugol Studio'}
              </span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="language-selector-tabs">
                  <button 
                    className={`lang-tab ${activeLanguage === 'portugol' ? 'active' : ''}`}
                    onClick={() => setActiveLanguage('portugol')}
                  >
                    Portugol
                  </button>
                  <button 
                    className={`lang-tab ${activeLanguage === 'javascript' ? 'active' : ''}`}
                    onClick={() => setActiveLanguage('javascript')}
                  >
                    JavaScript
                  </button>
                </div>
                
                {completedExs.includes(activeEx.id) && (
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3" /> Resolvido
                  </span>
                )}
              </div>
            </div>

            <div className="editor-wrapper">
              <Editor
                height="100%"
                language={activeLanguage === 'javascript' ? 'javascript' : 'portugol'}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                value={code}
                onChange={(val) => saveCode(val || '')}
                onMount={handleEditorMount}
                options={{
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono, Courier New, monospace',
                  minimap: { enabled: false },
                  automaticLayout: true,
                  padding: { top: 12 },
                  lineNumbersMinChars: 3
                }}
              />
            </div>

            <div className="action-bar">
              <button 
                onClick={resetExercise}
                className="btn btn-secondary" 
                title="Limpar progresso e resetar código"
                disabled={isRunning || isTesting}
              >
                <RefreshCw className="w-4 h-4" /> Resetar
              </button>
              
              <div className="btn-group">
                <button 
                  onClick={runCodeInteractive}
                  className="btn btn-primary"
                  disabled={isRunning || isTesting}
                >
                  <Play className="w-4 h-4" /> Executar
                </button>
                <button 
                  onClick={runAutomatedTests}
                  className="btn btn-success"
                  disabled={isRunning || isTesting}
                >
                  <CheckCircle className="w-4 h-4" /> Testar Resolução
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM PANEL DRAWER */}
        <section className="bottom-drawer">
          {/* Drawer Tabs Header */}
          <div className="drawer-tabs-header">
            <div 
              className={`drawer-tab ${activeTab === 'console' ? 'active' : ''}`}
              onClick={() => setActiveTab('console')}
            >
              <Terminal className="w-4 h-4" />
              <span>Console de Execução</span>
              {isRunning && <span className="tab-status-dot bg-cyan-400 animate-pulse" />}
            </div>
            
            <div 
              className={`drawer-tab tests-tab ${activeTab === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveTab('tests')}
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Testes Automatizados</span>
              {isTesting && <span className="tab-status-dot bg-emerald-400 animate-pulse" />}
              {!isTesting && testResults && (
                <span className={`tab-badge ${testResults.every(r => r.passed) ? 'passed' : 'failed'}`}>
                  {testResults.filter(r => r.passed).length}/{testResults.length}
                </span>
              )}
            </div>
          </div>

          <div className="drawer-content">
            {/* Console Output Panel */}
            {activeTab === 'console' && (
              <div className="console-panel">
                <div className="console-output">
                  {consoleLines.map((line, index) => (
                    <div 
                      key={index} 
                      className={`console-line ${
                        line.type === 'stdin' ? 'input-line' : line.type === 'stderr' ? 'error-line' : ''
                      }`}
                    >
                      {line.text}
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>

                <form onSubmit={handleConsoleInputSubmit} className="console-input-wrapper">
                  <span className="console-prompt">{inputRequired ? 'input >' : '>'}</span>
                  <input 
                    type="text"
                    ref={consoleInputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={!inputRequired}
                    placeholder={inputRequired ? `Aguardando entrada: ${inputPrompt}` : 'Console inativo. Execute o código para interagir.'}
                    className="console-input"
                  />
                </form>
              </div>
            )}

            {/* Automated Test Cases Panel */}
            {activeTab === 'tests' && (
              <div className="tests-panel">
                <div className="tests-content">
                  {testResults === null ? (
                    <div className="empty-state">
                      <Award className="w-10 h-10 opacity-30 text-emerald-400" />
                      <p>Nenhum teste executado ainda.</p>
                      <p className="text-xs text-slate-500">Escreva seu código e clique em "Testar Resolução" para validar seu algoritmo.</p>
                    </div>
                  ) : testResults.length === 0 ? (
                    <div className="empty-state">
                      <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                      <p>Preparando os casos de teste...</p>
                    </div>
                  ) : (
                    testResults.map((res, index) => (
                      <div 
                        key={index} 
                        className={`test-card ${res.passed ? 'passed' : 'failed'}`}
                      >
                        <div className={`test-card-header ${res.passed ? 'passed' : 'failed'}`}>
                          <span>Caso de Teste #{index + 1}</span>
                          <span className="flex items-center gap-1">
                            {res.passed ? (
                              <>
                                <Check className="w-4 h-4" /> Passou
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4" /> Falhou
                              </>
                            )}
                          </span>
                        </div>

                        <div className="test-details">
                          <div className="test-details-line">
                            <span className="test-details-label">Entrada:</span>
                            <span>{res.inputs.join(', ')}</span>
                          </div>
                          <div className="test-details-line">
                            <span className="test-details-label">Esperado:</span>
                            <span>{res.expected.join(' ou ')}</span>
                          </div>
                          
                          {res.error ? (
                            <div className="test-details-line text-rose-400 font-sans mt-1">
                              <span className="test-details-label">Erro:</span>
                              <span className="whitespace-pre-wrap">{res.error}</span>
                            </div>
                          ) : (
                            <div className="test-details-line">
                              <span className="test-details-label">Obtido:</span>
                              <span className={res.passed ? 'text-emerald-400' : 'text-rose-400'}>
                                {res.actual || '(sem saída impressa)'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>


    </div>
  );
}
