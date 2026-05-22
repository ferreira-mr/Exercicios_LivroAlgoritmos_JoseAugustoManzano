# 📝 Exercício 86: Contagem e Porcentagem de Números Ímpares em um Vetor

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia um vetor com dez elementos inteiros. O programa deve apresentar o total de elementos ímpares no vetor e também a porcentagem de números ímpares em relação ao total de elementos armazenados no vetor.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os dez elementos para o vetor.
   - Aguarde a entrada dos valores.

2. Contagem de Números Ímpares:
   - Para cada elemento do vetor, verifique se é ímpar e incremente o contador correspondente.

3. Cálculo da Porcentagem:
   - Calcule a porcentagem de números ímpares em relação ao total de elementos no vetor.

4. Exibição dos Resultados:
   - Apresente o total de números ímpares e a porcentagem.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetor
ímpares = 0
PARA i DE 0 ATÉ 9 FAÇA
    SE vetor[i] % 2 != 0 ENTÃO
        ímpares = ímpares + 1
total_elementos = 10
porcentagem = (ímpares / total_elementos) * 100
EXIBIR "Total de números ímpares:", ímpares
EXIBIR "Porcentagem de números ímpares:", porcentagem, "%"
```
