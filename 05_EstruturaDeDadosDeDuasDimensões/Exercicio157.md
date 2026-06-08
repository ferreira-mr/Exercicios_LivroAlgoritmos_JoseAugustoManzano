# 📝 Exercício 157: Multiplicação de Duas Matrizes

## 📖 Descrição
Escreva um programa que leia uma matriz A (2x3) e uma matriz B (3x2), realize a multiplicação matricial C = A x B (gerando uma matriz 2x2) e apresente os elementos de C.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 6 elementos de A e 6 de B.
2. Processamento:
   - Para cada posição C[i][j] (i de 0 a 1, j de 0 a 1), calcule o somatório de A[i][k] * B[k][j] para k de 0 a 2.
3. Saída de Dados:
   - Apresente os 4 elementos da matriz C.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 6 (A), 7, 8, 9, 1, 2, 3 (B)
  - Saída: 31, 19, 85, 55
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[2][3], B[3][2]
PROCESSAMENTO:
  PARA i DE 0 ATE 1 FAÇA
    PARA j DE 0 ATE 1 FAÇA
      C[i][j] = 0
      PARA k DE 0 ATE 2 FAÇA
        C[i][j] = C[i][j] + A[i][k] * B[k][j]
      FIM PARA
    FIM PARA
  FIM PARA
SAÍDA: exibir C
```
