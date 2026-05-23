# 📝 Exercício 95: Matriz com Somatório e Valores Específicos

## 📖 Descrição
Escreva um programa que leia uma matriz do tipo inteiro com sete linhas e sete colunas e construa uma segunda matriz com base em regras específicas.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com sete linhas e sete colunas.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Final:
   - Inicialize a matriz final com as mesmas dimensões da matriz original.

3. Preenchimento da Matriz Final:
   - Para cada elemento da matriz original, aplique a regra de preenchimento na matriz final.

4. Saída de Dados:
   - Apresente as duas matrizes: a original e a final.

## 💻 Exemplo em Pseudocódigo

```plaintext

matrizOriginal = lerMatriz(7, 7) // função para ler matriz com 7 linhas e 7 colunas
matrizFinal = novaMatriz(7, 7) // função para criar nova matriz com 7 linhas e 7 colunas

PARA cada linha i da matrizOriginal FAÇA
    PARA cada coluna j da matrizOriginal FAÇA
        SE i ≠ j OU i % 2 = 0 ENTÃO
            matrizFinal[i][j] = somatorioAte(matrizOriginal[i][j])
        SENÃO
            matrizFinal[i][j] = 3 * matrizOriginal[i][j]

EXIBIR "Matriz Original:"
EXIBIR matrizOriginal

EXIBIR "Matriz Final:"
EXIBIR matrizFinal
```
