# 📝 Exercício 76: Manipulação de Elementos de um Vetor

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia um vetor de 12 elementos inteiros. Em seguida, o programa deve construir uma segunda matriz com a seguinte lei de formação: todo elemento da primeira matriz que for ímpar deve ser multiplicado por 2; caso contrário, o elemento da matriz deve permanecer constante.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os 12 elementos do vetor de inteiros.
   - Aguarde a entrada dos valores.

2. Inicialização:
   - Inicialize o segundo vetor como vazio.

3. Manipulação dos Elementos:
   - Para cada elemento do primeiro vetor, verifique se é ímpar; se for, multiplique por 2; caso contrário, mantenha o mesmo valor e adicione ao segundo vetor.

4. Exibição dos Vetores:
   - Apresente os elementos do primeiro vetor.
   - Apresente os elementos do segundo vetor.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetorOriginal
vetorResultante = []
PARA i DE 0 ATÉ 11 FAÇA
    SE vetorOriginal[i] % 2 != 0 ENTÃO
        ADICIONAR vetorOriginal[i] * 2 À vetorResultante
    SENÃO
        ADICIONAR vetorOriginal[i] À vetorResultante
EXIBIR "Vetor original:", vetorOriginal
EXIBIR "Vetor resultante:", vetorResultante
```
