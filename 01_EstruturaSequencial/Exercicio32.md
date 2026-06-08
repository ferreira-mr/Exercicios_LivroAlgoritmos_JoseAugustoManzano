# 📝 Exercício 32: Cálculo de Salário Líquido com Salário Família

## 📖 Descrição
Escreva um programa que leia a quantidade de horas trabalhadas, o valor da hora, o percentual de desconto do INSS (ex: 11) e a quantidade de dependentes. Sabendo que o salário família por dependente é R$ 35.00, calcule o salário bruto, o desconto do INSS, o acréscimo do salário família e o salário líquido final.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite as horas trabalhadas, o valor da hora, a taxa do INSS e a quantidade de dependentes.
2. Processamento:
   - Calcule o salário bruto (horas * valor_hora). Calcule o valor do desconto do INSS (salario_bruto * taxa_inss / 100). Calcule o salário família (dependentes * 35.00). Calcule o salário líquido (salario_bruto - desconto_inss + salario_familia).
3. Saída de Dados:
   - Apresente o salário bruto, o desconto do INSS, o salário família e o salário líquido final.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 160, 25.00, 11, 2
  - Saída: Bruto: 4000.00, Desconto: 440.00, Família: 70.00, Líquido: 3630.00
- Exemplo 2:
  - Entrada: 200, 50.00, 12, 0
  - Saída: Bruto: 10000.00, Desconto: 1200.00, Família: 0.00, Líquido: 8800.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: horas, valor_hora, taxa_inss, dependentes
PROCESSAMENTO:
  bruto = horas * valor_hora
  desconto = bruto * (taxa_inss / 100)
  familia = dependentes * 35.00
  liquido = bruto - desconto + familia
SAÍDA: exibir bruto, desconto, familia, liquido
```
