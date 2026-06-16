// Exercício 73: Tabuada em um Vetor

// Descrição:
// Este exercício consiste em desenvolver um programa que calcule a tabuada de um valor qualquer de 1 até 10 e armazene os resultados em um vetor.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia o valor para o qual a tabuada será calculada.
//    - Aguarde a entrada do valor.

// 2. Inicialização:
//    - Inicialize o vetor da tabuada como vazio.

// 3. Cálculo da Tabuada:
//    - Para cada número de 1 a 10, calcule o produto com o valor fornecido e adicione ao vetor da tabuada.

// 4. Exibição da Tabuada:
//    - Apresente os elementos do vetor da tabuada.

// Exemplo em Pseudocódigo:
// ENTRADA: valor
// tabuada = []
// PARA i DE 1 ATÉ 10 FAÇA
//     ADICIONAR valor * i À tabuada
// EXIBIR "Tabuada do", valor, ":", tabuada

void main() {
  int valor = 5;
  
  List<int> tabuada = [];

  for (int i = 1; i <= 10; i++) {
    tabuada.add(valor * i);
  }

  print("Tabuada do $valor:");
  print(tabuada);
}
