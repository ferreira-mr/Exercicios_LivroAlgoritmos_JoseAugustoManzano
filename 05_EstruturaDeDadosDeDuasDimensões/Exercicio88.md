# 📝 Exercício 88: Junção de Matrizes

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia duas matrizes, cada uma com uma linha e sete colunas, para receber números inteiros. O programa deve construir uma terceira matriz cuja primeira coluna deve ser formada pelos elementos da primeira matriz e a segunda coluna pelos elementos da segunda matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os elementos para as duas matrizes, considerando uma linha e sete colunas para cada uma.
   - Aguarde a entrada dos valores.

2. Construção da Matriz Resultante:
   - Para cada posição (i, j) da matriz resultante, defina a primeira coluna como os elementos da primeira matriz e a segunda coluna como os elementos da segunda matriz.

3. Exibição da Matriz Resultante:
   - Apresente os elementos da matriz resultante.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matriz1, matriz2
matriz_resultante = matriz vazia de 7x2
PARA i DE 0 ATÉ 6 FAÇA
    matriz_resultante[i][0] = matriz1[0][i]
    matriz_resultante[i][1] = matriz2[0][i]
EXIBIR "Matriz Resultante:", matriz_resultante
```
