# 📝 Exercício 77: Soma de Dígitos de um Número

## 📖 Descrição
Escreva um programa que leia um número inteiro positivo e exiba a soma de todos os seus dígitos individuais.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número inteiro positivo.
2. Processamento:
   - Enquanto o número for maior que 0, extraia o último dígito usando o resto da divisão por 10, some-o a uma variável acumuladora e divida o número por 10 (divisão inteira) para descartar o dígito processado.
3. Saída de Dados:
   - Apresente a soma total calculada.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1234
  - Saída: 10
- Exemplo 2:
  - Entrada: 905
  - Saída: 14
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: num
PROCESSAMENTO:
  soma = 0
  ENQUANTO num > 0 FAÇA
    digito = num % 10
    soma = soma + digito
    num = num / 10
  FIM ENQUANTO
SAÍDA: exibir soma
```
