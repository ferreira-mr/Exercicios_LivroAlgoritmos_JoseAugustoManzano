# 📝 Exercício 165: Ordenação de Vetor com Procedimento

## 📖 Descrição
Escreva um programa que ordene um vetor de 5 inteiros de forma crescente por meio de um procedimento de ordenação.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 5 números inteiros para o vetor.
2. Processamento:
   - Crie o procedimento ordenar(V). Dentro dele, execute o algoritmo Bubble Sort para ordenar os elementos por referência.
3. Saída de Dados:
   - Apresente o vetor ordenado.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 5, 3, 1, 4, 2
  - Saída: 1, 2, 3, 4, 5
   
## 💻 Exemplo em Pseudocódigo
```plaintext
procedimento ordenar(ref V)
  PARA i DE 0 ATE 3 FAÇA
    PARA j DE i+1 ATE 4 FAÇA
      SE V[i] > V[j] ENTÃO
        temp = V[i]; V[i] = V[j]; V[j] = temp
      FIM SE
    FIM PARA
  FIM PARA
fim_procedimento
// Principal
ordenar(V)
exibir V
```
