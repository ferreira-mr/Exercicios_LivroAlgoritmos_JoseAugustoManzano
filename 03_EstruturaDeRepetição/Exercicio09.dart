// Escrever um programa que apresente os valores da sequência numérica de Fibonacci até o décimo quinto termo.

void main() {

  var termo1 = 0;
  var termo2 = 1;
 
  for (var i = 3; i <= 15; i++) {

    var proximoTermo = termo1 + termo2;

    print(proximoTermo);
    
    termo1 = termo2;
    termo2 = proximoTermo;

  }
}