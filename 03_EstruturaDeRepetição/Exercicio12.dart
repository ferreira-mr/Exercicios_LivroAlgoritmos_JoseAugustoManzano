// Elaborar um programa que leia quinze valores numéricos inteiros e no final apresente o somatório da fatorial de cada valor lido

void main() {
  List<int> valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var somatorioFatorial = 0;

  for (var valor in valores) {

    var fatorial = calcularFatorial(valor);

    somatorioFatorial += fatorial;

  }

  print("O somatório da fatorial de cada valor é: $somatorioFatorial");

}

int calcularFatorial(var n) {

  var fatorial = 1;

  for (var i = 2; i <= n; i++) {

    fatorial *= i;

  }

  return fatorial;
  
}
