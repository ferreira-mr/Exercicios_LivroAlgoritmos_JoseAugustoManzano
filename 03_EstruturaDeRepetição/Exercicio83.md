# 📝 Exercício 83: Verificador de Números Primos

## 📖 Descrição
Escreva um programa que leia um número inteiro positivo e informe se ele é um número primo ou não.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um valor inteiro positivo.
2. Processamento:
   - Verifique se o número é divisível por algum outro além de 1 e dele mesmo, fazendo um laço de repetição de 2 até a metade do número (ou raiz quadrada).
3. Saída de Dados:
   - Apresente se o número é 'primo' ou 'nao primo'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 7
  - Saída: primo
- Exemplo 2:
  - Entrada: 4
  - Saída: nao primo
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: num
PROCESSAMENTO:
  SE num <= 1 ENTÃO
    primo = falso
  SENÃO
    primo = verdadeiro
    PARA i DE 2 ATE num / 2 PASSO 1 FAÇA
      SE num % i == 0 ENTÃO
        primo = falso
        INTERROMPER
      FIM SE
    FIM PARA
  FIM SE
SAÍDA: SE primo ENTÃO exibir "primo" SENÃO exibir "nao primo" FIM SE
```
