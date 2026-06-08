# 📝 Exercício 47: Calculadora de Operações Básicas

## 📖 Descrição
Escreva um programa que leia dois números e um caractere representando uma operação aritmética (+, -, *, /). Se a operação for válida, execute-a e mostre o resultado; se for divisão por zero, exiba 'erro: divisao por zero'; para outras operações inválidas, exiba 'operacao invalida'.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dois números reais e um caractere representando o operador.
2. Processamento:
   - Utilize uma estrutura de decisão condicional para verificar a operação desejada e calcular o resultado correspondente, tratando o caso de divisão por zero.
3. Saída de Dados:
   - Apresente o resultado calculado com 2 casas decimais ou a respectiva mensagem de erro.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 10, 5, +
  - Saída: 15.00
- Exemplo 2:
  - Entrada: 10, 0, /
  - Saída: erro: divisao por zero
- Exemplo 3:
  - Entrada: 5, 4, x
  - Saída: operacao invalida
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: num1, num2, operacao
PROCESSAMENTO:
  SE operacao == "+" ENTÃO
    exibir num1 + num2
  SENÃO SE operacao == "-" ENTÃO
    exibir num1 - num2
  SENÃO SE operacao == "*" ENTÃO
    exibir num1 * num2
  SENÃO SE operacao == "/" ENTÃO
    SE num2 == 0 ENTÃO
      exibir "erro: divisao por zero"
    SENÃO
      exibir num1 / num2
    FIM SE
  SENÃO
    exibir "operacao invalida"
  FIM SE
```
