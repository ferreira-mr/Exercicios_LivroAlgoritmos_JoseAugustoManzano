// Exercício 71: Vetor com Valores Negativos

// Descrição:
// Este exercício consiste em desenvolver um programa que leia uma matriz A do tipo vetor com dez elementos inteiros positivos e construa um segundo vetor em que cada elemento seja o valor negativo do elemento correspondente do primeiro vetor.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os dez elementos do vetor de inteiros positivos.
//    - Aguarde a entrada dos elementos.

// 2. Inicialização:
//    - Inicialize o segundo vetor como vazio.

// 3. Construção do Vetor com Valores Negativos:
//    - Para cada elemento do primeiro vetor, calcule o valor negativo e adicione ao segundo vetor.

// 4. Exibição dos Vetores:
//    - Apresente os elementos do primeiro vetor.
//    - Apresente os elementos do segundo vetor.

// Exemplo em Pseudocódigo:
// ENTRADA: vetorOriginal
// vetorNegativo = []
// PARA i DE 0 ATÉ 9 FAÇA
//     ADICIONAR -vetorOriginal[i] À vetorNegativo
// EXIBIR "Vetor original:", vetorOriginal
// EXIBIR "Vetor com valores negativos:", vetorNegativo

void main() {
  List<int> vetorOriginal = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  
  List<int> vetorNegativo = [];

  for (int i = 0; i < 10; i++) {
    vetorNegativo.add(-vetorOriginal[i]);
  }

  print("Vetor original: $vetorOriginal");
  print("Vetor com valores negativos: $vetorNegativo");
}
