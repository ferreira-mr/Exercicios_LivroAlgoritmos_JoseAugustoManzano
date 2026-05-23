# 📝 Exercício 91: Manipulação de Matrizes

## 📖 Descrição
Escreva um programa que leia duas matrizes com uma linha de doze colunas e construa uma terceira matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia as duas matrizes com uma linha de doze colunas cada.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Resultante:
   - Inicialize a matriz resultante com duas colunas e doze linhas.

3. Preenchimento da Matriz Resultante:
   - Para cada elemento da primeira matriz, multiplique por 2 e coloque na primeira coluna da matriz resultante.
   - Para cada elemento da segunda matriz, subtraia 5 e coloque na segunda coluna da matriz resultante.

4. Saída de Dados:
   - Apresente as três matrizes: a primeira, a segunda e a resultante.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz1 = lerMatriz(1, 12) // função para ler matriz com 1 linha e 12 colunas
matriz2 = lerMatriz(2, 12) // função para ler matriz com 1 linha e 12 colunas
matrizResultado = novaMatriz(12, 2) // função para criar nova matriz com 12 linhas e 2 colunas

PARA cada elemento i da matriz1 FAÇA
    matrizResultado[i][0] = matriz1[i] * 2

PARA cada elemento i da matriz2 FAÇA
    matrizResultado[i][1] = matriz2[i] - 5

EXIBIR "Matriz 1:"
EXIBIR matriz1

EXIBIR "Matriz 2:"
EXIBIR matriz2

EXIBIR "Matriz Resultante:"
EXIBIR matrizResultado

```
