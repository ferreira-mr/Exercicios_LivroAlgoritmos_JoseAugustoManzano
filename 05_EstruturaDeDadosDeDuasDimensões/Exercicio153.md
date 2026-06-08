# 📝 Exercício 153: Manipulação de Matrizes

## 📖 Descrição
Escreva um programa que leia duas matrizes A e B, cada uma com 1 linha e 12 colunas. O programa deve construir uma terceira matriz C de duas colunas e doze linhas, onde a primeira coluna de C deve ser formada pelos elementos da matriz A multiplicados por 2, e a segunda coluna de C deve ser formada pelos elementos da matriz B subtraídos de 5. Ao final, apresente as três matrizes.

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
ENTRADA: matriz1, matriz2
matrizResultado = matriz vazia de 12x2
PARA i DE 0 ATÉ 11 FAÇA
    matrizResultado[i][0] = matriz1[i] * 2
    matrizResultado[i][1] = matriz2[i] - 5
EXIBIR "Matriz 1:", matriz1
EXIBIR "Matriz 2:", matriz2
EXIBIR "Matriz Resultante:", matrizResultado
```
