# 📝 Exercício 92: Fatorial de Elementos de uma Matriz

## 📖 Descrição
Escreva um programa que leia uma matriz com cinco linhas e quatro colunas e construa uma segunda matriz com o fatorial de cada elemento da primeira matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com cinco linhas e quatro colunas.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Fatorial:
   - Inicialize a matriz fatorial com as mesmas dimensões da matriz original.

3. Cálculo do Fatorial:
   - Para cada elemento da matriz original, calcule o fatorial e armazene na matriz fatorial.

4. Saída de Dados:
   - Apresente as duas matrizes: a original e a fatorial.

## 💻 Exemplo em Pseudocódigo

```plaintext

matrizOriginal = lerMatriz(5, 4) // função para ler matriz com 5 linhas e 4 colunas
matrizFatorial = novaMatriz(5, 4) // função para criar nova matriz com 5 linhas e 4 colunas

PARA cada linha i da matrizOriginal FAÇA
    PARA cada coluna j da matrizOriginal FAÇA
        matrizFatorial[i][j] = calcularFatorial(matrizOriginal[i][j])

EXIBIR "Matriz Original:"
EXIBIR matrizOriginal

EXIBIR "Matriz Fatorial:"
EXIBIR matrizFatorial
```
