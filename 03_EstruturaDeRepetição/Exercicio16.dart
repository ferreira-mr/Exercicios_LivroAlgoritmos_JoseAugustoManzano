// Elaborar um programa que possibilite calcular a área total em metros de uma residência com os comôdos sala, cozinha, banheiro dois quartos, área de serviço, quinta, garagem, entre outros que podem ser fornecidos ao programa. O programa deve solicitar a entreda do nome, da largura e do comprimento de um determinado comôdo lido e também uma mensagem solicitando ao usuário a confirma~c|"ao de continar calculando novos comôdos. Caso o usuário responda "NÃO", o programa deve apresentar o valor total acumulado da área residencia.

void main() {

  Map<String, List<double>> comodos = {

    'sala': [4.5, 8.5],
    'cozinha': [4.0, 4.0],
    'banheiro': [5.0, 3.5],
    'quarto1': [4.5, 4.0],
    'quarto2': [6.0, 3.5],
    'area de serviço': [2.0, 3.0],
    'quintal': [5.0, 6.0],
    'garagem': [3.0, 5.0],

  };

  double areaTotal = 0;

  comodos.forEach((nomeComodo, medidas) {

    double largura = medidas[0];
    double comprimento = medidas[1];
    double areaComodo = largura * comprimento;
    areaTotal += areaComodo;

  });

  print("A área total da residência é de $areaTotal metros quadrados.");
  
}