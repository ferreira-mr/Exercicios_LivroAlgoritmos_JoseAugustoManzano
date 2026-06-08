# 📝 Exercício 126: Remoção de Elementos Duplicados

## 📖 Descrição
Escreva um programa que leia um vetor de 10 elementos inteiros e remova todas as duplicatas, preenchendo as posições vazias no final com zeros.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 10 elementos inteiros.
2. Processamento:
   - Crie um vetor auxiliar. Copie os elementos do primeiro apenas se eles não estiverem no vetor de destino. Preencha os índices restantes com zero.
3. Saída de Dados:
   - Apresente o vetor processado.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 2, 3, 3, 3, 4, 4, 4, 4
  - Saída: 1, 2, 3, 4, 0, 0, 0, 0, 0, 0
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: vetor[10]
PROCESSAMENTO:
  dest[10] = {0,0,0,0,0,0,0,0,0,0}
  cont = 0
  PARA i DE 0 ATE 9 FAÇA
    achou = falso
    PARA j DE 0 ATE cont - 1 FAÇA
      SE dest[j] == vetor[i] ENTÃO achou = verdadeiro FIM SE
    FIM PARA
    SE achou == falso ENTÃO
      dest[cont] = vetor[i]
      cont = cont + 1
    FIM SE
  FIM PARA
SAÍDA: exibir dest[0] a dest[9]
```
