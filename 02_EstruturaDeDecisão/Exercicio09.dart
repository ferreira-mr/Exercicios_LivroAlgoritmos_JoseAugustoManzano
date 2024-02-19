// Ler cinco valores numéricos inteiros e apresentar o maior e menor.

void main() {

  int v1 = 1;
  int v2 = 2;
  int v3 = 3;
  int v4 = 4;
  int v5 = 5;

  int maior = v1;

  if (v2 > maior) {
    maior = v2;
  }

  if (v3 > maior) {
    maior = v3;
  }

  if (v4 > maior) {
    maior = v4;
  }

  if (v5 > maior) {
    maior = v5;
  }

  int menor = v1;

  if (v2 < menor) {
    menor = v2;
  }

  if (v3 < menor) {
    menor = v3;
  }

  if (v4 < menor) {
    menor = v4;
  }

  if (v5 < menor) {
    menor = v5;
  }

  print("O menor valor é: $menor");
  print("O maior valor é: $maior");

}
