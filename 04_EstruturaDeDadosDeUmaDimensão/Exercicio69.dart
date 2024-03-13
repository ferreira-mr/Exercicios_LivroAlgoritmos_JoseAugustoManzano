// Exercício 69: Junção de Três Vetores

// Descrição:
// Este exercício consiste em desenvolver um programa que leia três vetores com cinco elementos cada que sejam do tipo inteiro e construa um quarto vetor como resultado da junção das três primeiras.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os cinco elementos do primeiro vetor de inteiros.
//    - Leia os cinco elementos do segundo vetor de inteiros.
//    - Leia os cinco elementos do terceiro vetor de inteiros.
//    - Aguarde a entrada dos elementos.

// 2. Inicialização:
//    - Inicialize o vetor resultado como vazio.

// 3. Construção do Vetor Resultado:
//    - Adicione os elementos dos três primeiros vetores ao vetor resultado.

// 4. Exibição dos Vetores:
//    - Apresente os elementos do primeiro vetor.
//    - Apresente os elementos do segundo vetor.
//    - Apresente os elementos do terceiro vetor.
//    - Apresente os elementos do vetor resultado (junção).

// Exemplo em Pseudocódigo:
// ENTRADA: vetor1, vetor2, vetor3
// vetorResultado = []
// PARA i DE 0 ATÉ 4 FAÇA
//     ADICIONAR vetor1[i] À vetorResultado
//     ADICIONAR vetor2[i] À vetorResultado
//     ADICIONAR vetor3[i] À vetorResultado
// EXIBIR "Vetor 1:", vetor1
// EXIBIR "Vetor 2:", vetor2
// EXIBIR "Vetor 3:", vetor3
// EXIBIR "Vetor resultado (junção):", vetorResultado

void main() {
  List<int> vetor1 = [1, 2, 3, 4, 5];
  List<int> vetor2 = [6, 7, 8, 9, 10];
  List<int> vetor3 = [11, 12, 13, 14, 15];
  
  List<int> vetorResultado = [];

  for (int i = 0; i < 5; i++) {
    vetorResultado.add(vetor1[i]);
    vetorResultado.add(vetor2[i]);
    vetorResultado.add(vetor3[i]);
  }

  print("Vetor 1: $vetor1");
  print("Vetor 2: $vetor2");
  print("Vetor 3: $vetor3 \n");
  print("Vetor resultado (junção): $vetorResultado");
}
