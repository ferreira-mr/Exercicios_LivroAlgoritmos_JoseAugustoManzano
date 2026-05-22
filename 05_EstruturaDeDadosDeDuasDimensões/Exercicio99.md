# 📝 Exercício 99: Somatório de Elementos em Posições Ímpares

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz do tipo real com cinco linhas e cinco colunas e apresente o somatório dos elementos situados nas posições de linha e coluna ímpares.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com cinco linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Somatório dos Elementos em Posições Ímpares:
   - Calcule o somatório dos elementos situados nas posições de linha e coluna ímpares.

3. Saída de Dados:
   - Apresente o somatório calculado.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(5, 5) // função para ler matriz com 5 linhas e 5 colunas
somatorio = 0

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        SE i % 2 = 0 E j % 2 = 0 ENTÃO
            somatorio = somatorio + matriz[i][j]

EXIBIR "Somatório dos Elementos em Posições Ímpares:", somatorio
```
