# 📝 Exercício 35: Maior e Menor Valor

## 📖 Descrição
Escreva um programa que leia cinco valores numéricos inteiros e apresente o maior e o menor valor.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira cinco valores numéricos inteiros.
   - Aguarde a entrada do usuário.

2. Processamento:
   - Encontre o maior e o menor valor dentre os cinco valores fornecidos.

3. Saída de Dados:
   - Apresente o maior e o menor valor encontrados.

## 🧪 Exemplos

- Exemplo 1:
  - Entrada: 10, 5, 8, 12, 3
  - Saída: Maior valor: 12, Menor valor: 3

- Exemplo 2:
  - Entrada: -1, -5, -3, -8, -2
  - Saída: Maior valor: -1, Menor valor: -8

- Exemplo 3:
  - Entrada: 100, 200, 150, 300, 250
  - Saída: Maior valor: 300, Menor valor: 100

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: num1, num2, num3, num4, num5
PROCESSAMENTO:
  - maior_valor = num1
  - menor_valor = num1
  - SE num2 > maior_valor ENTÃO
    - maior_valor = num2
  - SE num2 < menor_valor ENTÃO
    - menor_valor = num2
  - REPEAT para num3, num4 e num5
  - EXIBIR "Maior valor:", maior_valor
  - EXIBIR "Menor valor:", menor_valor
```
