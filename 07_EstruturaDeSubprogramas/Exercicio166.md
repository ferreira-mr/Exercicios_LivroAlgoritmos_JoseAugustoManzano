# 📝 Exercício 166: Soma da Diagonal Principal de Matriz com Função

## 📖 Descrição
Escreva um programa que use uma função para calcular a soma de todos os elementos da diagonal principal de uma matriz 3x3.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os 9 elementos inteiros da matriz.
2. Processamento:
   - Crie a função somar_diagonal(M). Some os elementos M[i][i] para i de 0 a 2.
3. Saída de Dados:
   - Apresente o total acumulado.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 6, 7, 8, 9
  - Saída: 15
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao somar_diagonal(M)
  s = 0
  PARA i DE 0 ATE 2 FAÇA
    s = s + M[i][i]
  FIM PARA
  retorne s
fim_funcao
```
