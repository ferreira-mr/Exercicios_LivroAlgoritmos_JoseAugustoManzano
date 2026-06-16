// Ler três valores inteiros e apresentar os valores dispostos em ordem crescente.

void main() {

  var v1 = 200;
  var v2 = 85;
  var v3 = 492;

  if (v1 > v2) {

    var temp = v1;
    v1 = v2;
    v2 = temp;

  }

  if (v2 > v3) {
    
    var temp = v2;
    v2 = v3;
    v3 = temp;

  }

  if (v1 > v2) {

    var temp = v1;
    v1 = v2;
    v2 = temp;

  }

  print("Valores em ordem crescente: $v1, $v2, $v3");
  
}
