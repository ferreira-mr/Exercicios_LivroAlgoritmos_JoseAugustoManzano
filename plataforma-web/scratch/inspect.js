import { LexadorPortugolStudio, AvaliadorSintaticoPortugolStudio, InterpretadorPortugolStudioComDepuracao } from '@designliquido/portugol-studio';

async function main() {
  const code = `programa {
  funcao inicio() {
    inteiro a = 10
    inteiro b = 20
    inteiro c = a + b
    escreva("c = ", c)
  }
}`;

  const lexer = new LexadorPortugolStudio();
  const parser = new AvaliadorSintaticoPortugolStudio();
  const lines = code.split('\n');
  const lexerResult = lexer.mapear(lines, -1);
  const parserResult = await parser.analisar(lexerResult, -1);

  const interpreter = new InterpretadorPortugolStudioComDepuracao(
    '.',
    (output) => console.log('OUTPUT:', output),
    (output) => console.log('OUTPUT:', output),
    () => console.log('CLEAR')
  );

  interpreter.avancarPrimeiroEscopoAposInstrucao = () => {};

  // Override paraTexto for real number formatting
  interpreter.paraTexto = function(objeto) {
    if (typeof objeto === 'number') {
      if (!Number.isInteger(objeto)) {
        return objeto.toFixed(2);
      }
    }
    return InterpretadorPortugolStudioComDepuracao.prototype.paraTexto.call(this, objeto);
  };

  let latestVariables = [];

  const originalExecutar = interpreter.executar;
  interpreter.executar = async function(declaracao, mostrarResultado) {
    const res = await originalExecutar.call(this, declaracao, mostrarResultado);
    const rawVars = this.pilhaEscoposExecucao.obterTodasVariaveis();
    const filteredVars = rawVars.filter(v => v.valor?.constructor?.name !== 'DeleguaFuncao' && v.tipo !== 'vazio');
    if (filteredVars.length > 0) {
      latestVariables = filteredVars;
      console.log(`[executar Hook] Ran Line ${declaracao.linha}. Variables:`, latestVariables.map(v => `${v.nome}: ${v.valor}`));
    }
    return res;
  };

  interpreter.pontosParada = [];
  for (let i = 1; i <= lines.length; i++) {
    interpreter.pontosParada.push({
      hashArquivo: -1,
      linha: i
    });
  }

  interpreter.avisoPontoParadaAtivado = () => {
    console.log(`\n[PAUSED] Line: ${interpreter.linhaDeclaracaoAtual}`);
  };

  interpreter.finalizacaoDaExecucao = () => {
    console.log('\n--- FINALIZACAO DA EXECUCAO ---');
    console.log('Final variables preserved:', latestVariables.map(v => `${v.nome}: ${v.valor}`));
  };

  console.log('Starting execution...');
  interpreter.prepararParaDepuracao(parserResult.declaracoes);
  await interpreter.instrucaoContinuarInterpretacao();

  let steps = 0;
  while (interpreter.pontoDeParadaAtivo && steps < 20) {
    steps++;
    console.log(`\n--- Step ${steps} ---`);
    await interpreter.instrucaoPasso();
  }

  console.log('\nExecution ended. Final variables check:', latestVariables.map(v => `${v.nome}: ${v.valor}`));
}

main().catch(console.error);
