# 📝 Exercício 145: Transposta de uma Matriz 3x3

## 📖 Descrição
Escreva um programa que leia uma matriz A de ordem 3x3 e construa a matriz transposta B de ordem 3x3.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 elementos inteiros correspondentes às linhas da matriz A.
2. Processamento:
   - Preencha a matriz transposta B fazendo B[j][i] = A[i][j] para todas as posições i e j de 0 a 2.
3. Saída de Dados:
   - Apresente os elementos da matriz B de forma organizada.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 6, 7, 8, 9
  - Saída: 1, 4, 7, 2, 5, 8, 3, 6, 9
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[3][3]
PROCESSAMENTO:
  PARA i DE 0 ATE 2 FAÇA
    PARA j DE 0 ATE 2 FAÇA
      B[j][i] = A[i][j]
    FIM PARA
  FIM PARA
SAÍDA: exibir B
```
