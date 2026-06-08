# 📝 Exercício 128: Simulador de Busca Binária

## 📖 Descrição
Escreva um programa que leia um vetor de 10 inteiros, ordene-o, leia um valor chave de pesquisa e execute o algoritmo de busca binária para exibir a posição do elemento ou -1 se não for encontrado.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 10 inteiros para o vetor e 1 inteiro para pesquisar.
2. Processamento:
   - Ordene o vetor. Defina as variáveis de busca esq = 0 e dir = 9. Repita enquanto esq <= dir: meio = (esq + dir) / 2. Se for igual ao valor, pare. Se for menor, dir = meio - 1. Se for maior, esq = meio + 1.
3. Saída de Dados:
   - Apresente o índice (0 a 9) onde o valor foi encontrado, ou -1.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 9, 3, 7, 1, 5, 8, 2, 0, 4, 6 (vetor), 5
  - Saída: 5
- Exemplo 2:
  - Entrada: 9, 3, 7, 1, 5, 8, 2, 0, 4, 6 (vetor), 10
  - Saída: -1
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: vetor[10], chave
PROCESSAMENTO:
  // Ordenar (Bubble Sort)
  PARA i DE 0 ATE 8 FAÇA
    PARA j DE i+1 ATE 9 FAÇA
      SE vetor[i] > vetor[j] ENTÃO
        temp = vetor[i]; vetor[i] = vetor[j]; vetor[j] = temp
      FIM SE
    FIM PARA
  FIM PARA
  // Busca binária
  esq = 0; dir = 9; pos = -1
  ENQUANTO esq <= dir FAÇA
    meio = (esq + dir) / 2
    SE vetor[meio] == chave ENTÃO
      pos = meio
      INTERROMPER
    SENÃO SE vetor[meio] < chave ENTÃO
      esq = meio + 1
    SENÃO
      dir = meio - 1
    FIM SE
  FIM ENQUANTO
SAÍDA: exibir pos
```
