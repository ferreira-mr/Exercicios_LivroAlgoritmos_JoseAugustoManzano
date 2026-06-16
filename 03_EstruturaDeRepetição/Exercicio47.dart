// Exercício 47: Valores Divisíveis por 4 Menores que 200

// Descrição:
// Este exercício consiste em desenvolver um programa que apresente todos os valores numéricos divisíveis por 4 e menores que 200.

// Passo a Passo:

// 1. Laço de Iteração:
//    - Inicie um laço de iteração que percorre os números de 4 até 196 com incremento de 4 (apenas números divisíveis por 4).
//    - Para cada número divisível por 4, exiba-o.

// Exemplo em Pseudocódigo:
// PARA cada número DE 4 a 196 COM PASSO 4 FAÇA
//     EXIBIR número

void main() {
  for (int numero = 4; numero < 200; numero += 4) {
    print(numero);
  }
}
