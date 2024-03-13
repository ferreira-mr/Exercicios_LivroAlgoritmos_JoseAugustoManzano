  // Exercício 64: Construção de Matriz com Quadrados de Elementos

  // Descrição:
  // Este exercício consiste em desenvolver um programa que leia 15 elementos inteiros e construa uma segunda matriz onde cada elemento seja o quadrado do elemento da primeira matriz na mesma posição.

  // Passo a Passo:

  // 1. Entrada de Dados:
  //    - Leia os 15 elementos inteiros.
  //    - Aguarde a entrada dos elementos.

  // 2. Inicialização:
  //    - Inicialize a segunda matriz como vazia.

  // 3. Construção da Matriz de Quadrados:
  //    - Para cada elemento da primeira matriz, calcule o quadrado e adicione à segunda matriz.

  // 4. Exibição das Matrizes:
  //    - Apresente os elementos da primeira matriz.
  //    - Apresente os elementos da segunda matriz.

  // Exemplo em Pseudocódigo:
  // ENTRADA: matriz1
  // matriz2 = []
  // PARA i DE 0 ATÉ 14 FAÇA
  //     quadrado = matriz1[i] * matriz1[i]
  //     ADICIONAR quadrado À matriz2
  // EXIBIR "Matriz original:", matriz1
  // EXIBIR "Matriz dos quadrados:", matriz2

void main() {
  List<int> matriz1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  
  List<int> matriz2 = [];

  for (int i = 0; i < 15; i++) {
    int quadrado = matriz1[i] * matriz1[i];
    matriz2.add(quadrado);
  }

  print("Matriz original: $matriz1");
  print("Matriz dos quadrados: $matriz2");
}
