# 📝 Exercício 101: Soma de Linhas em Matriz e Somatório Total

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz do tipo real com oito linhas e seis colunas. Construir uma segunda matriz que seja formada pela soma de cada linha da primeira matriz. Ao final, apresentar o somatório dos elementos da primeira e segunda matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com oito linhas e seis colunas.
   - Aguarde a entrada do usuário.

2. Soma de Linhas e Construção da Segunda Matriz:
   - Para cada linha da primeira matriz, some todos os elementos e armazene o resultado na segunda matriz.
   - Ao mesmo tempo, calcule o somatório total dos elementos da primeira matriz.

3. Saída de Dados:
   - Apresente o somatório dos elementos da primeira matriz e da segunda matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(8, 6) // função para ler matriz com 8 linhas e 6 colunas
segundaMatriz = novaMatriz(8, 1) // função para criar nova matriz com 8 linhas e 1 coluna
somatorioTotal = 0

PARA cada linha i da matriz FAÇA
    somaLinha = 0
    PARA cada coluna j da matriz FAÇA
        somaLinha = somaLinha + matriz[i][j]
        somatorioTotal = somatorioTotal + matriz[i][j]
    segundaMatriz[i][0] = somaLinha

EXIBIR "Somatório dos elementos da primeira matriz:", somatorioTotal
EXIBIR "Somatório dos elementos da segunda matriz:", somatorioTotal
```
