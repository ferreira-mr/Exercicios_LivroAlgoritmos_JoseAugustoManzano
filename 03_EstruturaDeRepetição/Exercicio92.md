# 📝 Exercício 92: Conversor de Decimal para Binário

## 📖 Descrição
Escreva um programa que leia um número inteiro positivo na base decimal e o converta para a base binária usando divisões sucessivas por 2 (sem usar funções prontas de conversão).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número inteiro positivo.
2. Processamento:
   - Enquanto o número for maior que 0, obtenha o resto da divisão por 2, adicione ao acumulador binário multiplicando o resto por uma variável que controla a casa decimal posicional (1, 10, 100, 1000, etc.), e realize a divisão inteira por 2.
3. Saída de Dados:
   - Apresente a representação binária resultante.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 13
  - Saída: 1101
- Exemplo 2:
  - Entrada: 25
  - Saída: 11001
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: decimal
PROCESSAMENTO:
  binario = 0
  posicao = 1
  SE decimal == 0 ENTÃO
    binario = 0
  SENÃO
    ENQUANTO decimal > 0 FAÇA
      resto = decimal % 2
      binario = binario + (resto * posicao)
      posicao = posicao * 10
      decimal = decimal / 2
    FIM ENQUANTO
  FIM SE
SAÍDA: exibir binario
```
