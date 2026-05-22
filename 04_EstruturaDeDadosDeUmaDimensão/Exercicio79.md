# 📝 Exercício 79: Junção de Vetores com Validação de Entrada

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia dois vetores A e B com seis elementos cada. O vetor A deve aceitar apenas a entrada de valores pares, enquanto o vetor B deve aceitar apenas a entrada de valores ímpares. A entrada dos vetores deve ser validada pelo programa. Em seguida, o programa deve construir o vetor C que seja o resultado da junção dos vetores A e B.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os seis elementos para o vetor A, aceitando apenas valores pares.
   - Leia os seis elementos para o vetor B, aceitando apenas valores ímpares.
   - Aguarde a entrada dos valores.

2. Validação da Entrada:
   - Para cada valor lido para o vetor A, verifique se é par.
   - Para cada valor lido para o vetor B, verifique se é ímpar.

3. Construção do Vetor C:
   - Combine os elementos dos vetores A e B para formar o vetor C.

4. Exibição dos Vetores:
   - Apresente os elementos dos vetores A, B e C.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetorA, vetorB
vetorC = []
PARA i DE 0 ATÉ 5 FAÇA
    valor = LER "Digite um valor par para o vetor A: "
    ENQUANTO valor for ímpar FAÇA
        valor = LER "Valor inválido! Digite um valor par para o vetor A: "
    ADICIONAR valor À vetorA
    valor = LER "Digite um valor ímpar para o vetor B: "
    ENQUANTO valor for par FAÇA
        valor = LER "Valor inválido! Digite um valor ímpar para o vetor B: "
    ADICIONAR valor À vetorB
PARA i DE 0 ATÉ 5 FAÇA
    ADICIONAR vetorA[i] À vetorC
    ADICIONAR vetorB[i] À vetorC
EXIBIR "Vetor A:", vetorA
EXIBIR "Vetor B:", vetorB
EXIBIR "Vetor C:", vetorC
```
