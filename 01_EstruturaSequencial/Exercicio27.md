# 📝 Exercício 27: Consumo de Combustível de Viagem

## 📖 Descrição
Escreva um programa que leia a distância total percorrida em uma viagem (em km), o preço do litro do combustível (em R$) e a média de consumo do veículo (em km/l), e calcule os litros consumidos e o custo total da viagem.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite a distância total (km), o preço do combustível (R$/l) e o consumo médio (km/l).
2. Processamento:
   - Calcule a quantidade de litros dividindo a distância pelo consumo médio. Multiplique a quantidade de litros pelo preço do combustível para obter o custo total.
3. Saída de Dados:
   - Apresente os litros consumidos e o custo total com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 300, 5.50, 12
  - Saída: Litros: 25.00, Custo: R$ 137.50
- Exemplo 2:
  - Entrada: 150, 6.00, 10
  - Saída: Litros: 15.00, Custo: R$ 90.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: distancia, preco, consumo
PROCESSAMENTO:
  litros = distancia / consumo
  custo = litros * preco
SAÍDA: exibir litros, custo
```
