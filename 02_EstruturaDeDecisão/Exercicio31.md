# 📝 Exercício 31: Resolução de Equação de Segundo Grau

## 📖 Descrição
Escreva um programa que leia três números inteiros "a", "b" e "c" referentes aos valores dos coeficientes da equação de segundo grau ax² + bx + c = 0 e resolva a equação.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira os valores dos coeficientes "a", "b" e "c".
   - Aguarde a entrada do usuário.

2. Processamento:
   - Calcule as raízes da equação de segundo grau utilizando a fórmula de
     Bhaskara: x = (-b ± √(b² - 4ac)) / 2a.

3. Saída de Dados:
   - Exiba as raízes da equação.

## 🧪 Exemplos

- Exemplo 1:
  - Entrada: a = 1, b = -3, c = -4
  - Saída: x1 = 4, x2 = -1 (raízes da equação)

- Exemplo 2:
  - Entrada: a = 2, b = -7, c = 3
  - Saída: x1 = 3, x2 = 0.5 (raízes da equação)

- Exemplo 3:
  - Entrada: a = 1, b = 0, c = -9
  - Saída: x1 = 3, x2 = -3 (raízes da equação)

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: a, b, c
PROCESSAMENTO:
  - delta = b² - 4ac
  - SE delta >= 0
      - x1 = (-b + √delta) / (2a)
      - x2 = (-b - √delta) / (2a)
      - exibir "x1 =", x1, "x2 =", x2, "(raízes da equação)"
  - SENÃO
      - exibir "Não existem raízes reais"
```
