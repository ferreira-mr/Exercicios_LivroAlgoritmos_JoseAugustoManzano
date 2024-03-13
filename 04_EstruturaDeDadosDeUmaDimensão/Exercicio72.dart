// Exercício 72: Divisão por Dois dos Elementos de um Vetor

// Descrição:
// Este exercício consiste em desenvolver um programa que leia um vetor com dez elementos inteiros e construa uma segunda matriz em que cada elemento seja a metade exata de cada um dos elementos existentes na primeira matriz.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os dez elementos do vetor de inteiros.
//    - Aguarde a entrada dos elementos.

// 2. Inicialização:
//    - Inicialize o segundo vetor como vazio.

// 3. Construção do Vetor com Metade dos Valores:
//    - Para cada elemento do primeiro vetor, calcule a metade e adicione ao segundo vetor.

// 4. Exibição dos Vetores:
//    - Apresente os elementos do primeiro vetor.
//    - Apresente os elementos do segundo vetor.

// Exemplo em Pseudocódigo:
// ENTRADA: vetorOriginal
// vetorMetade = []
// PARA i DE 0 ATÉ 9 FAÇA
//     ADICIONAR vetorOriginal[i] / 2 À vetorMetade
// EXIBIR "Vetor original:", vetorOriginal
// EXIBIR "Vetor com metade dos valores:", vetorMetade

void main() {
  List<int> vetorOriginal = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
  List<double> vetorMetade = [];

  for (int i = 0; i < 10; i++) {
    vetorMetade.add(vetorOriginal[i] / 2);
  }

  print("Vetor original: $vetorOriginal");
  print("Vetor com metade dos valores: $vetorMetade");
}
