# 📝 Exercício 132: Operações com Matrizes

## 📖 Descrição
Escreva um programa que leia quatro matrizes de uma linha e quatro colunas. Construir uma quinta matriz com quatro linhas e quatro colunas, sendo a primeira linha formada pelo dobro dos valores dos elementos da primeira matriz, a segunda linha formada pelo triplo dos valores dos elementos da segunda matriz, a terceira linha formada pelo quádruplo dos valores dos elementos da terceira matriz, e a quarta linha formada pelo quíntuplo dos valores dos elementos da quarta matriz. Ao final, apresente a quinta matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia as quatro matrizes com uma linha e quatro colunas.
   - Aguarde a entrada do usuário.

2. Construção da Quinta Matriz:
   - Para cada matriz de entrada, multiplique os valores dos elementos por 2, 3, 4 e 5 e armazene na quinta matriz, respectivamente.

3. Saída de Dados:
   - Apresente a quinta matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matriz1, matriz2, matriz3, matriz4
quintaMatriz = matriz vazia de 4x4
PARA i DE 0 ATÉ 3 FAÇA
    quintaMatriz[0][i] = matriz1[i] * 2
    quintaMatriz[1][i] = matriz2[i] * 3
    quintaMatriz[2][i] = matriz3[i] * 4
    quintaMatriz[3][i] = matriz4[i] * 5
EXIBIR "Quinta Matriz:", quintaMatriz
```
