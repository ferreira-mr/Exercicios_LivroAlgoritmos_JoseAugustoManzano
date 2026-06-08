# 📝 Exercício 158: Rotação de Matriz 90 Graus

## 📖 Descrição
Escreva um programa que leia uma matriz 3x3 de inteiros e exiba-a após rotacioná-la 90 graus no sentido horário.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 inteiros da matriz.
2. Processamento:
   - Crie uma matriz rotacionada R fazendo R[j][2 - i] = A[i][j] para i e j de 0 a 2.
3. Saída de Dados:
   - Apresente os elementos da matriz rotacionada.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 6, 7, 8, 9
  - Saída: 7, 4, 1, 8, 5, 2, 9, 6, 3
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[3][3]
PROCESSAMENTO:
  PARA i DE 0 ATE 2 FAÇA
    PARA j DE 0 ATE 2 FAÇA
      R[j][2 - i] = A[i][j]
    FIM PARA
  FIM PARA
SAÍDA: exibir R
```
