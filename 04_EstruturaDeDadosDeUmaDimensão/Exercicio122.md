# 📝 Exercício 122: Inversão de Vetor in-place

## 📖 Descrição
Escreva um programa que leia um vetor de 10 elementos inteiros e inverta a ordem dos elementos diretamente nele (sem utilizar um segundo vetor).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 10 elementos inteiros e armazene no vetor.
2. Processamento:
   - Percorra o vetor até a metade. Troque o elemento da posição i com o elemento da posição 9 - i utilizando uma variável auxiliar temporária.
3. Saída de Dados:
   - Apresente o vetor invertido.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  - Saída: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: vetor[10]
PROCESSAMENTO:
  PARA i DE 0 ATE 4 FAÇA
    temp = vetor[i]
    vetor[i] = vetor[9 - i]
    vetor[9 - i] = temp
  FIM PARA
SAÍDA: exibir vetor[0] a vetor[9]
```
