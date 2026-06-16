// Elaborar um programa que leia sucessivamente valores numéricos e apresente no final o somatório, a média e o total de velores lidos. O programa deve ler os valores enquanto o usuário estiver fornecendo valores positivos.

void main() {
  
  List<double> valores = [1, 2, 14, 3];
  double somatorio = 0;
  int totalValores = 0;

  for (double valor in valores) {

    if (valor < 0) {

      break;

    }

    somatorio += valor;
    totalValores++;

  }

  double media = totalValores > 0 ? somatorio / totalValores : 0;

  print("O somatório dos valores é: $somatorio");
  print("A média dos valores é: $media");
  print("O total de valores lidos é: $totalValores");

}