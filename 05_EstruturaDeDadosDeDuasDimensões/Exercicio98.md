# 📝 Exercício 98: Somatório dos Elementos de uma Matriz

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz do tipo inteiro com cinco linhas e cinco colunas e apresente o somatório de todos os elementos da matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com cinco linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Somatório de Todos os Elementos:
   - Calcule o somatório de todos os elementos da matriz.

3. Saída de Dados:
   - Apresente o somatório calculado.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(5, 5) // função para ler matriz com 5 linhas e 5 colunas
somatorio = 0

PARA cada linha i da matriz FAÇA
    PARA cada coluna j da matriz FAÇA
        somatorio = somatorio + matriz[i][j]

EXIBIR "Somatório dos Elementos da Matriz:", somatorio
```
