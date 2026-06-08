# 📝 Exercício 173: Verificador de Perfeito com Função

## 📖 Descrição
Escreva um programa que use uma função para determinar se um número inteiro positivo é perfeito.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número inteiro positivo.
2. Processamento:
   - Crie a função e_perfeito(n) calculando a soma dos divisores e retornando verdadeiro se for igual a n, e falso caso contrário.
3. Saída de Dados:
   - Apresente 'perfeito' ou 'nao perfeito'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 6
  - Saída: perfeito
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao e_perfeito(n)
  soma = 0
  PARA i DE 1 ATE n/2 FAÇA
    SE n % i == 0 ENTÃO soma = soma + i FIM SE
  FIM PARA
  retorne soma == n
fim_funcao
```
