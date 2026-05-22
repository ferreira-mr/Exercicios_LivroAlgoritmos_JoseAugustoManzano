# 📝 Exercício 54: Somatório e Média de Dez Valores

## 📖 Descrição
Este programa lê dez valores numéricos reais e, ao final, apresenta o somatório e a média dos valores lidos.

## 🚶 Passo a Passo

1. Inicialização do Somatório e Contador:
   - Inicialize uma variável "somatorio" com valor zero para armazenar o somatório.
   - Inicialize uma variável "contador" com valor zero para contar o número de valores lidos.

2. Laço de Iteração:
   - Inicie um laço de iteração que continua enquanto o "contador" for menor que dez.
   - Dentro do laço, solicite ao usuário que insira um valor numérico real.
   - Adicione o valor lido ao somatório.
   - Incremente o contador.

3. Cálculo da Média:
   - Calcule a média dos valores lidos dividindo o somatório pelo número total de valores (neste caso, dez).

4. Saída de Dados:
   - Apresente o somatório e a média dos valores lidos.

## 💻 Exemplo em Pseudocódigo

```plaintext
INICIALIZAR somatorio COM 0
INICIALIZAR contador COM 0
ENQUANTO contador < 10 FAÇA
    SOLICITAR valor
    somatorio = somatorio + valor
    contador = contador + 1
media = somatorio / 10
EXIBIR "Somatório: " + somatorio + ", Média: " + media
```
