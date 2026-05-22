# 📝 Exercício 50: Sequência de Fibonacci

## 📖 Descrição
Este exercício consiste em desenvolver um programa que apresente os valores da sequência numérica de Fibonacci até o décimo quinto termo.

## 🚶 Passo a Passo

1. Inicialização dos Termos:
   - Defina os dois primeiros termos da sequência como 0 e 1.

2. Geração dos Termos:
   - Utilize um loop enquanto para gerar os próximos termos da sequência de Fibonacci.
   - Cada termo subsequente é a soma dos dois termos anteriores.
   - Continue gerando termos até alcançar o décimo quinto termo.

3. Saída de Dados:
   - Exiba os valores dos termos da sequência até o décimo quinto termo.

## 💻 Exemplo em Pseudocódigo

```plaintext
termo1 = 0
termo2 = 1
EXIBIR termo1
EXIBIR termo2
i = 3
ENQUANTO i <= 15 FAÇA
    proximo_termo = termo1 + termo2
    EXIBIR proximo_termo
    termo1 = termo2
    termo2 = proximo_termo
    i = i + 1
```
