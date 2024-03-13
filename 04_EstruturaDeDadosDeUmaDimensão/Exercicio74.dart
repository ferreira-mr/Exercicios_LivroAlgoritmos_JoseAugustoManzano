// Exercício 74: Análise de Temperaturas em Graus Celsius

// Descrição:
// Este exercício consiste em desenvolver um programa que leia 20 elementos (valores reais) para temperaturas em graus Celsius e armazene esses valores em um vetor. O programa ao final deve apresentar a menor, a maior e a média das temperaturas.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia as 20 temperaturas em graus Celsius.
//    - Aguarde a entrada dos valores.

// 2. Inicialização:
//    - Inicialize as variáveis para a menor temperatura, a maior temperatura e a soma das temperaturas.

// 3. Cálculo das Estatísticas:
//    - Para cada temperatura, atualize a menor e a maior temperatura, e adicione o valor à soma das temperaturas.

// 4. Exibição dos Resultados:
//    - Apresente a menor temperatura, a maior temperatura e a média das temperaturas.

// Exemplo em Pseudocódigo:
// ENTRADA: vetorTemperaturas
// menorTemperatura = INFINITO
// maiorTemperatura = -INFINITO
// somaTemperaturas = 0
// PARA i DE 0 ATÉ 19 FAÇA
//     SE vetorTemperaturas[i] < menorTemperatura ENTÃO
//         menorTemperatura = vetorTemperaturas[i]
//     SE vetorTemperaturas[i] > maiorTemperatura ENTÃO
//         maiorTemperatura = vetorTemperaturas[i]
//     somaTemperaturas = somaTemperaturas + vetorTemperaturas[i]
// mediaTemperaturas = somaTemperaturas / 20
// EXIBIR "Menor temperatura:", menorTemperatura
// EXIBIR "Maior temperatura:", maiorTemperatura
// EXIBIR "Média das temperaturas:", mediaTemperaturas

void main() {
  List<double> vetorTemperaturas = [20.5, 23.4, 22.1, 25.8, 19.3, 21.7, 18.9, 24.6, 20.0, 22.5, 26.2, 23.9, 21.0, 25.0, 24.3, 19.8, 20.7, 22.9, 24.8, 23.0];
  
  double menorTemperatura = double.infinity;
  double maiorTemperatura = -double.infinity;
  double somaTemperaturas = 0;

  for (int i = 0; i < vetorTemperaturas.length; i++) {
    double temperatura = vetorTemperaturas[i];
    if (temperatura < menorTemperatura) {
      menorTemperatura = temperatura;
    }
    if (temperatura > maiorTemperatura) {
      maiorTemperatura = temperatura;
    }
    somaTemperaturas += temperatura;
  }
  
  double mediaTemperaturas = somaTemperaturas / vetorTemperaturas.length;

  print("Menor temperatura: $menorTemperatura");
  print("Maior temperatura: $maiorTemperatura");
  print("Média das temperaturas: $mediaTemperaturas");
}
