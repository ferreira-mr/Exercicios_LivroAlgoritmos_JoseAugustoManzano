// Exercício 46: Números Ímpares na Faixa de Valores

// Descrição:
// Este programa consiste em apresentar todos os valores numéricos inteiros ímpares situados na faixa de 0 a 200.

// Passo a Passo:

// 1. Inicialização:
//    - Inicialize uma variável "numero" com valor 1.

// 2. Laço de Iteração:
//    - Enquanto "numero" for menor ou igual a 199, faça:
//        - Exiba o valor de "numero".
//        - Incremente o valor de "numero" em 2.

// Exemplo em Pseudocódigo:
// INICIALIZAR numero COM 1
// ENQUANTO numero <= 199 FAÇA
//     EXIBIR numero
//     número = número + 2

void main() {
  int numero = 1;

  while (numero <= 199) {
    print(numero);
    numero += 2;
  }
}
