# 📝 Exercício 58: Classificador de Quadrantes e Distância Geométrica

## 📖 Descrição
Escreva um programa que leia as coordenadas (X, Y) de um ponto no plano cartesiano e determine em qual quadrante ele está localizado (Primeiro, Segundo, Terceiro, Quarto, Origem ou nos Eixos X ou Y). Calcule também a distância euclidiana do ponto até a origem (0, 0).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os valores reais de X e Y.
2. Processamento:
   - Determine a localização baseando-se nos sinais de X e Y. Calcule a distância do ponto (X, Y) até (0, 0) utilizando raiz_quadrada(X^2 + Y^2).
3. Saída de Dados:
   - Apresente o quadrante e o valor da distância com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 3, 4
  - Saída: Primeiro quadrante, Distância: 5.00
- Exemplo 2:
  - Entrada: 0, 0
  - Saída: Origem, Distância: 0.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: x, y
PROCESSAMENTO:
  dist = raiz(x*x + y*y)
  SE x == 0 E y == 0 ENTÃO loc = "Origem"
  SENÃO SE x == 0 ENTÃO loc = "Eixo Y"
  SENÃO SE y == 0 ENTÃO loc = "Eixo X"
  SENÃO SE x > 0 E y > 0 ENTÃO loc = "Primeiro quadrante"
  SENÃO SE x < 0 E y > 0 ENTÃO loc = "Segundo quadrante"
  SENÃO SE x < 0 E y < 0 ENTÃO loc = "Terceiro quadrante"
  SENÃO loc = "Quarto quadrante"
  FIM SE
SAÍDA: exibir loc, dist
```
