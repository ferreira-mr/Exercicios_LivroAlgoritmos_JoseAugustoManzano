# 📝 Exercício 50: Cálculo de Índice de Massa Corporal (IMC)

## 📖 Descrição
Escreva um programa que leia o peso (em kg) e a altura (em metros) de uma pessoa, calcule o IMC (peso / altura^2) e o classifique nas faixas: Abaixo do peso (IMC < 18.5), Peso normal (18.5 <= IMC < 25), Sobrepeso (25 <= IMC < 30) e Obesidade (IMC >= 30).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o peso (kg) e a altura (m).
2. Processamento:
   - Calcule o IMC. Classifique o IMC obtido de acordo com as faixas fornecidas.
3. Saída de Dados:
   - Apresente o valor do IMC (com 2 casas decimais) e a classificação correspondente.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 70, 1.75
  - Saída: IMC: 22.86, Peso normal
- Exemplo 2:
  - Entrada: 90, 1.70
  - Saída: IMC: 31.14, Obesidade
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: peso, altura
PROCESSAMENTO:
  imc = peso / (altura * altura)
  SE imc < 18.5 ENTÃO
    class = "Abaixo do peso"
  SENÃO SE imc < 25 ENTÃO
    class = "Peso normal"
  SENÃO SE imc < 30 ENTÃO
    class = "Sobrepeso"
  SENÃO
    class = "Obesidade"
  FIM SE
SAÍDA: exibir imc, class
```
