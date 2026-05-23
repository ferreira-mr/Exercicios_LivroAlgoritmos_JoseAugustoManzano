# 📝 Exercício 102: Contagem de Números Pares e Ímpares em Matriz

## 📖 Descrição
Escreva um programa que leia uma matriz de dez linhas e sete colunas. Ao final, apresentar o total de elementos pares e ímpares existentes na matriz. Apresentar também o percentual de elementos pares e ímpares em relação ao total de elementos da matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com dez linhas e sete colunas.
   - Aguarde a entrada do usuário.

2. Contagem de Números Pares e Ímpares:
   - Para cada elemento da matriz, verifique se é par ou ímpar e conte o total de elementos pares e ímpares.
   - Calcule o percentual de elementos pares e ímpares em relação ao total de elementos da matriz.

3. Saída de Dados:
   - Apresente o total de elementos pares e ímpares.
   - Apresente o percentual de elementos pares e ímpares.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(10, 7) // função para ler matriz com 10 linhas e 7 colunas
totalPares = 0
totalImpares = 0

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        SE matriz[i][j] % 2 = 0 ENTÃO
            totalPares = totalPares + 1
        SENÃO
            totalImpares = totalImpares + 1

totalElementos = 10 * 7
percentualPares = (totalPares / totalElementos) * 100
percentualImpares = (totalImpares / totalElementos) * 100

EXIBIR "Total de elementos pares:", totalPares
EXIBIR "Total de elementos ímpares:", totalImpares
EXIBIR "Percentual de elementos pares:", percentualPares, "%"
EXIBIR "Percentual de elementos ímpares:", percentualImpares, "%"
```
