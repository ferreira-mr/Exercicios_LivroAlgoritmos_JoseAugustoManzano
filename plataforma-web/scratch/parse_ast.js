const { LexadorVisuAlg, AvaliadorSintaticoVisuAlg } = require('@designliquido/visualg');

const code = `algoritmo "Teste"
var
  x: inteiro
inicio
  leia(x)
  se x > 10 entao
    escreva("Maior")
  senao
    escreva("Menor")
  fimse
fimalgoritmo`;

const lexer = new LexadorVisuAlg();
const parser = new AvaliadorSintaticoVisuAlg();
const lex = lexer.mapear(code.split('\n'), -1);
const parsed = parser.analisar(lex.simbolos, -1);

console.log(JSON.stringify(parsed.declaracoes, null, 2));
