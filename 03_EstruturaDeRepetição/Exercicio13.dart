// Elaborar um programa que leia dez valores numéricos reais e apresente no final o somatório e a média dos valores lidos.

void main() {

  List<double> valores = [17.5, 15.4, 7.9, 8.2, 2.1, 1.8, 11.7, 4.9, 9.3, 1.2];

  double somatorio = 0;

  for (var valor in valores) {

    somatorio += valor;

  }

  var media = somatorio / valores.length;

  print("O somatório dos valores é: $somatorio");
  print("A média dos valores é: $media");

}
