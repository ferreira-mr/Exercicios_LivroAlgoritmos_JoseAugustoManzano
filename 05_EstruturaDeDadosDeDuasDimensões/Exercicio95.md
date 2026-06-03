# 📝 Exercício 95: Matriz com Somatório e Valores Específicos

## 📖 Descrição
Escreva um programa que leia uma matriz A de duas dimensões com sete linhas e sete colunas. Construir uma matriz B de mesma dimensão, onde cada elemento de B deverá ser o somatório de 1 até o valor correspondente em A, caso o elemento não esteja na diagonal principal (i ≠ j) ou esteja em uma linha par (i % 2 = 0). Caso contrário (se estiver na diagonal principal e em uma linha ímpar), o elemento correspondente em B deverá ser o triplo do elemento de A. Ao final, apresente as duas matrizes.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com sete linhas e sete colunas.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Final:
   - Inicialize a matriz final com as mesmas dimensões da matriz original.

3. Preenchimento da Matriz Final:
   - Para cada elemento da matriz original, aplique a regra de preenchimento na matriz final.

4. Saída de Dados:
   - Apresente as duas matrizes: a original e a final.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matrizOriginal
matrizFinal = matriz vazia de 7x7
PARA i DE 0 ATÉ 6 FAÇA
    PARA j DE 0 ATÉ 6 FAÇA
        SE i != j OU i % 2 == 0 ENTÃO
            matrizFinal[i][j] = somatorio(matrizOriginal[i][j])
        SENÃO
            matrizFinal[i][j] = matrizOriginal[i][j] * 3
EXIBIR "Matriz Original:", matrizOriginal
EXIBIR "Matriz Final:", matrizFinal
```
