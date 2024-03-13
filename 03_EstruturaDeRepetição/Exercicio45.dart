// Exercício 45: Somatório dos Valores Pares

// Descrição:
// Este exercício consiste em desenvolver um programa que apresente o somatório dos valores pares existentes na faixa de 1 até 500.

// Passo a Passo:

// 1. Inicialização da Soma:
//    - Inicialize uma variável "somaPares" com valor zero para armazenar o somatório dos valores pares.

// 2. Laço de Iteração:
//    - Inicie um laço de iteração que percorre os números de 2 a 500 com incremento de 2.
//    - Para cada número par, adicione-o à variável "somaPares".

// 3. Saída de Dados:
//    - Apresente o valor da variável "somaPares" como resultado do somatório dos valores pares na faixa de 1 até 500.

// Exemplo em Pseudocódigo:
// INICIALIZAR somaPares COM 0
// PARA cada número DE 2 a 500 COM PASSO 2 FAÇA
//     somaPares = somaPares + número
// EXIBIR somaPares

void main() {
  int somaPares = 0;

  for (int numero = 2; numero <= 500; numero += 2) {
    somaPares += numero;
  }

  print("O somatório dos valores pares de 1 a 500 é: $somaPares");
  
}
