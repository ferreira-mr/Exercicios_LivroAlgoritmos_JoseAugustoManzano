# 📝 Exercício 97: Somatório dos Elementos da Diagonal Principal

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz do tipo real de cinco linhas e cinco colunas e apresente o somatório dos elementos situados na diagonal principal.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com cinco linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Somatório da Diagonal Principal:
   - Calcule o somatório dos elementos situados na diagonal principal da matriz.

3. Saída de Dados:
   - Apresente o somatório calculado.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(5, 5) // função para ler matriz com 5 linhas e 5 colunas
somatorio = 0

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        SE i = j ENTÃO
            somatorio = somatorio + matriz[i][j]

EXIBIR "Somatório da Diagonal Principal:", somatorio
```
