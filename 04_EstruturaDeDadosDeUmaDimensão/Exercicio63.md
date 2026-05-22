# 📝 Exercício 63: Subtração de Elementos de Matrizes

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia duas matrizes com 20 elementos reais e construa uma terceira matriz onde cada elemento deve ser a subtração do elemento de mesma posição das duas primeiras matrizes.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os 20 elementos da primeira matriz.
   - Leia os 20 elementos da segunda matriz.
   - Aguarde a entrada dos elementos.

2. Inicialização:
   - Inicialize a terceira matriz como vazia.

3. Loop de Subtração:
   - Para cada posição i, de 0 a 19, da primeira e segunda matriz:
     - Subtraia o elemento da posição i da segunda matriz do elemento da posição i da primeira matriz.
     - Adicione o resultado à terceira matriz.

4. Exibição da Matriz Resultante:
   - Apresente os elementos da terceira matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matriz1, matriz2
matriz3 = []
PARA i DE 0 ATÉ 19 FAÇA
    elemento = matriz1[i] - matriz2[i]
    ADICIONAR elemento À matriz3
EXIBIR matriz3
```
