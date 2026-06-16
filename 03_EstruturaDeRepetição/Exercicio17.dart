// Elaborar um programa leia valores positivos inteiros até que um valor negativo seja informado. Ao final devem ser apresentados o maior e o menor valores informados pelo usuário.

void main() {

  List<int> valores = [18, 9, 14, 3, 27];
  int? maiorValor;
  int? menorValor;

  for (int valor in valores) {

    if (valor < 0) {

      break;

    }

    if (maiorValor == null || valor > maiorValor) {

      maiorValor = valor;

    }

    if (menorValor == null || valor < menorValor) {

      menorValor = valor;

    }

  }

  if (maiorValor != null && menorValor != null) {

    print("O maior valor informado foi: $maiorValor");
    print("O menor valor informado foi: $menorValor");

  } 
  else {

    print("Nenhum valor positivo foi informado.");

  }

}
