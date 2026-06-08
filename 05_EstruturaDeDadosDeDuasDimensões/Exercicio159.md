# 📝 Exercício 159: Determinante de Matriz 3x3

## 📖 Descrição
Escreva um programa que leia uma matriz 3x3 de números inteiros e calcule o seu determinante utilizando a Regra de Sarrus.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 inteiros da matriz.
2. Processamento:
   - Aplique a fórmula de Sarrus: det = (A[0][0]*A[1][1]*A[2][2] + A[0][1]*A[1][2]*A[2][0] + A[0][2]*A[1][0]*A[2][1]) - (A[0][2]*A[1][1]*A[2][0] + A[0][0]*A[1][2]*A[2][1] + A[0][1]*A[1][0]*A[2][2]).
3. Saída de Dados:
   - Apresente o valor do determinante.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 0, 1, 4, 5, 6, 0
  - Saída: 1
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[3][3]
PROCESSAMENTO:
  det = (A[0][0]*A[1][1]*A[2][2] + A[0][1]*A[1][2]*A[2][0] + A[0][2]*A[1][0]*A[2][1]) - (A[0][2]*A[1][1]*A[2][0] + A[0][0]*A[1][2]*A[2][1] + A[0][1]*A[1][0]*A[2][2])
SAÍDA: exibir det
```
