// Exercício 70: Somatório dos Valores até o Elemento Correspondente

// Descrição:
// Este exercício consiste em desenvolver um programa que leia um vetor com vinte elementos inteiros e construa um segundo vetor de mesmo tipo e dimensão onde cada elemento da segunda matriz é o somatório de 1 até o valor do elemento correspondente armazenado na primeira matriz.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os vinte elementos do vetor de inteiros.
//    - Aguarde a entrada dos elementos.

// 2. Inicialização:
//    - Inicialize o segundo vetor como vazio.

// 3. Construção do Vetor com Somatório:
//    - Para cada elemento do primeiro vetor, calcule o somatório de 1 até o valor do elemento e adicione ao segundo vetor.

// 4. Exibição dos Vetores:
//    - Apresente os elementos do primeiro vetor.
//    - Apresente os elementos do segundo vetor.

// Exemplo em Pseudocódigo:
// ENTRADA: vetorOriginal
// vetorSomatorio = []
// PARA i DE 0 ATÉ 19 FAÇA
//     somatorio = 0
//     PARA j DE 1 ATÉ vetorOriginal[i] FAÇA
//         somatorio = somatorio + j
//     ADICIONAR somatorio À vetorSomatorio
// EXIBIR "Vetor original:", vetorOriginal
// EXIBIR "Vetor com somatório:", vetorSomatorio

void main() {
  List<int> vetorOriginal = [3, 5, 7, 10, 2, 6, 4, 9, 8, 1, 
                              11, 15, 14, 12, 18, 20, 17, 16, 13, 19];
  
  List<int> vetorSomatorio = [];

  for (int i = 0; i < 20; i++) {
    int somatorio = 0;
    for (int j = 1; j <= vetorOriginal[i]; j++) {
      somatorio += j;
    }
    vetorSomatorio.add(somatorio);
  }

  print("Vetor original: $vetorOriginal");
  print("Vetor com somatório: $vetorSomatorio");
}
