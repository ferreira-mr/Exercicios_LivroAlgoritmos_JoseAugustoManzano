// Construir um programa que apresente coom resultado a fatorial dos valores ímpares entre 1 e 100.

void main() {

  var fatorial = 1;

  for (var i = 1; i <= 100; i += 2) {

    fatorial *= i;

  }

  print("O fatorial dos valores ímpares entre 1 e 100 é: $fatorial");
  
}