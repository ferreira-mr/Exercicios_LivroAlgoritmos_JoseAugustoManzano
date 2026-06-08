# 📝 Exercício 31: Divisor de Cédulas

## 📖 Descrição
Escreva um programa que leia um valor inteiro em reais (R$) e determine a menor quantidade de cédulas de 100, 50, 20, 10, 5, 2 e 1 necessárias para obter esse valor.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um valor numérico inteiro correspondente à quantia em dinheiro.
2. Processamento:
   - Decomponha o valor dividindo sucessivamente pelos valores das cédulas (100, 50, 20, 10, 5, 2 e 1), utilizando divisão inteira e resto de divisão para passar o saldo para a próxima cédula.
3. Saída de Dados:
   - Apresente a quantidade de cédulas de cada valor obtida.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 389
  - Saída: 3 cédulas de R$100, 1 cédula de R$50, 1 cédula de R$20, 1 cédula de R$10, 1 cédula de R$5, 2 cédulas de R$2, 0 cédula de R$1
- Exemplo 2:
  - Entrada: 72
  - Saída: 0 cédula de R$100, 1 cédula de R$50, 1 cédula de R$20, 0 cédula de R$10, 0 cédula de R$5, 1 cédula de R$2, 0 cédula de R$1
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: valor
PROCESSAMENTO:
  n100 = valor / 100
  resto = valor % 100
  n50 = resto / 50
  resto = resto % 50
  n20 = resto / 20
  resto = resto % 20
  n10 = resto / 10
  resto = resto % 10
  n5 = resto / 5
  resto = resto % 5
  n2 = resto / 2
  n1 = resto % 2
SAÍDA: exibir n100, n50, n20, n10, n5, n2, n1
```
