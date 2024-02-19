// Elaborar um programa que apresente os valores de conversão de graus Celsius em graus Fahrenheit, de dez em dez graus, iniciando a contagem em 10 graus Celsius e finalizando em cem graus Celsius.

void main() {

  for (int c = 10; c <= 100; c += 10) {

    double f = (c * 9 / 5) + 32;

    print("$c C° = $f F°");

  }
  
}