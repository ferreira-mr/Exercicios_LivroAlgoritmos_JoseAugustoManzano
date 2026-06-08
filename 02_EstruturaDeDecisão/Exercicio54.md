# 📝 Exercício 54: Cálculo de Imposto de Renda Retido na Fonte (IRRF)

## 📖 Descrição
Escreva um programa que calcule o imposto sobre o salário bruto: Até R$ 2259.20 é Isento; De R$ 2259.21 até R$ 2826.65 alíquota de 7.5% (dedução R$ 169.44); De R$ 2826.66 até R$ 3751.05 alíquota de 15% (dedução R$ 381.44); De R$ 3751.06 até R$ 4664.68 alíquota de 22.5% (dedução R$ 662.77); Acima disso alíquota de 27.5% (dedução R$ 896.00).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o valor do salário bruto.
2. Processamento:
   - Identifique a faixa da alíquota aplicável, multiplique o salário pela taxa e subtraia a respectiva parcela a deduzir.
3. Saída de Dados:
   - Apresente o valor do imposto calculado com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 2000.00
  - Saída: 0.00
- Exemplo 2:
  - Entrada: 2500.00
  - Saída: 18.06
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: bruto
PROCESSAMENTO:
  SE bruto <= 2259.20 ENTÃO
    imposto = 0.0
  SENÃO SE bruto <= 2826.65 ENTÃO
    imposto = (bruto * 0.075) - 169.44
  SENÃO SE bruto <= 3751.05 ENTÃO
    imposto = (bruto * 0.15) - 381.44
  SENÃO SE bruto <= 4664.68 ENTÃO
    imposto = (bruto * 0.225) - 662.77
  SENÃO
    imposto = (bruto * 0.275) - 896.00
  FIM SE
SAÍDA: exibir imposto
```
