const { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio, InterpretadorPortugolStudio } = require('@designliquido/portugol-studio');

const code = `
programa
{
  funcao inicio()
  {
    inteiro numero = 5
    inteiro sucessor = numero + 1
    inteiro antecessor = numero - 1
    escreva("Sucessor: ", sucessor, "\\n")
    escreva("Antecessor: ", antecessor)
  }
}
`;

const lexer = new LexadorPortugolStudio();
const parser = new AvaliadorSintaticoPortugolStudio();

const lines = code.split('\n');
const lexerResult = lexer.mapear(lines, -1);

async function run() {
  const parserResult = await parser.analisar(lexerResult, -1);
  const interpreter = new InterpretadorPortugolStudio(
    '.',
    false,
    (saida) => {
      console.log('OUTPUT CALLBACK RECEIVED:', JSON.stringify(saida));
    },
    () => {}
  );
  await interpreter.interpretar(parserResult.declaracoes, true);
}

run().catch(console.error);
