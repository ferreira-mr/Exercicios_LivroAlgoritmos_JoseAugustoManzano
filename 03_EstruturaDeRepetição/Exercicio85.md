# 📝 Exercício 85: Mínimo Múltiplo Comum (MMC)

## 📖 Descrição
Escreva um programa que calcule o Mínimo Múltiplo Comum (MMC) entre dois números inteiros positivos a partir do cálculo de seu MDC.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dois números inteiros positivos.
2. Processamento:
   - Calcule o MDC utilizando o Algoritmo de Euclides. Em seguida, aplique a relação MMC = (a * b) / MDC.
3. Saída de Dados:
   - Apresente o MMC calculado.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 12, 15
  - Saída: 60
- Exemplo 2:
  - Entrada: 6, 8
  - Saída: 24
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: a, b
PROCESSAMENTO:
  temp_a = a
  temp_b = b
  ENQUANTO temp_b != 0 FAÇA
    resto = temp_a % temp_b
    temp_a = temp_b
    temp_b = resto
  FIM ENQUANTO
  mmc = (a * b) / temp_a
SAÍDA: exibir mmc
```
