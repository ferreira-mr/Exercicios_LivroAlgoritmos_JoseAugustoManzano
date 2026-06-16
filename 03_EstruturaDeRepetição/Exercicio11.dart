// Escrever um programa que calcule e apresente o somatório do número de grãos de trigo que se pode obter em um tabuleiro de xadrez, obdecendo à seguinte regra: colocar um grão de trigo sobre o primeiro quadro, e nos quadros seguintes, o dobro do quadro anterior.

void main() {

  int quadrados = 64;
  int totalGraos = 1;
 
  for (int i = 2; i <= quadrados; i++) {

    totalGraos += totalGraos;

  }

  print("O total de grãos em um tabuleiro de xadrez é: $totalGraos");
  
}