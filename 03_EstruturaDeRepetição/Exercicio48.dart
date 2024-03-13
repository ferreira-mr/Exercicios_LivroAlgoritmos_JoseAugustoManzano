// Exercício 48: Potências de 3

// Descrição:
// Este programa apresenta os resultados das potências do valor de base 3, elevado a um expoente de 0 a 15.

// Passo a Passo:

// 1. Inicialização do Contador de Expoentes:
//    - Inicialize o contador de expoentes "expoente" com 0.

// 2. Laço de Iteração com Condição de Parada:
//    - Enquanto o contador de expoentes "expoente" for menor ou igual a 15, faça:
//        - Calcule o valor da potência de 3 elevado ao expoente e exiba-o.
//        - Incremente o contador de expoentes "expoente" em 1.

// Exemplo em Pseudocódigo:
// expoente = 0
// ENQUANTO expoente <= 15 FAÇA
//     potencia = 3 elevado a expoente
//     EXIBIR "3^" + expoente + " = " + potencia
//     expoente = expoente + 1

void main() {
  int expoente = 0;

  while (expoente <= 15) {
    int potencia = calcularPotencia(3, expoente);
    print("3^$expoente = $potencia");
    expoente++;
  }
}

int calcularPotencia(int base, int expoente) {
  int resultado = 1;
  for (int i = 0; i < expoente; i++) {
    resultado *= base;
  }
  return resultado;
}



