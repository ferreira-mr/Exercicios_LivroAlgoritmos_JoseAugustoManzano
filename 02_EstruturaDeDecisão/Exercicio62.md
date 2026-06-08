# 📝 Exercício 62: Verificador de Interseção de Intervalos

## 📖 Descrição
Escreva um programa que leia os limites de dois intervalos fechados [A, B] e [C, D] (onde A <= B e C <= D) e determine o intervalo correspondente à interseção entre eles ou a mensagem 'sem intersecao'.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os valores reais A, B, C e D.
2. Processamento:
   - A interseção de dois intervalos fechados existe se o início do segundo for menor ou igual ao fim do primeiro, e o início do primeiro for menor ou igual ao fim do segundo. Os limites da interseção são max(A, C) e min(B, D).
3. Saída de Dados:
   - Apresente o intervalo de interseção no formato '[limite_inf, limite_sup]' ou a mensagem 'sem intersecao'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 5, 3, 7
  - Saída: [3, 5]
- Exemplo 2:
  - Entrada: 10, 20, 25, 30
  - Saída: sem intersecao
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: a, b, c, d
PROCESSAMENTO:
  inicio = a
  SE c > a ENTÃO inicio = c FIM SE
  fim = b
  SE d < b ENTÃO fim = d FIM SE
  SE inicio <= fim ENTÃO
    exibir "[", inicio, ", ", fim, "]"
  SENÃO
    exibir "sem intersecao"
  FIM SE
```
