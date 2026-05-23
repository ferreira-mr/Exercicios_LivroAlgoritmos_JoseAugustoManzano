# 📝 Exercício 105: Soma de Matrizes com Condições

## 📖 Descrição
Escreva um programa que leia duas matrizes com quatro linhas e cinco colunas. A primeira matriz deve ser formada por valores divisíveis por 3 e 4, enquanto a segunda matriz deve ser formada por valores divisíveis por 5 e 6. As entradas dos valores nas matrizes devem ser validadas pelo programa, e não pelo usuário. Construir e apresentar uma terceira matriz de mesma dimensão, que seja formada pela soma dos elementos da primeira matriz com os elementos da segunda. Apresentar as matrizes.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Gerar as matrizes com valores divisíveis por 3, 4, 5 e 6.

2. Construção da Terceira Matriz:
   - Para cada elemento das matrizes, somar os valores correspondentes e armazenar na terceira matriz.

3. Saída de Dados:
   - Apresentar as três matrizes.

## 💻 Exemplo em Pseudocódigo

```plaintext

GerarMatrizDivisivelPor3e4(matriz1, 4, 5) // função para gerar matriz com valores divisíveis por 3 e 4
GerarMatrizDivisivelPor5e6(matriz2, 4, 5) // função para gerar matriz com valores divisíveis por 5 e 6

terceiraMatriz = novaMatriz(4, 5) // função para criar nova matriz com 4 linhas e 5 colunas

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        terceiraMatriz[i][j] = matriz1[i][j] + matriz2[i][j]

EXIBIR "Terceira Matriz:", terceiraMatriz
```
