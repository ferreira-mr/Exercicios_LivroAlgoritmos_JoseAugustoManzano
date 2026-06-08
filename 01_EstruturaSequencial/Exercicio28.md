# 📝 Exercício 28: Distância entre Dois Pontos no Plano

## 📖 Descrição
Escreva um programa que leia as coordenadas cartesianas (x1, y1) e (x2, y2) de dois pontos no plano e calcule a distância euclidiana entre eles.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os valores das coordenadas reais x1, y1, x2 e y2.
2. Processamento:
   - Aplique a fórmula da distância euclidiana d = raiz_quadrada((x2 - x1)^2 + (y2 - y1)^2).
3. Saída de Dados:
   - Apresente a distância entre os pontos com duas casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 4, 6
  - Saída: 5.00
- Exemplo 2:
  - Entrada: 0, 0, 3, 4
  - Saída: 5.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: x1, y1, x2, y2
PROCESSAMENTO: distancia = raiz((x2 - x1)^2 + (y2 - y1)^2)
SAÍDA: exibir formato_decimal(distancia, 2)
```
