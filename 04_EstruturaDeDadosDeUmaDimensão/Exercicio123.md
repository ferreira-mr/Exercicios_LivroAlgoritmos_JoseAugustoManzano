# 📝 Exercício 123: Intersecção de Vetores

## 📖 Descrição
Escreva um programa que leia dois vetores A e B de 5 inteiros cada e crie um vetor C contendo os elementos comuns sem repetições. Caso não haja sobreposição, informe 'vazio'.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 5 números para o vetor A e 5 números para o vetor B.
2. Processamento:
   - Verifique elemento por elemento se está presente em A e B. Certifique-se de não adicionar repetidos no vetor C.
3. Saída de Dados:
   - Apresente os elementos comuns em C ou a mensagem 'vazio'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3, 4, 5 (A), 3, 4, 5, 6, 7 (B)
  - Saída: 3, 4, 5
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: A[5], B[5]
PROCESSAMENTO:
  cont = 0
  PARA i DE 0 ATE 4 FAÇA
    val = A[i]
    // Ver se val está em B
    achou_em_B = falso
    PARA j DE 0 ATE 4 FAÇA
      SE B[j] == val ENTÃO achou_em_B = verdadeiro FIM SE
    FIM PARA
    SE achou_em_B ENTÃO
      // Ver se val já está no vetor C para evitar repetições
      repetido = falso
      PARA k DE 0 ATE cont - 1 FAÇA
        SE C[k] == val ENTÃO repetido = verdadeiro FIM SE
      FIM PARA
      SE repetido == falso ENTÃO
        C[cont] = val
        cont = cont + 1
      FIM SE
    FIM SE
  FIM PARA
SAÍDA:
  SE cont == 0 ENTÃO
    exibir "vazio"
  SENÃO
    exibir C[0] a C[cont-1]
  FIM SE
```
