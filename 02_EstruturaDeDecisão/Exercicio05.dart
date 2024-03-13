// Efetuar a leitura de três números inteiros "a", "b" e "c" referentes aos valores dos coeficientes da equação de segundo grau ax² + bx + c = 0 e resolver a equação.

void main() {

  double a = 1;
  double b = -3;
  double c = 2;

  double discriminante = b * b - 4 * a * c;

  if (discriminante > 0) {
    
    double x1 = (-b + (discriminante)) / (2 * a);
    double x2 = (-b - (discriminante)) / (2 * a);

    print("As raízes da equação são: $x1 e $x2");

  } 
  else if (discriminante == 0) {

    double x = -b / (2 * a);

    print("A equação tem uma raiz real: $x");

  } 
  else {

    double realPart = -b / (2 * a);
    double imaginaryPart = (-discriminante) / (2 * a);
    print("As raízes da equação são complexas: $realPart + $imaginaryPart i e $realPart - $imaginaryPart i");
    
  }

}