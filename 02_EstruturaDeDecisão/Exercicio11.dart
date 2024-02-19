// Efetuar a leitura de um valor numérico inteiro que esteja na faixa de valores de 1 até 9. O programa deve apresentar a mensagem informando se o número esta na faixa permitida ou não.

void main() {

  var valor = 9;

  if (valor <= 1 || valor >= 9) {

    print("Valor não permitido");

  } 
  else {

    print("Valor permitido");

  }

}