# 📝 Exercício 76: Série de Termos Harmônicos

## 📖 Descrição
Escreva um programa que leia um valor inteiro N e apresente a soma dos N primeiros termos da série harmônica: S = 1 + 1/2 + 1/3 + ... + 1/N.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um valor inteiro positivo N.
2. Processamento:
   - Crie um laço de repetição com uma variável real acumulando a soma dos termos de 1 a N, adicionando 1.0/i a cada iteração.
3. Saída de Dados:
   - Apresente o resultado final com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1
  - Saída: 1.00
- Exemplo 2:
  - Entrada: 3
  - Saída: 1.83
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: n
PROCESSAMENTO:
  soma = 0.0
  PARA i DE 1 ATE n PASSO 1 FAÇA
    soma = soma + (1.0 / i)
  FIM PARA
SAÍDA: exibir soma
```
