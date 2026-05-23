# 📝 Exercício 84: Construção de uma Segunda Matriz a partir de um Vetor

## 📖 Descrição
Escreva um programa que leia um vetor com seis elementos do tipo real. O programa deve construir uma segunda matriz em que cada posição de índice par no primeiro vetor deve ser atribuído às índices impares e os índices ímpares do primeiro vetor nos índices pares do segundo.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Leia os seis elementos para o vetor.
   - Aguarde a entrada dos valores.

2. Construção do Vetor Resultante:
   - Para cada elemento de índice i no vetor, verifique se o índice é par ou ímpar.
   - Se for par, adicione o elemento na posição ímpar no vetor resultante; se for ímpar, adicione na posição par.

3. Exibição do Vetor Resultante:
   - Apresente os elementos do vetor resultante.

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: vetor
vetor_resultante = []
PARA i DE 0 ATÉ 5 FAÇA
    SE i % 2 == 0 ENTÃO
        ADICIONAR vetor[i] À posição i+1 EM vetor_resultante
    SENÃO
        ADICIONAR vetor[i] À posição i-1 EM vetor_resultante
EXIBIR "Vetor resultante:", vetor_resultante
```
