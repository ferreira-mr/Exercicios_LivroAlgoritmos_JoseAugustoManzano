# 📝 Exercício 48: Tarifação de Estacionamento

## 📖 Descrição
Escreva um programa que leia o número de horas que um veículo permaneceu em um estacionamento e calcule o valor total devido: até 2 horas o valor é R$ 5.00 por hora; de 3 a 4 horas o valor é R$ 4.00 por hora; e a partir da 5ª hora o valor é R$ 3.00 por hora.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite a quantidade de horas permanecidas (valor inteiro).
2. Processamento:
   - Verifique o tempo de permanência e multiplique pelo valor da respectiva tarifa horária.
3. Saída de Dados:
   - Apresente o valor total devido com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 2
  - Saída: 10.00
- Exemplo 2:
  - Entrada: 3
  - Saída: 12.00
- Exemplo 3:
  - Entrada: 6
  - Saída: 18.00
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: horas
PROCESSAMENTO:
  SE horas <= 2 ENTÃO
    valor = horas * 5.00
  SENÃO SE horas <= 4 ENTÃO
    valor = horas * 4.00
  SENÃO
    valor = horas * 3.00
  FIM SE
SAÍDA: exibir valor
```
