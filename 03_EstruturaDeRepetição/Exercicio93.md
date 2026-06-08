# 📝 Exercício 93: Cálculo de Exponencial com Série de Taylor

## 📖 Descrição
Escreva um programa que estime a função exponencial e^x através dos 10 primeiros termos da Série de Taylor: e^x = 1 + x + x²/2! + x³/3! + ... + x^9/9!.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o valor real de x.
2. Processamento:
   - Calcule os termos de forma iterativa, mantendo a potência de x e o fatorial do termo atual atualizados dentro de um laço de repetição.
3. Saída de Dados:
   - Apresente o resultado aproximado com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1
  - Saída: 2.72
- Exemplo 2:
  - Entrada: 2
  - Saída: 7.38
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: x
PROCESSAMENTO:
  soma = 1.0
  termo = 1.0
  PARA i DE 1 ATE 9 PASSO 1 FAÇA
    termo = termo * x / i
    soma = soma + termo
  FIM PARA
SAÍDA: exibir soma
```
