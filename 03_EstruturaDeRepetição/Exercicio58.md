# 📝 Exercício 58: Maior e Menor Valores entre Valores Positivos

## 📖 Descrição
Escreva um programa que leia valores positivos inteiros até que um valor negativo seja informado. Ao final, apresente o maior e o menor valores informados pelo usuário.

## 🚶 Passo a Passo

1. Inicialização dos Valores:
   - Inicialize as variáveis "maior" e "menor" com valores negativos, garantindo que o
primeiro valor positivo informado seja considerado como maior e menor.

2. Laço de Leitura dos Valores:
   - Inicie um laço de leitura que solicita ao usuário informar um valor.
   - Verifique se o valor é positivo:
     - Se for negativo, encerre o laço.
     - Se for positivo, compare-o com os valores atuais de "maior" e "menor" e atualize
essas variáveis, se necessário.

3. Saída de Dados:
   - Apresente o maior e o menor valores informados pelo usuário.

## 💻 Exemplo em Pseudocódigo

```plaintext
INICIALIZAR maior COM -1
INICIALIZAR menor COM -1
REPETIR
    SOLICITAR valor
    SE valor >= 0 ENTAO
        SE maior < valor ENTAO
            maior = valor
        FIM SE
        SE menor == -1 OU menor > valor ENTAO
            menor = valor
        FIM SE
    SENAO
        SAIR DO LAÇO
    FIM SE
ATÉ verdadeiro
EXIBIR "Maior valor: ", maior
EXIBIR "Menor valor: ", menor
```
