import { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio, InterpretadorPortugolStudio } from '@designliquido/portugol-studio';

export interface RunOptions {
  code: string;
  inputs?: string[]; // For automated test execution
  onOutput: (text: string) => void;
  onInputRequired?: (prompt: string, onSubmit: (val: string) => void) => void;
  onClearScreen?: () => void;
}

export interface RunResult {
  success: boolean;
  errors: string[];
}

/**
 * Runs Portugol Studio code in the browser.
 * Handles Lexer, Parser, and Interpreter stages.
 */
export async function runCode(options: RunOptions): Promise<RunResult> {
  const { code, inputs = [], onOutput, onInputRequired, onClearScreen } = options;

  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();

  const lines = code.split('\n');
  const lexerResult = lexer.mapear(lines, -1);

  const errors: string[] = [];

  if (lexerResult.erros && lexerResult.erros.length > 0) {
    lexerResult.erros.forEach((err) => {
      errors.push(`Erro Léxico (linha ${err.linha}): ${err.mensagem}`);
    });
    return { success: false, errors };
  }

  try {
    const parserResult = await parser.analisar(lexerResult, -1);
    
    if (parserResult.erros && parserResult.erros.length > 0) {
      parserResult.erros.forEach((err) => {
        const line = err.simbolo?.linha || '?';
        errors.push(`Erro Sintático (linha ${line}): ${(err as any).mensagem || err.message}`);
      });
      return { success: false, errors };
    }

    if (!parserResult.declaracoes || parserResult.declaracoes.length === 0) {
      return { success: true, errors: [] };
    }

    // Set up standard output and clear screen callbacks
    const interpreter = new InterpretadorPortugolStudio(
      '.', // dummy base dir for browser
      false, // performance flag
      (saida: any) => onOutput(String(saida)),
      () => {
        if (onClearScreen) onClearScreen();
      }
    );

    let inputIndex = 0;

    // Interface for handling leia commands
    interpreter.interfaceEntradaSaida = {
      question: (prompt: string, callback: (resposta: string) => void) => {
        if (inputIndex < inputs.length) {
          // Automate input (Test mode)
          const val = inputs[inputIndex++];
          callback(val);
        } else if (onInputRequired) {
          // Interactive input (Interactive mode)
          onInputRequired(prompt, (val) => {
            callback(val);
          });
        } else {
          // Fallback if no handler is registered
          callback('');
        }
      }
    };

    const interpreterResult = await interpreter.interpretar(parserResult.declaracoes, true);

    if (interpreterResult.erros && interpreterResult.erros.length > 0) {
      interpreterResult.erros.forEach((err: any) => {
        const line = err.linha || '?';
        const msg = err.mensagem || String(err);
        errors.push(`Erro de Execução (linha ${line}): ${msg}`);
      });
      return { success: false, errors };
    }

    return { success: true, errors: [] };
  } catch (err: any) {
    console.error('Error executing Portugol Studio code:', err);
    return { success: false, errors: [String(err.message || err)] };
  }
}

/**
 * Runs JavaScript code in the browser asynchronously.
 * Custom implementation for E/S with write and read support.
 */
export async function runJSCode(options: RunOptions): Promise<RunResult> {
  const { code, inputs = [], onOutput, onInputRequired, onClearScreen } = options;
  
  if (onClearScreen) {
    onClearScreen();
  }

  let inputIndex = 0;
  const errors: string[] = [];

  // Expose write/writeln and read
  const write = (...args: any[]) => {
    onOutput(args.map(a => String(a)).join(' '));
  };
  
  const writeln = (...args: any[]) => {
    onOutput(args.map(a => String(a)).join(' ') + '\n');
  };

  const read = (promptText?: string) => {
    return new Promise<string>((resolve) => {
      if (inputIndex < inputs.length) {
        resolve(inputs[inputIndex++]);
      } else if (onInputRequired) {
        onInputRequired(promptText || 'Digite um valor:', (val) => {
          resolve(val);
        });
      } else {
        resolve('');
      }
    });
  };

  try {
    // Encapsulate user code in an async context, passing write, writeln and read as parameters
    const asyncFn = new Function('write', 'writeln', 'read', `
      return (async () => {
        ${code}
      })();
    `);

    await asyncFn(write, writeln, read);
    return { success: true, errors: [] };
  } catch (err: any) {
    console.error('Error executing JS code:', err);
    const errMsg = err.message || String(err);
    errors.push(`Erro de Execução JS: ${errMsg}`);
    return { success: false, errors };
  }
}

