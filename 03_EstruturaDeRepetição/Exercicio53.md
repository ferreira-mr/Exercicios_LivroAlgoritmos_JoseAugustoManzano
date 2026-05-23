# 📝 Exercício 53: Somatório da Fatorial de Quinze Valores

## 📖 Descrição
Escreva um programa que leia quinze valores numéricos inteiros e, ao final, apresente o somatório da fatorial de cada valor lido.

## 🚶 Passo a Passo

1. Inicialização do Somatório:
   - Inicialize uma variável "somatorio" com valor zero para armazenar o somatório.

2. Laço de Iteração:
   - Inicie um laço de iteração que percorre quinze vezes, representando os quinze valores a serem lidos.
   - Para cada valor lido, calcule sua fatorial.

3. Cálculo da Fatorial:
   - Para calcular a fatorial de um número, inicie uma variável "fatorial" com valor 1.
   - Utilize um segundo laço de iteração para multiplicar "fatorial" por cada número inteiro no intervalo de 1 até o número lido.

4. Atualização do Somatório:
   - Adicione o valor da fatorial calculada à variável "somatorio" a cada iteração.

5. Saída de Dados:
   - Apresente o valor do somatório total da fatorial dos quinze valores lidos.

## 💻 Exemplo em Pseudocódigo

```plaintext
INICIALIZAR somatorio COM 0
PARA cada valor DE 1 a 15 FAÇA
    INICIALIZAR fatorial COM 1
    PARA cada número DE 1 até valor FAÇA
        fatorial = fatorial * número
    somatorio = somatorio + fatorial
EXIBIR "Somatório da fatorial de cada valor lido: " + somatorio
```
