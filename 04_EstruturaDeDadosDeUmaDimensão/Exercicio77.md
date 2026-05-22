# 📝 Exercício 77: Manipulação de Elementos de um Vetor

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia um vetor de 15 elementos reais. Em seguida, o programa deve construir uma segunda matriz com a seguinte lei de formação: todo elemento da primeira matriz que possuir índice par deve ter seus elementos divididos por 2, caso contrário, o elemento deve ser multiplicado por 1.5.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os 15 elementos do vetor de números reais.
   - Aguarde a entrada dos valores.

2. Inicialização:
   - Inicialize o segundo vetor como vazio.

3. Manipulação dos Elementos:
   - Para cada elemento do primeiro vetor, verifique se o índice é par; se for, divida por 2; caso contrário, multiplique por 1.5 e adicione ao segundo vetor.

4. Exibição dos Vetores:
   - Apresente os elementos do primeiro vetor.
   - Apresente os elementos do segundo vetor.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetorOriginal
vetorResultante = []
PARA i DE 0 ATÉ 14 FAÇA
    SE i % 2 == 0 ENTÃO
        ADICIONAR vetorOriginal[i] / 2 À vetorResultante
    SENÃO
        ADICIONAR vetorOriginal[i] * 1.5 À vetorResultante
EXIBIR "Vetor original:", vetorOriginal
EXIBIR "Vetor resultante:", vetorResultante
```
