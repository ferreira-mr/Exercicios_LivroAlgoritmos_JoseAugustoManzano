# 📝 Exercício 96: Manipulação de Matrizes

## 📖 Descrição
Escreva um programa que leia uma matriz A com seis linhas e cinco colunas. Construir uma matriz B de mesma dimensão, de modo que cada elemento de B seja o elemento correspondente de A somado com 5 se o elemento for par, e subtraído de 4 se o elemento for ímpar. Ao final, apresente as duas matrizes.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com seis linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Modificada:
   - Inicialize a matriz modificada com as mesmas dimensões da matriz original.

3. Preenchimento da Matriz Modificada:
   - Para cada elemento da matriz original, aplique a regra de preenchimento na matriz modificada.

4. Saída de Dados:
   - Apresente as duas matrizes: a original e a modificada.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matrizOriginal
matrizModificada = matriz vazia de 6x5
PARA i DE 0 ATÉ 5 FAÇA
    PARA j DE 0 ATÉ 4 FAÇA
        SE matrizOriginal[i][j] % 2 == 0 ENTÃO
            matrizModificada[i][j] = matrizOriginal[i][j] + 5
        SENÃO
            matrizModificada[i][j] = matrizOriginal[i][j] - 4
EXIBIR "Matriz Original:", matrizOriginal
EXIBIR "Matriz Modificada:", matrizModificada
```
