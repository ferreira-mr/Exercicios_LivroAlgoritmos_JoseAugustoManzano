# 📝 Exercício 59: Divisão Inteira Sem Usar o Operador de Divisão

## 📖 Descrição
Este programa realiza a divisão inteira de dois números sem usar o operador aritmético de divisão.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira os dois números para divisão.
   - Aguarde a entrada do usuário.

2. Cálculo da Divisão Inteira:
   - Inicialize uma variável "resultado" com 0 para armazenar o resultado da divisão inteira.
   - Inicialize uma variável "dividendo" com o primeiro número informado pelo usuário.
   - Inicialize uma variável "divisor" com o segundo número informado pelo usuário.
   - Enquanto o "dividendo" for maior ou igual ao "divisor", subtraia o "divisor" do "dividendo" e incremente o "resultado" em 1.

3. Saída de Dados:
   - Apresente o resultado da divisão inteira.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: divisor, dividendo
INICIALIZAR resultado COM 0
INICIALIZAR dividendo COM valor informado pelo usuário
INICIALIZAR divisor COM valor informado pelo usuário
ENQUANTO dividendo >= divisor FAÇA
    dividendo = dividendo - divisor
    resultado = resultado + 1
EXIBIR "Resultado da divisão: ", resultado
```
