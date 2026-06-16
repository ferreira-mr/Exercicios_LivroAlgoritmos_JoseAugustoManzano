// Ler os valores de quatro notas bimestrais de um aluno. Calcular a média aritmética. Caso a média seja maior que 7 o aluno será aprovado, caso contrário será solicitado a nota do exame para ser calculada a nova média que se for acima de 5 o aluno será aprovado em exame caso contrario reprovado.

void main() {

  var nota1 = 8.5;
  var nota2 = 7.0;
  var nota3 = 8.9;
  var nota4 = 7.5;

  var media = (nota1 + nota2 + nota3 + nota4) / 4;

  if (media > 7) {

    print("Aluno aprovado com média: ${media.toStringAsFixed(2)}");

  } 
  else {

    print("Informe a nota do exame:");
    var notaExame = 2.0; 

    var novaMedia = (media + notaExame) / 2;

    if (novaMedia > 5) {

      print("Aluno aprovado em exame com média: ${novaMedia.toStringAsFixed(2)}");

    } 
    else {

      print("Aluno reprovado com média: ${novaMedia.toStringAsFixed(2)}");

    }

  }

}
