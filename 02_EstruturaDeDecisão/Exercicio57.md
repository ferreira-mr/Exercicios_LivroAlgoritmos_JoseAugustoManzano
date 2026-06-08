# 📝 Exercício 57: Validador de Data

## 📖 Descrição
Escreva um programa que leia o dia, o mês e o ano de uma data e determine se ela é válida ou não. Considere as regras de anos bissextos para o mês de fevereiro.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o dia, o mês e o ano (valores inteiros).
2. Processamento:
   - Valide se o ano está correto (maior que 0). Valide o mês (entre 1 e 12). Valide o dia de acordo com o mês correspondente, tratando fevereiro para anos bissextos (divisível por 4 e não por 100, ou divisível por 400).
3. Saída de Dados:
   - Apresente se a data é 'valida' ou 'invalida'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 29, 2, 2020
  - Saída: valida
- Exemplo 2:
  - Entrada: 29, 2, 2021
  - Saída: invalida
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: dia, mes, ano
PROCESSAMENTO:
  bissexto = (ano % 4 == 0 E ano % 100 != 0) OU (ano % 400 == 0)
  valida = falso
  SE mes >= 1 E mes <= 12 ENTÃO
    SE mes == 1 OU mes == 3 OU mes == 5 OU mes == 7 OU mes == 8 OU mes == 10 OU mes == 12 ENTÃO
      SE dia >= 1 E dia <= 31 ENTÃO valida = verdadeiro FIM SE
    SENÃO SE mes == 4 OU mes == 6 OU mes == 9 OU mes == 11 ENTÃO
      SE dia >= 1 E dia <= 30 ENTÃO valida = verdadeiro FIM SE
    SENÃO SE mes == 2 ENTÃO
      limite = 28
      SE bissexto ENTÃO limite = 29 FIM SE
      SE dia >= 1 E dia <= limite ENTÃO valida = verdadeiro FIM SE
    FIM SE
  FIM SE
SAÍDA: SE valida ENTÃO exibir "valida" SENÃO exibir "invalida" FIM SE
```
