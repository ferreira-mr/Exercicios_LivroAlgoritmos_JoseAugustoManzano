# 📝 Exercício 160: Varredura de Campo Minado

## 📖 Descrição
Escreva um programa que leia uma matriz 3x3 de campo minado (9 para minas, 0 para vazios) e exiba a quantidade de minas adjacentes para cada célula vazia.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 inteiros correspondentes ao tabuleiro.
2. Processamento:
   - Para cada célula da matriz resultante, se a célula original for 9, mantenha 9. Se for 0, conte quantas minas (9) existem nas células adjacentes (considerando limites da matriz).
3. Saída de Dados:
   - Apresente os 9 valores da matriz resultante.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 9, 0, 0, 0, 9, 0, 0, 0, 0
  - Saída: 9, 2, 1, 2, 9, 1, 1, 1, 1
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: M[3][3]
PROCESSAMENTO:
  PARA i DE 0 ATE 2 FAÇA
    PARA j DE 0 ATE 2 FAÇA
      SE M[i][j] == 9 ENTÃO
        R[i][j] = 9
      SENÃO
        minas = 0
        PARA di DE -1 ATE 1 FAÇA
          PARA dj DE -1 ATE 1 FAÇA
            ni = i + di
            nj = j + dj
            SE ni >= 0 E ni <= 2 E nj >= 0 E nj <= 2 ENTÃO
              SE M[ni][nj] == 9 ENTÃO minas = minas + 1 FIM SE
            FIM SE
          FIM PARA
        FIM PARA
        R[i][j] = minas
      FIM SE
    FIM PARA
  FIM PARA
SAÍDA: exibir R
```
