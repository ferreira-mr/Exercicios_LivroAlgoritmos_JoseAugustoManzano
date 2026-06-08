# 📝 Exercício 156: Localizador de Ponto de Sela

## 📖 Descrição
Escreva um programa que leia uma matriz 3x3 de números inteiros e encontre o ponto de sela (um elemento que é o menor de sua linha e o maior de sua coluna). Apresente o elemento e sua coordenada ou a mensagem de que não possui.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 inteiros da matriz.
2. Processamento:
   - Para cada posição A[i][j], verifique se ele é o menor valor na linha i e o maior valor na coluna j.
3. Saída de Dados:
   - Apresente o valor e a posição (linha e coluna) do ponto de sela, ou 'nao possui ponto de sela'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 5, 6, 7, 4, 9, 8, 1, 2, 3
  - Saída: Ponto de sela: 5 na posição (0, 0)
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[3][3]
PROCESSAMENTO:
  achou = falso
  PARA i DE 0 ATE 2 FAÇA
    PARA j DE 0 ATE 2 FAÇA
      val = A[i][j]
      // Ver se é menor da linha
      menor_linha = verdadeiro
      PARA k DE 0 ATE 2 FAÇA
        SE A[i][k] < val ENTÃO menor_linha = falso FIM SE
      FIM PARA
      // Ver se é maior da coluna
      maior_coluna = verdadeiro
      PARA k DE 0 ATE 2 FAÇA
        SE A[k][j] > val ENTÃO maior_coluna = falso FIM SE
      FIM PARA
      SE menor_linha E maior_coluna ENTÃO
        exibir val, i, j
        achou = verdadeiro
      FIM SE
    FIM PARA
  FIM PARA
  SE achou == falso ENTÃO exibir "nao possui ponto de sela" FIM SE
```
