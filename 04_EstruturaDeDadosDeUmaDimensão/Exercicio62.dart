// Exercício 62: Multiplicação de Elementos de uma Matriz por 3

// Descrição:
// Este exercício consiste em desenvolver um programa que leia oito elementos inteiros e construa uma segunda matriz com os elementos da primeira matriz multiplicados por 3.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os oito elementos inteiros da matriz.
//    - Aguarde a entrada dos elementos.

// 2. Construção da Segunda Matriz:
//    - Para cada elemento da primeira matriz, multiplique por 3 e adicione à segunda matriz.

// 3. Exibição das Matrizes:
//    - Apresente os elementos da primeira matriz.
//    - Apresente os elementos da segunda matriz.

// Exemplo em Pseudocódigo:
// MATRIZ_1 = {1, 2, 3, 4, 5, 6, 7, 8}
// MATRIZ_2 = {}
// PARA CADA ELEMENTO EM MATRIZ_1 FAÇA
//     ADICIONAR (ELEMENTO * 3) A MATRIZ_2
// EXIBIR "Matriz original: " + MATRIZ_1
// EXIBIR "Matriz multiplicada por 3: " + MATRIZ_2

void main() {
  List<int> matriz1 = [1, 2, 3, 4, 5, 6, 7, 8];

  List<int> matriz2 = [];
  for (int elemento in matriz1) {
    matriz2.add(elemento * 3);
  }

  print("Matriz original: $matriz1");
  print("Matriz multiplicada por 3: $matriz2");
}
