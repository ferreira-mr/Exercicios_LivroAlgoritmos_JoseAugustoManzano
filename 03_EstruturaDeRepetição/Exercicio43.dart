// Exercício 43: Tabuada de um Número

// Descrição:
// Este exercício consiste em desenvolver um programa que mostre os resultados da tabuada de um número qualquer.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Solicite ao usuário que insira o número para o qual a tabuada será gerada.
//    - Aguarde a entrada do usuário.

// 2. Inicialização:
//    - Inicialize o multiplicador como 1.

// 3. Enquanto o multiplicador for menor ou igual a 10:
//    - Calcule o produto do número fornecido pelo multiplicador.
//    - Apresente o resultado da multiplicação na forma "número x multiplicador = produto".
//    - Incremente o multiplicador.

// Exemplo em Pseudocódigo:
// ENTRADA: número
// multiplicador = 1
// ENQUANTO multiplicador <= 10 FAÇA
//     produto = número * multiplicador
//     EXIBIR número + " x " + multiplicador + " = " + produto
//     multiplicador = multiplicador + 1


void main() {
  int numero = 3;

  int multiplicador = 1;

  while (multiplicador <= 10) {
    int produto = numero * multiplicador;
    print("$numero x $multiplicador = $produto");
    multiplicador++;
  }
  
}
