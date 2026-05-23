# 📝 Exercício 106: Subtração de Matrizes com Condições

## 📖 Descrição
Escreva um programa que leia duas matrizes com quatro linhas e cinco colunas. A primeira matriz deve ser formada por valores divisíveis por 3 e 4, enquanto a segunda matriz deve ser formada por valores divisíveis por 5 e 6. As entradas dos valores nas matrizes devem ser validadas pelo programa, e não pelo usuário. Construir e apresentar uma terceira matriz da mesma dimensão que contenha a subtração dos elementos da primeira matriz pelos elementos da segunda.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia as duas matrizes com quatro linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Construção da Terceira Matriz:
   - Para cada elemento das matrizes, subtraia o elemento da segunda matriz do elemento da primeira matriz e armazene o resultado na terceira matriz.

3. Saída de Dados:
   - Apresente a terceira matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz1 = lerMatriz(4, 5) // função para ler matriz com 4 linhas e 5 colunas
matriz2 = lerMatriz(4, 5) // função para ler matriz com 4 linhas e 5 colunas

terceiraMatriz = novaMatriz(4, 5) // função para criar nova matriz com 4 linhas e 5 colunas

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        terceiraMatriz[i][j] = matriz1[i][j] - matriz2[i][j]

EXIBIR "Terceira Matriz:", terceiraMatriz
```
