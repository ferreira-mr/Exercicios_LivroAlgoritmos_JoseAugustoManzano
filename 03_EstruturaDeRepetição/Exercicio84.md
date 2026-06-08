# 📝 Exercício 84: Máximo Divisor Comum (MDC)

## 📖 Descrição
Escreva um programa que leia dois números inteiros positivos e calcule o Máximo Divisor Comum (MDC) entre eles usando o Algoritmo de Euclides.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dois números inteiros positivos.
2. Processamento:
   - Enquanto o segundo número for diferente de zero, guarde o resto da divisão do primeiro pelo segundo, faça o primeiro receber o segundo, e o segundo receber o resto.
3. Saída de Dados:
   - Apresente o valor do MDC obtido.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 24, 36
  - Saída: 12
- Exemplo 2:
  - Entrada: 17, 5
  - Saída: 1
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: a, b
PROCESSAMENTO:
  ENQUANTO b != 0 FAÇA
    resto = a % b
    a = b
    b = resto
  FIM ENQUANTO
SAÍDA: exibir a
```
