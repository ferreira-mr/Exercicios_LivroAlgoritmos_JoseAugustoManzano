# 📝 Exercício 127: Junção Ordenada de Dois Vetores

## 📖 Descrição
Escreva um programa que leia dois vetores A e B de 5 elementos cada (previamente ordenados) e crie um vetor C de 10 elementos contendo a junção de ambos mantendo a ordenação crescente (algoritmo Merge).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os 5 elementos de A e depois 5 de B (em ordem).
2. Processamento:
   - Use três índices: i (para A), j (para B) e k (para C). Compare A[i] e B[j], adicione o menor em C[k] e incremente o respectivo índice. Quando um vetor acabar, copie o restante do outro.
3. Saída de Dados:
   - Apresente o vetor final C.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 3, 5, 7, 9 (A), 2, 4, 6, 8, 10 (B)
  - Saída: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[5], B[5]
PROCESSAMENTO:
  i = 0; j = 0; k = 0
  ENQUANTO i < 5 E j < 5 FAÇA
    SE A[i] < B[j] ENTÃO
      C[k] = A[i]; i = i + 1
    SENÃO
      C[k] = B[j]; j = j + 1
    FIM SE
    k = k + 1
  FIM ENQUANTO
  ENQUANTO i < 5 FAÇA
    C[k] = A[i]; i = i + 1; k = k + 1
  FIM ENQUANTO
  ENQUANTO j < 5 FAÇA
    C[k] = B[j]; j = j + 1; k = k + 1
  FIM ENQUANTO
SAÍDA: exibir C[0] a C[9]
```
