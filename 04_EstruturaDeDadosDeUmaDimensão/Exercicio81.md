# 📝 Exercício 81: Junção de Vetores com Validação de Entrada

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia dois vetores. O primeiro vetor deve aceitar apenas a entrada de valores divisíveis por 2 ou 3, enquanto o segundo vetor deve aceitar apenas a entrada de valores que não sejam múltiplos de 5. A entrada deve ser validada pelo programa. Em seguida, o programa deve construir um terceiro vetor que seja a junção dos outros dois.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os elementos para o vetor 1, aceitando apenas valores divisíveis por 2 ou 3.
   - Leia os elementos para o vetor 2, aceitando apenas valores que não sejam múltiplos de 5.
   - Aguarde a entrada dos valores.

2. Validação da Entrada:
   - Para cada valor lido para o vetor 1, verifique se é divisível por 2 ou 3.
   - Para cada valor lido para o vetor 2, verifique se não é múltiplo de 5.

3. Construção do Vetor 3:
   - Combine os elementos dos vetores 1 e 2 para formar o vetor 3.

4. Exibição dos Vetores:
   - Apresente os elementos dos vetores 1, 2 e 3.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetor1, vetor2
vetor3 = []
PARA i DE 0 ATÉ 9 FAÇA
    valor = LER "Digite um valor divisível por 2 ou 3 para o vetor 1: "
    ENQUANTO valor % 2 != 0 E valor % 3 != 0 FAÇA
        valor = LER "Valor inválido! Digite um valor divisível por 2 ou 3 para o vetor 1: "
    ADICIONAR valor À vetor1
    valor = LER "Digite um valor que não seja múltiplo de 5 para o vetor 2: "
    ENQUANTO valor % 5 == 0 FAÇA
        valor = LER "Valor inválido! Digite um valor que não seja múltiplo de 5 para o vetor 2: "
    ADICIONAR valor À vetor2
PARA i DE 0 ATÉ 9 FAÇA
    ADICIONAR vetor1[i] À vetor3
    ADICIONAR vetor2[i] À vetor3
EXIBIR "Vetor 1:", vetor1
EXIBIR "Vetor 2:", vetor2
EXIBIR "Vetor 3:", vetor3
```
