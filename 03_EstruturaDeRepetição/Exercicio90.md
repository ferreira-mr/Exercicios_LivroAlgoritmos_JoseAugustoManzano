# 📝 Exercício 90: Sequência da Conjectura de Collatz

## 📖 Descrição
Escreva um programa que leia um número inteiro positivo e apresente a sequência de Collatz a partir dele até chegar a 1 (se o termo for par divide por 2, se for ímpar multiplica por 3 e soma 1). Exiba também o número total de termos.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número inteiro positivo.
2. Processamento:
   - Em um laço, enquanto o valor for maior que 1, verifique se ele é par ou ímpar, aplicando a respectiva transformação matemática, acumulando e exibindo cada número intermediário e contando os termos.
3. Saída de Dados:
   - Apresente os termos da sequência e o total de termos gerados.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 6
  - Saída: 6, 3, 10, 5, 16, 8, 4, 2, 1, Total: 9
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: n
PROCESSAMENTO:
  cont = 1
  exibir n
  ENQUANTO n > 1 FAÇA
    SE n % 2 == 0 ENTÃO
      n = n / 2
    SENÃO
      n = n * 3 + 1
    FIM SE
    exibir n
    cont = cont + 1
  FIM ENQUANTO
SAÍDA: exibir cont
```
