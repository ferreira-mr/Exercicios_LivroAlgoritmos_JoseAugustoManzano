# 📝 Exercício 103: Soma de Linhas e Colunas em Matriz

## 📖 Descrição
Escreva um programa que faça a leitura de 20 valores inteiros em uma matriz com quatro linhas e cinco colunas. Construir uma segunda matriz com quatro elementos que seja formada pelo somatório dos elementos correspondentes de cada linha da primeira matriz. Construir também uma terceira matriz com cinco elementos que seja formada pelo somatório de cada elemento das colunas da primeira matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com quatro linhas e cinco colunas.
   - Aguarde a entrada do usuário.

2. Soma de Linhas:
   - Para cada linha da primeira matriz, some todos os elementos e armazene o resultado na segunda matriz.

3. Soma de Colunas:
   - Para cada coluna da primeira matriz, some todos os elementos e armazene o resultado na terceira matriz.

4. Saída de Dados:
   - Apresente a segunda matriz e a terceira matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext

matriz = lerMatriz(4, 5) // função para ler matriz com 4 linhas e 5 colunas
segundaMatriz = novaMatriz(1, 4) // função para criar nova matriz com 1 linha e 4 colunas
terceiraMatriz = novaMatriz(1, 5) // função para criar nova matriz com 1 linha e 5 colunas

PARA cada linha i da matriz FAÇA
    somaLinha = 0
    PARA cada coluna j da matriz FAÇA
        somaLinha = somaLinha + matriz[i][j]
        terceiraMatriz[0][j] = terceiraMatriz[0][j] + matriz[i][j]
    segundaMatriz[0][i] = somaLinha

EXIBIR "Segunda Matriz:", segundaMatriz
EXIBIR "Terceira Matriz:", terceiraMatriz
```
