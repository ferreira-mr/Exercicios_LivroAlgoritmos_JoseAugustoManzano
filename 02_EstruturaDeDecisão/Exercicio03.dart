// Realizar a leitura dos valores de quatro notas bimestrais de uma aluno, calcular a média aritmética e informar se o aluno foi aprovado ou reprovado. A nota para ser aprovado é 5.

void main(){

  var nota1 = 7;
  var nota2 = 3;
  var nota3 = 4.5;
  var nota4 = 8;

  var media = (nota1 + nota2 + nota3 + nota4) / 4;

  if(media < 5){

    print("Sua nota foi ${media.toStringAsFixed(2)} e você foi reprovado");

  }
  else{

    print("Sua nota foi ${media.toStringAsFixed(2)} você foi aprovado");

  }

}