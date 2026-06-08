# 📝 Exercício 78: Inversão de Número Inteiro

## 📖 Descrição
Escreva um programa que leia um número inteiro positivo e exiba-o invertido (de trás para frente).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número inteiro positivo.
2. Processamento:
   - Extraia os dígitos sequencialmente usando resto de divisão por 10 e monte o número invertido multiplicando o acumulador atual por 10 e somando o novo dígito.
3. Saída de Dados:
   - Apresente o número invertido.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1234
  - Saída: 4321
- Exemplo 2:
  - Entrada: 509
  - Saída: 905
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: num
PROCESSAMENTO:
  invertido = 0
  ENQUANTO num > 0 FAÇA
    digito = num % 10
    invertido = (invertido * 10) + digito
    num = num / 10
  FIM ENQUANTO
SAÍDA: exibir invertido
```
