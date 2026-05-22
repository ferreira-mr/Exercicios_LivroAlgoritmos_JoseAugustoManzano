# 📝 Exercício 74: Análise de Temperaturas em Graus Celsius

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia 20 elementos (valores reais) para temperaturas em graus Celsius e armazene esses valores em um vetor. O programa ao final deve apresentar a menor, a maior e a média das temperaturas.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia as 20 temperaturas em graus Celsius.
   - Aguarde a entrada dos valores.

2. Inicialização:
   - Inicialize as variáveis para a menor temperatura, a maior temperatura e a soma das temperaturas.

3. Cálculo das Estatísticas:
   - Para cada temperatura, atualize a menor e a maior temperatura, e adicione o valor à soma das temperaturas.

4. Exibição dos Resultados:
   - Apresente a menor temperatura, a maior temperatura e a média das temperaturas.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetorTemperaturas
menorTemperatura = INFINITO
maiorTemperatura = -INFINITO
somaTemperaturas = 0
PARA i DE 0 ATÉ 19 FAÇA
    SE vetorTemperaturas[i] < menorTemperatura ENTÃO
        menorTemperatura = vetorTemperaturas[i]
    SE vetorTemperaturas[i] > maiorTemperatura ENTÃO
        maiorTemperatura = vetorTemperaturas[i]
    somaTemperaturas = somaTemperaturas + vetorTemperaturas[i]
mediaTemperaturas = somaTemperaturas / 20
EXIBIR "Menor temperatura:", menorTemperatura
EXIBIR "Maior temperatura:", maiorTemperatura
EXIBIR "Média das temperaturas:", mediaTemperaturas
```
