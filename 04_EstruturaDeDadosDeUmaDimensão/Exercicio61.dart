// Exercício 61: Leitura e Apresentação de Nomes

// Descrição:
// Este exercício consiste em desenvolver um programa que leia dez nomes e os apresente em seguida.

// Passo a Passo:

// 1. Inicialização:
//    - Inicialize um contador como 1 e uma lista vazia para armazenar os nomes.

// 2. Enquanto o contador for menor ou igual a 10:
//    - Solicite ao usuário que insira um nome.
//    - Adicione o nome à lista de nomes.
//    - Incremente o contador.

// 3. Apresentação dos Nomes:
//    - Apresente os nomes lidos na forma "Nomes lidos: nome1, nome2, ..., nome10".

// Exemplo em Pseudocódigo:
// contador = 1
// nomes = []
// ENQUANTO contador <= 10 FAÇA
//     SOLICITAR nome
//     ADICIONAR nome À nomes
//     contador = contador + 1
// EXIBIR "Nomes lidos: " + juntar(nomes, ", ")

void main() {
  List<String> nomes = ["", "", "", "", "", "", "", "", "", ""];

  nomes[0] = "João";
  nomes[1] = "Maria";
  nomes[2] = "Pedro";
  nomes[3] = "Ana";
  nomes[4] = "Carlos";
  nomes[5] = "Mariana";
  nomes[6] = "José";
  nomes[7] = "Paula";
  nomes[8] = "Luiz";
  nomes[9] = "Fernanda";

  print("Nomes lidos: ${nomes.join(', ')}");
}
