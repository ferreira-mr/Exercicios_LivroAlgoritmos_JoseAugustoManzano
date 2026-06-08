# 📝 Exercício 124: Estatísticas de Vetor

## 📖 Descrição
Escreva um programa que leia um vetor de 10 números inteiros, ordene o vetor e apresente a média aritmética, a mediana e a moda (o valor que mais se repete; se houver mais de um, exiba qualquer um deles).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 10 números inteiros e armazene em um vetor.
2. Processamento:
   - Calcule a média aritmética. Ordene o vetor de forma crescente. A mediana será a média dos elementos nas posições 4 e 5. A moda será encontrada contando a repetição de cada valor.
3. Saída de Dados:
   - Apresente a média e mediana com 2 casas decimais, e a moda.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 2, 3, 4, 5, 6, 7, 8, 9
  - Saída: Média: 4.70, Mediana: 4.50, Moda: 2
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: vetor[10]
PROCESSAMENTO:
  soma = 0
  PARA i DE 0 ATE 9 FAÇA
    soma = soma + vetor[i]
  FIM PARA
  media = soma / 10.0
  // Ordenar (Bubble Sort)
  PARA i DE 0 ATE 8 FAÇA
    PARA j DE i+1 ATE 9 FAÇA
      SE vetor[i] > vetor[j] ENTÃO
        temp = vetor[i]
        vetor[i] = vetor[j]
        vetor[j] = temp
      FIM SE
    FIM PARA
  FIM PARA
  mediana = (vetor[4] + vetor[5]) / 2.0
  // Moda
  moda = vetor[0]
  max_repeticoes = 1
  PARA i DE 0 ATE 9 FAÇA
    repeticoes = 0
    PARA j DE 0 ATE 9 FAÇA
      SE vetor[i] == vetor[j] ENTÃO
        repeticoes = repeticoes + 1
      FIM SE
    FIM PARA
    SE repeticoes > max_repeticoes ENTÃO
      max_repeticoes = repeticoes
      moda = vetor[i]
    FIM SE
  FIM PARA
SAÍDA: exibir media, mediana, moda
```
