// Exercício 67: Junção de Dois Vetores de Nomes

// Descrição:
// Este exercício consiste em desenvolver um programa que leia dois vetores para armazenar nomes de pessoas, sendo o primeiro com 20 elementos e o segundo com 30 elementos. Em seguida, deve-se construir um terceiro vetor com a junção dos dois primeiros.

// Passo a Passo:

// 1. Entrada de Dados:
//    - Leia os 20 elementos do primeiro vetor de nomes.
//    - Leia os 30 elementos do segundo vetor de nomes.
//    - Aguarde a entrada dos nomes.

// 2. Inicialização:
//    - Inicialize o terceiro vetor como vazio.

// 3. Construção do Terceiro Vetor:
//    - Adicione os nomes do primeiro vetor ao terceiro vetor.
//    - Adicione os nomes do segundo vetor ao terceiro vetor.

// 4. Exibição dos Vetores:
//    - Apresente os nomes do primeiro vetor.
//    - Apresente os nomes do segundo vetor.
//    - Apresente os nomes do terceiro vetor (junção).

// Exemplo em Pseudocódigo:
// ENTRADA: vetorNomes1, vetorNomes2
// vetorNomes3 = []
// PARA i DE 0 ATÉ 19 FAÇA
//     ADICIONAR vetorNomes1[i] À vetorNomes3
// PARA i DE 0 ATÉ 29 FAÇA
//     ADIC

  void main() {
  List<String> vetorNomes1 = ["Ana", "Carlos", "Maria", "João", "Pedro", "Laura", "Bruno", "Julia", "Lucas", "Fernanda", 
                              "Rafael", "Beatriz", "Gustavo", "Camila", "Rodrigo", "Mariana", "Diego", "Isabela", "Eduardo", "Vitória"];

  List<String> vetorNomes2 = ["Sophia", "Enzo", "Alice", "Miguel", "Lara", "Felipe", "Luiza", "Guilherme", "Livia", "Arthur",
                              "Yasmin", "Samuel", "Gabriela", "Lucas", "Isabella", "Matheus", "Leticia", "Leonardo", "Ana Clara", "João Pedro", 
                              "Helena", "Pedro Henrique", "Valentina", "Davi", "Manuela", "Heitor", "Isadora", "Benjamin", "Laís", "Gabriel"];
  
  List<String> vetorNomes3 = [];

  vetorNomes3.addAll(vetorNomes1);
  vetorNomes3.addAll(vetorNomes2);

  print("Vetor de Nomes 1: $vetorNomes1 \n");
  print("Vetor de Nomes 2: $vetorNomes2 \n");
  print("Vetor de Nomes 3 (junção): $vetorNomes3");
}
