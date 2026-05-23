# 📝 Exercício 82: Contagem de Números Pares e Ímpares em um Vetor

## 📖 Descrição
Escreva um programa que leia um vetor com 30 elementos do tipo inteiro. Ao final,.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os 30 elementos para o vetor.
   - Aguarde a entrada dos valores.

2. Contagem de Números Pares e Ímpares:
   - Para cada elemento do vetor, verifique se é par ou ímpar e incremente o contador correspondente.

3. Exibição dos Resultados:
   - Apresente as quantidades de números pares e ímpares no vetor.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetor
pares = 0
ímpares = 0
PARA i DE 0 ATÉ 29 FAÇA
    valor = LER "Digite o elemento " + (i + 1) + " do vetor: "
    SE valor % 2 == 0 ENTÃO
        pares = pares + 1
    SENÃO
        ímpares = ímpares + 1
EXIBIR "Quantidade de números pares:", pares
EXIBIR "Quantidade de números ímpares:", ímpares
```
