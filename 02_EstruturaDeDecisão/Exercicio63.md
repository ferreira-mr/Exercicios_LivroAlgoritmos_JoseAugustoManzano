# 📝 Exercício 63: Simulador de Caixa Eletrônico

## 📖 Descrição
Escreva um programa que leia um valor inteiro de saque em reais. Verifique se o valor está dentro do limite permitido de R$ 10.00 a R$ 600.00. Em caso positivo, calcule e apresente a menor quantidade possível de notas de 100, 50, 10, 5 e 1 necessária.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o valor numérico inteiro do saque.
2. Processamento:
   - Verifique se o valor está entre 10 e 600. Se sim, decomponha dividindo sucessivamente por 100, 50, 10, 5 e 1 utilizando divisão inteira e restos.
3. Saída de Dados:
   - Apresente o total de notas de cada valor obtido ou 'saque invalido'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 256
  - Saída: 2 de R$100, 1 de R$50, 0 de R$10, 1 de R$5, 1 de R$1
- Exemplo 2:
  - Entrada: 8
  - Saída: saque invalido
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: valor
PROCESSAMENTO:
  SE valor >= 10 E valor <= 600 ENTÃO
    n100 = valor / 100
    resto = valor % 100
    n50 = resto / 50
    resto = resto % 50
    n10 = resto / 10
    resto = resto % 10
    n5 = resto / 5
    n1 = resto % 5
    exibir n100, n50, n10, n5, n1
  SENÃO
    exibir "saque invalido"
  FIM SE
```
