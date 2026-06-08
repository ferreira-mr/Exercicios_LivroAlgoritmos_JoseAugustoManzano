# 📝 Exercício 171: Soma de Faixa em Matriz com Função

## 📖 Descrição
Escreva um programa que use uma função para calcular a soma de todos os elementos contidos em uma faixa de linhas de uma matriz 3x3.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 9 inteiros da matriz e os limites da faixa de linhas (início e fim, indexados de 0 a 2).
2. Processamento:
   - Crie a função somar_faixa(M, inicio, fim). Ela deve somar as células M[i][j] onde i varia de inicio até fim e j varia de 0 a 2.
3. Saída de Dados:
   - Apresente o valor total acumulado.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5, 6, 7, 8, 9 (matriz), 0, 1 (faixa)
  - Saída: 21
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao somar_faixa(M, inicio, fim)
  s = 0
  PARA i DE inicio ATE fim FAÇA
    PARA j DE 0 ATE 2 FAÇA
      s = s + M[i][j]
    FIM PARA
  FIM PARA
  retorne s
fim_funcao
```
