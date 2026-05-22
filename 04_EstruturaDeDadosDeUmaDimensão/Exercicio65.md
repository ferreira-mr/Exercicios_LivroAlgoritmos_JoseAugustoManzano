# 📝 Exercício 65: Fatorial de Elementos de uma Matriz

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz com 15 elementos inteiros e construa uma segunda matriz onde cada elemento seja o resultado da fatorial do elemento correspondente da primeira matriz.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os 15 elementos inteiros.
   - Aguarde a entrada dos elementos.

2. Inicialização:
   - Inicialize a segunda matriz como vazia.

3. Cálculo dos Fatoriais:
   - Para cada elemento da primeira matriz, calcule o fatorial e adicione à segunda matriz.

4. Exibição das Matrizes:
   - Apresente os elementos da primeira matriz.
   - Apresente os elementos da segunda matriz.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: matriz1
matriz2 = []
PARA i DE 0 ATÉ 14 FAÇA
    fatorial = 1
    PARA j DE 1 ATÉ matriz1[i] FAÇA
        fatorial = fatorial * j
    ADICIONAR fatorial À matriz2
EXIBIR "Matriz original:", matriz1
EXIBIR "Matriz dos fatoriais:", matriz2
```
