# 📝 Exercício 107: Multiplicação de Matrizes com Condições

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia duas matrizes de duas dimensões com quatro linhas e cinco colunas. A primeira matriz deve ser formada por valores divisíveis por 3 ou 4, enquanto a segunda matriz deve ser formada por valores divisíveis por 5 e 6. As entradas dos valores nas matrizes devem ser validadas pelo programa e não pelo usuário. Construir e apresentar uma terceira matriz de mesma dimensão que contenha o valor da multiplicação dos elementos da primeira matriz com os elementos da segunda matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia as duas matrizes com quatro linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Construção da Terceira Matriz:
   - Para cada elemento das matrizes, multiplique o elemento da primeira matriz pelo elemento da segunda matriz e armazene o resultado na terceira matriz.

3. Saída de Dados:
   - Apresente a terceira matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz1 = lerMatriz(4, 5) // função para ler matriz com 4 linhas e 5 colunas
matriz2 = lerMatriz(4, 5) // função para ler matriz com 4 linhas e 5 colunas

terceiraMatriz = novaMatriz(4, 5) // função para criar nova matriz com 4 linhas e 5 colunas

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        terceiraMatriz[i][j] = matriz1[i][j] * matriz2[i][j]

EXIBIR "Terceira Matriz:", terceiraMatriz
```
