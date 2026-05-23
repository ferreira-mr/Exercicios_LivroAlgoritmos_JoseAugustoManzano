# 📝 Exercício 85: Contagem de Números Pares em uma Matriz

## 📖 Descrição
Escreva um programa que leia uma matriz com 15 elementos números inteiros e apresente o total de elementos pares existentes nesse vetor.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os 15 elementos para a matriz.
   - Aguarde a entrada dos valores.

2. Contagem de Números Pares:
   - Para cada elemento da matriz, verifique se é par e incremente o contador de números pares.

3. Exibição do Resultado:
   - Apresente o total de números pares encontrados na matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matriz
pares = 0
PARA i DE 0 ATÉ 14 FAÇA
    SE matriz[i] % 2 == 0 ENTÃO
        pares = pares + 1
EXIBIR "Total de números pares:", pares
```
