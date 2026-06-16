// Exercício 44: Soma dos Cem Primeiros Números Naturais

// Descrição:
// Este exercício consiste em desenvolver um programa que apresente a soma dos cem primeiros números naturais.

// Passo a Passo:

// 1. Inicialização da Soma:
//    - Inicialize uma variável "soma" com valor zero para armazenar a soma dos números.

// 2. Laço de Iteração:
//    - Inicie um laço de iteração que percorre os números de 1 a 100.
//    - Para cada número, adicione-o à variável "soma".

// 3. Saída de Dados:
//    - Apresente o valor da variável "soma" como resultado da soma dos cem primeiros números naturais.

// Exemplo em Pseudocódigo:
// INICIALIZAR soma COM 0
// contador = 1
// ENQUANTO contador <= 100 FAÇA
//     soma = soma + contador
//     contador = contador + 1
// EXIBIR soma

void main() {
  int soma = 0;

  for (int contador = 1; contador <= 100; contador++) {
    soma += contador;
  }

  print("A soma dos cem primeiros números naturais é: $soma");
}
