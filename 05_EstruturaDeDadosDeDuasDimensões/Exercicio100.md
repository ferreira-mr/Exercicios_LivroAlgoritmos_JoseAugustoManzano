# 📝 Exercício 100: Contagem de Números Pares

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz do tipo inteiro com sete linhas e sete colunas e apresente o total de elementos pares existentes na matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com sete linhas e sete colunas.
   - Aguarde a entrada do usuário.

2. Contagem de Números Pares:
   - Para cada elemento da matriz, verifique se é par e conte o total de elementos pares.

3. Saída de Dados:
   - Apresente o total de números pares encontrados na matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(7, 7) // função para ler matriz com 7 linhas e 7 colunas
totalPares = 0

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        SE matriz[i][j] % 2 = 0 ENTÃO
            totalPares = totalPares + 1

EXIBIR "Total de números pares:", totalPares
```
