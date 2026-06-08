# 📝 Exercício 162: Conversor de Temperatura com Procedimento

## 📖 Descrição
Escreva um programa que use um procedimento para converter uma temperatura dada em Celsius para Fahrenheit.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite a temperatura em Celsius (real).
2. Processamento:
   - Crie o procedimento converter_c_para_f(C, F), que recebe C por valor e F por referência. Calcule F = C * 1.8 + 32.
3. Saída de Dados:
   - Apresente a temperatura em Fahrenheit com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 25.0
  - Saída: 77.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
procedimento converter_c_para_f(c, ref f)
  f = c * 1.8 + 32
fim_procedimento
// Principal
converter_c_para_f(c, f)
exibir f
```
