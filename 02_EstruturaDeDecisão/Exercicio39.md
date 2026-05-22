# 📝 Exercício 39: Múltiplo de 3 e 5

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia um número e 
apresente-o apenas se ele for múltiplo de 3 e 5.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira um número.
   - Aguarde a entrada do usuário.

2. Processamento:
   - Verifique se o número inserido é um múltiplo de 3 e 5.
   - Para verificar se um número é múltiplo de outro, podemos usar o operador de módulo (%).
     Se o resultado da divisão do número pelo múltiplo desejado for igual a zero, então o número é múltiplo.
     Ou seja, se numero % 3 == 0 e numero % 5 == 0, então o número é múltiplo de 3 e 5.

3. Saída de Dados:
   - Apresente o número inserido se ele for um múltiplo de 3 e 5.

## 🧪 Exemplos

- Exemplo 1:
  - Entrada: 15
  - Saída: 15
  - Explicação: 15 é divisível por 3 e 5.

- Exemplo 2:
  - Entrada: 10
  - Saída: (Nenhum valor apresentado)
  - Explicação: 10 não é divisível por 3 e 5.

- Exemplo 3:
  - Entrada: 30
  - Saída: 30
  - Explicação: 30 é divisível por 3 e 5.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: numero
PROCESSAMENTO:
  - SE numero % 3 == 0 e numero % 5 == 0 ENTÃO
    - EXIBIR numero
```
