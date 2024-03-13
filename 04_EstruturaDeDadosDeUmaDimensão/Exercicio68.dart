// Exercício 68: Inversão de Elementos em um Vetor

// Descrição:
// Este exercício consiste em desenvolver um programa que leia 20 elementos do tipo real em um vetor e construa uma segunda matriz de mesma dimensão com os elementos da primeira matriz armazenados, porém de forma invertida.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os 20 elementos do vetor de números reais.
//    - Aguarde a entrada dos elementos.

// 2. Inicialização:
//    - Inicialize o vetor invertido como vazio.

// 3. Construção do Vetor Invertido:
//    - Para cada elemento do vetor original, adicione-o ao vetor invertido na posição inversa.

// 4. Exibição dos Vetores:
//    - Apresente os elementos do vetor original.
//    - Apresente os elementos do vetor invertido.

// Exemplo em Pseudocódigo:
// ENTRADA: vetorOriginal
// vetorInvertido = []
// PARA i DE 19 ATÉ 0 FAÇA
//     ADICIONAR vetorOriginal[i] À vetorInvertido
// EXIBIR "Vetor original:", vetorOriginal
// EXIBIR "Vetor invertido:", vetorInvertido

void main() {
  List<double> vetorOriginal = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0,
                                11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0];
  
  List<double> vetorInvertido = [];

  for (int i = 19; i >= 0; i--) {
    vetorInvertido.add(vetorOriginal[i]);
  }

  print("Vetor original: $vetorOriginal");
  print("Vetor invertido: $vetorInvertido");
}
