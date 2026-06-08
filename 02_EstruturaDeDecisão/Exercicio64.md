# 📝 Exercício 64: Equação do Segundo Grau com Raízes Complexas

## 📖 Descrição
Escreva um programa que resolva uma equação de segundo grau ax² + bx + c = 0, inclusive calculando raízes complexas se o delta for negativo.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os coeficientes a, b e c.
2. Processamento:
   - Se a for 0, não é uma equação de segundo grau. Caso contrário, calcule delta. Se delta for maior ou igual a 0, calcule as raízes normais. Se for negativo, obtenha a parte real e a parte imaginária e monte as representações complexas.
3. Saída de Dados:
   - Apresente as raízes reais ou no formato complexo 'real + imag i' e 'real - imag i'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, -2, 5
  - Saída: 1.00 + 2.00i, 1.00 - 2.00i
- Exemplo 2:
  - Entrada: 0, 2, 3
  - Saída: nao e equacao de segundo grau
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: a, b, c
PROCESSAMENTO:
  SE a == 0 ENTÃO
    exibir "nao e equacao de segundo grau"
  SENÃO
    delta = b*b - 4*a*c
    SE delta >= 0 ENTÃO
      x1 = (-b + raiz(delta)) / (2*a)
      x2 = (-b - raiz(delta)) / (2*a)
      exibir x1, x2
    SENÃO
      real = -b / (2*a)
      imag = raiz(-delta) / (2*a)
      exibir real, "+", imag, "i", real, "-", imag, "i"
    FIM SE
  FIM SE
```
