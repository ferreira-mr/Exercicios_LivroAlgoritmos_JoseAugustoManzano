# 📝 Exercício 168: Soma de Vetores com Procedimento

## 📖 Descrição
Escreva um programa que leia dois vetores A e B de 5 inteiros. Crie um procedimento que some os elementos de mesma posição de A e B e salve no vetor C. Exiba o vetor C.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 5 inteiros para A e 5 para B.
2. Processamento:
   - Crie o procedimento somar_vetores(A, B, C). Dentro dele, percorra as posições fazendo C[i] = A[i] + B[i].
3. Saída de Dados:
   - Apresente os elementos do vetor C.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 10, 20, 30, 40, 50
  - Saída: 11, 22, 33, 44, 55
   
## 💻 Exemplo em Pseudocódigo
```plaintext
procedimento somar_vetores(A, B, C)
  PARA i DE 0 ATE 4 FAÇA
    C[i] = A[i] + B[i]
  FIM PARA
fim_procedimento
// Principal
somar_vetores(A, B, C)
exibir C
```
