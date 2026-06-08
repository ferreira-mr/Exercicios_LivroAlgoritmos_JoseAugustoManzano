# 📝 Exercício 155: Verificador de Quadrado Mágico

## 📖 Descrição
Escreva um programa que leia uma matriz 3x3 de números inteiros e verifique se ela representa um quadrado mágico (soma das linhas, colunas e diagonais é a mesma).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 elementos inteiros da matriz.
2. Processamento:
   - Calcule a soma da primeira linha como referência. Em seguida, calcule a soma de cada linha, coluna e das duas diagonais. Se todas baterem com a referência, é quadrado mágico.
3. Saída de Dados:
   - Apresente 'quadrado magico' e a soma correspondente, ou 'nao quadrado magico'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 8, 1, 6, 3, 5, 7, 4, 9, 2
  - Saída: quadrado magico, 15
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[3][3]
PROCESSAMENTO:
  magico = verdadeiro
  soma_ref = A[0][0] + A[0][1] + A[0][2]
  // Linhas
  PARA i DE 0 ATE 2 FAÇA
    s = A[i][0] + A[i][1] + A[i][2]
    SE s != soma_ref ENTÃO magico = falso FIM SE
  FIM PARA
  // Colunas
  PARA j DE 0 ATE 2 FAÇA
    s = A[0][j] + A[1][j] + A[2][j]
    SE s != soma_ref ENTÃO magico = falso FIM SE
  FIM PARA
  // Diagonais
  s_d1 = A[0][0] + A[1][1] + A[2][2]
  s_d2 = A[0][2] + A[1][1] + A[2][0]
  SE s_d1 != soma_ref OU s_d2 != soma_ref ENTÃO magico = falso FIM SE
SAÍDA: SE magico ENTÃO exibir "quadrado magico", soma_ref SENÃO exibir "nao quadrado magico" FIM SE
```
