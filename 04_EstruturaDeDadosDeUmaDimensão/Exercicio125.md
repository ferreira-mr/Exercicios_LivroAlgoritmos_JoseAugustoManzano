# 📝 Exercício 125: Contagem de Frequência de Elementos

## 📖 Descrição
Escreva um programa que leia um vetor de 10 números inteiros na faixa de 1 a 10 e apresente a frequência de ocorrência de cada número.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 10 inteiros na faixa de 1 a 10 e guarde no vetor.
2. Processamento:
   - Use um vetor de frequências de tamanho 11 (iniciando com zeros). Percorra o vetor principal incrementando a posição correspondente ao valor lido no vetor de frequências.
3. Saída de Dados:
   - Apresente a frequência de ocorrência dos dígitos de 1 a 10.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 2, 2, 5, 5, 5, 8, 1, 1, 1, 1
  - Saída: Frequências: 1: 4, 2: 2, 3: 0, 4: 0, 5: 3, 6: 0, 7: 0, 8: 1, 9: 0, 10: 0
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: vetor[10]
PROCESSAMENTO:
  // Inicializar vetor freq com zeros
  PARA i DE 1 ATE 10 FAÇA
    freq[i] = 0
  FIM PARA
  PARA i DE 0 ATE 9 FAÇA
    val = vetor[i]
    freq[val] = freq[val] + 1
  FIM PARA
SAÍDA: exibir freq[1] a freq[10]
```
