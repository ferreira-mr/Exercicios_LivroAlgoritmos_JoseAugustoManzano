# 📝 Exercício 93: Conversão de Temperaturas

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia uma matriz com quatro linhas e cinco colunas, contendo temperaturas em Celsius, e então crie uma segunda matriz com os valores de cada elemento da primeira matriz convertidos em Fahrenheit.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia a matriz com quatro linhas e cinco colunas contendo temperaturas em Celsius.
   - Aguarde a entrada do usuário.

2. Inicialização da Matriz Fahrenheit:
   - Inicialize a matriz Fahrenheit com as mesmas dimensões da matriz original.

3. Conversão para Fahrenheit:
   - Para cada elemento da matriz original, converta de Celsius para Fahrenheit e armazene na matriz Fahrenheit.

4. Saída de Dados:
   - Apresente as duas matrizes: a original e a Fahrenheit.

## 💻 Exemplo em Pseudocódigo

```plaintext

matrizCelsius = lerMatriz(4, 5) // função para ler matriz com 4 linhas e 5 colunas
matrizFahrenheit = novaMatriz(4, 5) // função para criar nova matriz com 4 linhas e 5 colunas

PARA cada linha i da matrizCelsius FAÇA
    PARA cada coluna j da matrizCelsius FAÇA
        matrizFahrenheit[i][j] = converterParaFahrenheit(matrizCelsius[i][j])

EXIBIR "Matriz Celsius:"
EXIBIR matrizCelsius

EXIBIR "Matriz Fahrenheit:"
EXIBIR matrizFahrenheit
```
