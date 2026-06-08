# 📝 Exercício 131: Multiplicação de Matriz por Escalar

## 📖 Descrição
Escreva um programa que leia uma matriz 2x3 de números reais, leia um multiplicador real (escalar) e multiplique todos os elementos da matriz pelo escalar.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 6 números reais para a matriz e 1 real para o escalar.
2. Processamento:
   - Multiplique cada elemento A[i][j] pelo escalar e armazene na posição correspondente de uma matriz resultante.
3. Saída de Dados:
   - Apresente a matriz resultante com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 (matriz), 2.0 (escalar)
  - Saída: 2.00, 4.00, 6.00, 8.00, 10.00, 12.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[2][3], escalar
PROCESSAMENTO:
  PARA i DE 0 ATE 1 FAÇA
    PARA j DE 0 ATE 2 FAÇA
      R[i][j] = A[i][j] * escalar
    FIM PARA
  FIM PARA
SAÍDA: exibir R
```
