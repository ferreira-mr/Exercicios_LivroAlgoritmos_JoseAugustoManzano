# 📝 Exercício 32: Ordenação de Três Números Inteiros

## 📖 Descrição
Escreva um programa que leia três valores inteiros e apresente os valores dispostos em ordem crescente.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira três valores inteiros.
   - Aguarde a entrada do usuário.

2. Processamento:
   - Compare os valores e os organize em ordem crescente.
   - Se o primeiro valor for maior que o segundo, troque-os.
   - Se o primeiro valor for maior que o terceiro, troque-os.
   - Se o segundo valor for maior que o terceiro, troque-os.

3. Saída de Dados:
   - Apresente os valores ordenados em ordem crescente.

## 🧪 Exemplos

- Exemplo 1:
  - Entrada: 5, 2, 7
  - Saída: 2, 5, 7

- Exemplo 2:
  - Entrada: 10, 1, 8
  - Saída: 1, 8, 10

- Exemplo 3:
  - Entrada: -3, -8, -1
  - Saída: -8, -3, -1

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: num1, num2, num3
PROCESSAMENTO:
  - SE num1 > num2 ENTÃO
    - TEMP = num1
    - num1 = num2
    - num2 = TEMP
  - SE num1 > num3 ENTÃO
    - TEMP = num1
    - num1 = num3
    - num3 = TEMP
  - SE num2 > num3 ENTÃO
    - TEMP = num2
    - num2 = num3
    - num3 = TEMP
SAÍDA: exibir num1, num2, num3
```
