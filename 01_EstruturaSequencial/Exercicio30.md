# 📝 Exercício 30: Conversor de Tempo Detalhado

## 📖 Descrição
Escreva um programa que leia um valor inteiro em segundos e o converta para o formato de horas, minutos e segundos.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um valor inteiro correspondente ao total de segundos.
2. Processamento:
   - Calcule a quantidade de horas dividindo os segundos por 3600 (divisão inteira). Calcule o restante dos segundos e divida por 60 para obter os minutos (divisão inteira). O resto dessa última divisão corresponderá aos segundos restantes.
3. Saída de Dados:
   - Apresente os valores de horas, minutos e segundos obtidos.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 3665
  - Saída: 1, 1, 5
- Exemplo 2:
  - Entrada: 7200
  - Saída: 2, 0, 0
- Exemplo 3:
  - Entrada: 59
  - Saída: 0, 0, 59
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: segundos_total
PROCESSAMENTO:
  horas = segundos_total / 3600
  resto = segundos_total % 3600
  minutos = resto / 60
  segundos = resto % 60
SAÍDA: exibir horas, minutos, segundos
```
