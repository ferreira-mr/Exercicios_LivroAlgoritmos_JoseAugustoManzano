# 📝 Exercício 45: Verificação de Ano Bissexto

## 📖 Descrição
Escreva um programa que leia um ano inteiro e informe se ele é bissexto ou não (bissexto é divisível por 4 e não por 100, ou divisível por 400).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o ano (valor inteiro).
2. Processamento:
   - Verifique a regra de ano bissexto usando operadores lógicos e de resto de divisão.
3. Saída de Dados:
   - Apresente 'bissexto' ou 'nao bissexto'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 2024
  - Saída: bissexto
- Exemplo 2:
  - Entrada: 1900
  - Saída: nao bissexto
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: ano
PROCESSAMENTO:
  SE (ano % 4 == 0 E ano % 100 != 0) OU (ano % 400 == 0) ENTÃO
    exibir "bissexto"
  SENÃO
    exibir "nao bissexto"
  FIM SE
```
