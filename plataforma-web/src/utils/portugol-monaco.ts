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
}
