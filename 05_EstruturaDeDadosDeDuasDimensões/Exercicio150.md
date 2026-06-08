# 📝 Exercício 150: Somatório de Elementos em Posições Ímpares

## 📖 Descrição
Escreva um programa que leia uma matriz do tipo real com cinco linhas e cinco colunas e apresente o somatório dos elementos situados nas posições de linha e coluna ímpares.

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
ENTRADA: matriz
somatorio = 0
PARA i DE 0 ATÉ 4 FAÇA
    PARA j DE 0 ATÉ 4 FAÇA
        SE i % 2 != 0 E j % 2 != 0 ENTÃO
            somatorio = somatorio + matriz[i][j]
EXIBIR "Somatório dos Elementos em Posições Ímpares:", somatorio
```
