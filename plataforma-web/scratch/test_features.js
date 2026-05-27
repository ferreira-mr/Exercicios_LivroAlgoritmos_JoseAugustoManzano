import { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio, InterpretadorPortugolStudio } from '@designliquido/portugol-studio';

async function test() {
  const code = `
programa {
  inclua biblioteca Calendario --> cal
  funcao inicio() {
    inteiro vetor[3] = {10, 20, 30}
    inteiro matriz[2][2] = {{1, 2}, {3, 4}}
    escreva("Vetor pos 1: ", vetor[1], "\\n")
    escreva("Matriz pos 1,0: ", matriz[1][0], "\\n")
    escreva("Hora atual: ", cal.hora_atual(falso), "\\n")
  }
}
`;

  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();

  const lines = code.split('\n');
  const lexerResult = lexer.mapear(lines, -1);
  const parserResult = await parser.analisar(lexerResult, -1);

  const interpreter = new InterpretadorPortugolStudio(
    '.',
    false,
    (saida) => {},
    () => {}
  );

  let step = 0;
  const originalExecutar = interpreter.executar;
  interpreter.executar = async function(declaracao, mostrarResultado) {
    const res = await originalExecutar.call(this, declaracao, mostrarResultado);
    step++;
    if (step === 4) {
      const rawVars = this.pilhaEscoposExecucao.obterTodasVariaveis();
      console.log('=== Step 4 Variables ===');
      rawVars.forEach(v => {
        if (v.nome === 'vetor' || v.nome === 'matriz') {
          console.log(`Variable: ${v.nome} (${v.tipo})`);
          console.log(`  Raw Value:`, v.valor);
          console.log(`  Constructor:`, v.valor?.constructor?.name);
          console.log(`  JSON Value:`, JSON.stringify(v.valor, null, 2));
        }
      });
    }
    return res;
  };

  try {
    const result = await interpreter.interpretar(parserResult.declaracoes, true);
  } catch (err) {
    console.error('Error during interpretation:', err);
  }
}

test();
