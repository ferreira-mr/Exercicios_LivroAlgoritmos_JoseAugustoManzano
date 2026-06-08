# 📝 Exercício 91: Verificador de Número Perfeito

## 📖 Descrição
Escreva um programa que leia um número inteiro positivo e informe se ele é um número perfeito (um número é perfeito se a soma de seus divisores próprios positivos, exceto ele mesmo, for igual a ele).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número inteiro positivo.
2. Processamento:
   - Com um laço de 1 até a metade do número, encontre todos os divisores do número e acumule a soma deles. Ao final, compare se a soma é igual ao número original.
3. Saída de Dados:
   - Apresente 'perfeito' ou 'nao perfeito'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 6
  - Saída: perfeito
- Exemplo 2:
  - Entrada: 12
  - Saída: nao perfeito
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: num
PROCESSAMENTO:
  soma = 0
  PARA i DE 1 ATE num / 2 PASSO 1 FAÇA
    SE num % i == 0 ENTÃO
      soma = soma + i
    FIM SE
  FIM PARA
SAÍDA: SE soma == num ENTÃO exibir "perfeito" SENÃO exibir "nao perfeito" FIM SE
```
