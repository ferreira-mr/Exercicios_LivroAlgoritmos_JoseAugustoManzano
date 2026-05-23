# 📝 Exercício 94: Matriz com Dobro dos Elementos, Exceto Diagonal Principal

## 📖 Descrição
Escreva um programa que leia uma matriz A do tipo inteiro com cinco linhas e cinco colunas e construa uma segunda matriz B em que cada elemento seja o dobro de cada elemento da primeira matriz, com exceção dos valores situados na diagonal principal.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz A com cinco linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz B:
   - Inicialize a matriz B com as mesmas dimensões da matriz A.

3. Preenchimento da Matriz B:
   - Para cada elemento da matriz A, verifique se está na diagonal principal. Se sim, copie o valor diretamente para a matriz B. Caso contrário, multiplique por 2 e coloque na matriz B.

4. Saída de Dados:
   - Apresente as duas matrizes: a matriz A e a matriz B.

## 💻 Exemplo em Pseudocódigo

```plaintext

matrizA = lerMatriz(5, 5) // função para ler matriz com 5 linhas e 5 colunas
matrizB = novaMatriz(5, 5) // função para criar nova matriz com 5 linhas e 5 colunas

PARA cada linha i da matrizA FAÇA
    PARA cada coluna j da matrizA FAÇA
        SE i != j ENTAO
            matrizB[i][j] = matrizA[i][j] * 2
        SENAO
            matrizB[i][j] = matrizA[i][j]

EXIBIR "Matriz A:"
EXIBIR matrizA

EXIBIR "Matriz B:"
EXIBIR matrizB
```
