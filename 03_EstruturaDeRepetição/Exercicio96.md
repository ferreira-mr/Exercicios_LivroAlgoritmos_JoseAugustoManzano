# 📝 Exercício 96: Gerador de Primos em um Intervalo

## 📖 Descrição
Escreva um programa que leia dois limites inteiros A e B e apresente todos os números primos existentes no intervalo [A, B] e a soma deles.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os valores inteiros limites A e B.
2. Processamento:
   - Com um laço de A até B, verifique para cada número se ele é primo. Em caso afirmativo, exiba o número e acrescente-o a um somatório acumulado.
3. Saída de Dados:
   - Apresente os números primos da faixa e a soma total.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 10, 20
  - Saída: 11, 13, 17, 19, Soma: 60
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: a, b
PROCESSAMENTO:
  soma = 0
  PARA n DE a ATE b PASSO 1 FAÇA
    SE n > 1 ENTÃO
      primo = verdadeiro
      PARA i DE 2 ATE n / 2 PASSO 1 FAÇA
        SE n % i == 0 ENTÃO
          primo = falso
          INTERROMPER
        FIM SE
      FIM PARA
      SE primo ENTÃO
        exibir n
        soma = soma + n
      FIM SE
    FIM SE
  FIM PARA
SAÍDA: exibir soma
```
