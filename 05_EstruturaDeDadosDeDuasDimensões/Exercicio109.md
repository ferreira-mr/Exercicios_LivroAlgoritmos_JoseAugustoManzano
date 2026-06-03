# 📝 Exercício 109: Construção de Matriz com Condições Específicas

## 📖 Descrição
Escreva um programa que leia uma matriz do tipo inteira de duas dimensões com cinco linhas e cinco colunas. Construir uma segunda matriz de mesma dimensão, em que cada elemento seja o dobro de cada elemento correspondente da primeira matriz, com exceção dos valores situados na diagonal inversa (posições [1,5], [2,4], [3,3], [4,2] e [5,1]), os quais devem ser o triplo de cada elemento correspondente da primeira matriz. Apresentar a primeira e a segunda matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com cinco linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Construção da Segunda Matriz:
   - Para cada elemento da matriz, verifique se está na diagonal inversa e atribua o triplo do valor correspondente da primeira matriz. Caso contrário, atribua o dobro do valor correspondente da primeira matriz.

3. Saída de Dados:
   - Apresente a primeira matriz e a segunda matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matriz1
segundaMatriz = matriz vazia de 5x5
PARA i DE 0 ATÉ 4 FAÇA
    PARA j DE 0 ATÉ 4 FAÇA
        SE i + j == 4 ENTÃO
            segundaMatriz[i][j] = matriz1[i][j] * 3
        SENÃO
            segundaMatriz[i][j] = matriz1[i][j] * 2
EXIBIR "Primeira Matriz:", matriz1
EXIBIR "Segunda Matriz:", segundaMatriz
```
