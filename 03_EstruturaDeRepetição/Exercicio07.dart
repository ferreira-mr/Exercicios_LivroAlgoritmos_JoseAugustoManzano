// Elaborar um programa que apresente os resultados das potências do valor de base 3, elevado a um espoente de 0 a 15.

void main() {

  var base = 3;
 
  for (var expoente = 0; expoente <= 15; expoente++) {

    var resultado = 1;

    for (var i = 0; i < expoente; i++) {

      resultado *= base;
      
    }

    print("$base^$expoente = $resultado");

  }

}