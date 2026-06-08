# 📝 Exercício 49: Reajuste Salarial por Faixa

## 📖 Descrição
Escreva um programa que leia o salário atual de um funcionário e calcule o novo salário ajustado com base na faixa salarial: aumento de 15% para salários até R$ 1500.00, aumento de 10% para salários acima de R$ 1500.00 e até R$ 3000.00, e aumento de 5% para salários acima de R$ 3000.00.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o salário atual (valor real).
2. Processamento:
   - Verifique em qual faixa o salário se enquadra e aplique a respectiva taxa de aumento.
3. Saída de Dados:
   - Apresente o novo salário reajustado com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1200
  - Saída: 1380.00
- Exemplo 2:
  - Entrada: 2000
  - Saída: 2200.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: salario
PROCESSAMENTO:
  SE salario <= 1500 ENTÃO
    novo = salario * 1.15
  SENÃO SE salario <= 3000 ENTÃO
    novo = salario * 1.10
  SENÃO
    novo = salario * 1.05
  FIM SE
SAÍDA: exibir novo
```
