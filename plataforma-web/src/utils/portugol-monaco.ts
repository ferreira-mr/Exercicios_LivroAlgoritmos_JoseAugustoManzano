import type { Monaco } from '@monaco-editor/react';

export function registerPortugolLanguage(monaco: Monaco) {
  const languageId = 'portugol';

  // Check if language already registered to avoid duplication
  const languages = monaco.languages.getLanguages();
  if (languages.some((lang: any) => lang.id === languageId)) {
    return;
  }

  // Register the language
  monaco.languages.register({ id: languageId });

  // Define Monarch tokens for Portugol Studio syntax
  monaco.languages.setMonarchTokensProvider(languageId, {
    defaultToken: 'invalid',
    
    keywords: [
      'programa', 'funcao', 'se', 'senao', 'escolha', 'caso', 'contrario',
      'enquanto', 'faca', 'para', 'pare', 'retorne', 'const', 'biblioteca',
      'inclua', 'limpa', 'escreva', 'leia', 'verdadeiro', 'falso'
    ],

    typeKeywords: [
      'inteiro', 'real', 'caracter', 'cadeia', 'logico', 'vazio'
    ],

    operators: [
      '=', '==', '!=', '<', '>', '<=', '>=',
      '+', '-', '*', '/', '%', '++', '--',
      'e', 'ou', 'nao'
    ],

    // Common symbols
    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    // The main tokenizer definition
    tokenizer: {
      root: [
        // Identifiers and keywords
        [/[a-zA-Z_a-áâãéêíóôõúçüA-ÁÂÃÉÊÍÓÔÕÚÇÜ][a-zA-Z0-9_a-áâãéêíóôõúçüA-ÁÂÃÉÊÍÓÔÕÚÇÜ]*/, {
          cases: {
            '@keywords': 'keyword',
            '@typeKeywords': 'type',
            '@default': 'identifier'
          }
        }],

        // Whitespace
        { include: '@whitespace' },

        // Delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>=\-*/+%,;]/, 'operator'],

        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/\d+/, 'number'],

        // Strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-terminated string
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
        [/'([^'\\]|\\.)*$/, 'string.invalid'],
        [/'/, { token: 'string.quote', bracket: '@open', next: '@char' }]
      ],

      string: [
        [/[^\\"]+/, 'string'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
      ],

      char: [
        [/[^\\']+/, 'string'],
        [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
      ],

      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment']
      ],

      comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
      ]
    }
  });

  // Configure editor language options
  monaco.languages.setLanguageConfiguration(languageId, {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['(', ')'],
      ['[', ']']
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: '\'', close: '\'' }
    ]
  });

  // Register autocomplete/suggestions
  monaco.languages.registerCompletionItemProvider(languageId, {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const keywords = [
        'programa', 'funcao', 'se', 'senao', 'escolha', 'caso', 'contrario',
        'enquanto', 'faca', 'para', 'pare', 'retorne', 'const', 'biblioteca',
        'inclua', 'limpa', 'escreva', 'leia', 'verdadeiro', 'falso'
      ];
      const types = ['inteiro', 'real', 'caracter', 'cadeia', 'logico', 'vazio'];
      
      const suggestions: any[] = [];

      // Add keywords
      keywords.forEach(kw => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range
        });
      });

      // Add types
      types.forEach(t => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t,
          range
        });
      });

      // Add user-declared variables
      const code = model.getValue();
      const variables = getVariablesFromCode(code);
      variables.forEach(v => {
        suggestions.push({
          label: v,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: v,
          range
        });
      });

      // Add Calendario methods and constants
      const calendarioSuggestions = [
        { label: 'Calendario', kind: monaco.languages.CompletionItemKind.Module, insertText: 'Calendario' },
        { label: 'cal.dia_mes_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.dia_mes_atual()', detail: 'Retorna o dia do mês atual (1 a 31)' },
        { label: 'cal.dia_semana_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.dia_semana_atual()', detail: 'Retorna o dia da semana atual (1 a 7)' },
        { label: 'cal.mes_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.mes_atual()', detail: 'Retorna o mês atual (1 a 12)' },
        { label: 'cal.ano_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.ano_atual()', detail: 'Retorna o ano atual com 4 dígitos' },
        { label: 'cal.hora_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.hora_atual(falso)', detail: 'Retorna a hora atual (0 a 23)' },
        { label: 'cal.minuto_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.minuto_atual()', detail: 'Retorna o minuto atual (0 a 59)' },
        { label: 'cal.segundo_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.segundo_atual()', detail: 'Retorna o segundo atual (0 a 59)' },
        { label: 'cal.milisegundo_atual', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.milisegundo_atual()', detail: 'Retorna o milissegundo atual (0 a 999)' },
        { label: 'cal.dia_semana_completo', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.dia_semana_completo()', detail: 'Retorna o nome completo do dia da semana' },
        { label: 'cal.dia_semana_curto', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.dia_semana_curto()', detail: 'Retorna a abreviação do dia da semana (ex: Seg)' },
        { label: 'cal.dia_semana_abreviado', kind: monaco.languages.CompletionItemKind.Function, insertText: 'cal.dia_semana_abreviado()', detail: 'Retorna a abreviação supercurta (ex: S)' },
        { label: 'cal.DIA_DOMINGO', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_DOMINGO' },
        { label: 'cal.DIA_SEGUNDA_FEIRA', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_SEGUNDA_FEIRA' },
        { label: 'cal.DIA_TERCA_FEIRA', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_TERCA_FEIRA' },
        { label: 'cal.DIA_QUARTA_FEIRA', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_QUARTA_FEIRA' },
        { label: 'cal.DIA_QUINTA_FEIRA', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_QUINTA_FEIRA' },
        { label: 'cal.DIA_SEXTA_FEIRA', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_SEXTA_FEIRA' },
        { label: 'cal.DIA_SABADO', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.DIA_SABADO' },
        { label: 'cal.MES_JANEIRO', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.MES_JANEIRO' },
        { label: 'cal.MES_DEZEMBRO', kind: monaco.languages.CompletionItemKind.Constant, insertText: 'cal.MES_DEZEMBRO' }
      ];

      calendarioSuggestions.forEach(sug => {
        suggestions.push({
          ...sug,
          range
        });
      });

      return { suggestions };
    }
  });
}

/**
 * Extracts declared variables from Portugol code.
 */
export function getVariablesFromCode(code: string): string[] {
  const variables: string[] = [];
  const lines = code.split('\n');
  const reserved = new Set([
    'programa', 'funcao', 'se', 'senao', 'escolha', 'caso', 'contrario',
    'enquanto', 'faca', 'para', 'pare', 'retorne', 'const', 'biblioteca',
    'inclua', 'limpa', 'escreva', 'leia', 'verdadeiro', 'falso',
    'inteiro', 'real', 'caracter', 'cadeia', 'logico', 'vazio', 'inicio'
  ]);

  const typeRegex = /(?:^|[\s(;{,])(?:const\s+)?(inteiro|real|caracter|cadeia|logico)(?:\s+)/gi;

  for (let line of lines) {
    // Strip comments
    const commentIdx = line.indexOf('//');
    if (commentIdx !== -1) {
      line = line.substring(0, commentIdx);
    }

    let match;
    typeRegex.lastIndex = 0;
    const matches: { type: string, index: number, end: number }[] = [];
    
    while ((match = typeRegex.exec(line)) !== null) {
      matches.push({
        type: match[1],
        index: match.index,
        end: typeRegex.lastIndex
      });
    }

    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].end;
      const end = (i + 1 < matches.length) ? matches[i + 1].index : line.length;
      let part = line.substring(start, end);
      
      const semiIdx = part.search(/[;)]/);
      if (semiIdx !== -1) {
        part = part.substring(0, semiIdx);
      }

      const tokens = part.split(',');
      for (const token of tokens) {
        const trimmed = token.trim();
        const idMatch = trimmed.match(/^([a-zA-Z_a-áâãéêíóôõúçüA-ÁÂÃÉÊÍÓÔÕÚÇÜ][a-zA-Z0-9_a-áâãéêíóôõúçüA-ÁÂÃÉÊÍÓÔÕÚÇÜ]*)/);
        if (idMatch) {
          const name = idMatch[1];
          if (!reserved.has(name.toLowerCase())) {
            variables.push(name);
          }
        }
      }
    }
  }
  return Array.from(new Set(variables));
}
