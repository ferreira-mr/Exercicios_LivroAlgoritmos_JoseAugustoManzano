// Exercício 42: Quadrados na Faixa de Valores

// Descrição:
// Este exercício consiste em desenvolver um programa que apresente como resultado os quadrados dos números inteiros existentes na faixa de valores de 15 a 200.

// Passo a Passo:

// 1. Inicialização:
//    - Inicialize uma variável para armazenar o resultado dos quadrados.

// 2. Laço de Iteração:
//    - Inicie um laço de iteração que percorre os números inteiros de 15 a 200.
//    - Para cada número inteiro na faixa especificada, calcule o seu quadrado e armazene o resultado.

// 3. Saída de Dados:
//    - Apresente os quadrados dos números inteiros na faixa de valores de 15 a 200.

// Exemplo em Pseudocódigo:
// INICIALIZAÇÃO: resultado_quadrados = ""
// PARA cada número de 15 a 200 FAÇA
//     quadrado = número * número
//     resultado_quadrados += quadrado + ", "
// EXIBIR resultado_quadrados

void main() {
  String resultado_quadrados = ""; 

  for (int numero = 15; numero <= 200; numero++) {
    int quadrado = numero * numero; 
    resultado_quadrados += "$quadrado, "; 
  }

  print("Quadrados dos números de 15 a 200:");
  print(resultado_quadrados); 
}

