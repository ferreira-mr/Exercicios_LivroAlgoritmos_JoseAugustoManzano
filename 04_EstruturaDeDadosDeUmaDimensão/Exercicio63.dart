// Exercício 63: Subtração de Elementos de Matrizes

// Descrição:
// Este exercício consiste em desenvolver um programa que leia duas matrizes com 20 elementos reais e construa uma terceira matriz onde cada elemento deve ser a subtração do elemento de mesma posição das duas primeiras matrizes.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os 20 elementos da primeira matriz.
//    - Leia os 20 elementos da segunda matriz.
//    - Aguarde a entrada dos elementos.

// 2. Inicialização:
//    - Inicialize a terceira matriz como vazia.

// 3. Loop de Subtração:
//    - Para cada posição i, de 0 a 19, da primeira e segunda matriz:
//      - Subtraia o elemento da posição i da segunda matriz do elemento da posição i da primeira matriz.
//      - Adicione o resultado à terceira matriz.

// 4. Exibição da Matriz Resultante:
//    - Apresente os elementos da terceira matriz.

// Exemplo em Pseudocódigo:
// ENTRADA: matriz1, matriz2
// matriz3 = []
// PARA i DE 0 ATÉ 19 FAÇA
//     elemento = matriz1[i] - matriz2[i]
//     ADICIONAR elemento À matriz3
// EXIBIR matriz3

void main() {
  List<double> matriz1 = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 
                          11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0];
                          
  List<double> matriz2 = [20.0, 19.0, 18.0, 17.0, 16.0, 15.0, 14.0, 13.0, 12.0, 11.0, 
                          10.0, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0];
  
  List<double> matriz3 = [];

  for (int i = 0; i < 20; i++) {
    double resultado = matriz1[i] - matriz2[i];
    matriz3.add(resultado);
  }

  // Passo 4: Exibição da Matriz Resultante
  print("Matriz Resultante:");
  print(matriz3);
}
