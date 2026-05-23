# 📝 Exercício 96: Manipulação de Matrizes

## 📖 Descrição
Escreva um programa que leia uma matriz com seis linhas e cinco colunas e construa uma segunda matriz com base em regras específicas.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com seis linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Modificada:
   - Inicialize a matriz modificada com as mesmas dimensões da matriz original.

3. Preenchimento da Matriz Modificada:
   - Para cada elemento da matriz original, aplique a regra de preenchimento na matriz modificada.

4. Saída de Dados:
   - Apresente as duas matrizes: a original e a modificada.

## 💻 Exemplo em Pseudocódigo

```plaintext

matrizOriginal = lerMatriz(6, 5) // função para ler matriz com 6 linhas e 5 colunas
matrizModificada = novaMatriz(6, 5) // função para criar nova matriz com 6 linhas e 5 colunas

PARA cada linha i da matrizOriginal FAÇA
    PARA cada coluna j da matrizOriginal FAÇA
        SE matrizOriginal[i][j] % 2 = 0 ENTÃO
            matrizModificada[i][j] = matrizOriginal[i][j] + 5
        SENÃO
            matrizModificada[i][j] = matrizOriginal[i][j] - 4

EXIBIR "Matriz Original:"
EXIBIR matrizOriginal

EXIBIR "Matriz Modificada:"
EXIBIR matrizModificada
```
