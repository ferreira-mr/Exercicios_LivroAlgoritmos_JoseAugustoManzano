# 📝 Exercício 186: Simplificação de Fração

## 📖 Descrição
Escreva um programa que represente uma fração (numerador e denominador) usando registros e use uma função para simplificar a fração dividindo-os pelo MDC de ambos.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o numerador e o denominador da fração.
2. Processamento:
   - Crie o registro Fracao. Implemente a função de calcular MDC e a função simplificar(F) retornando um novo registro Fracao com os valores simplificados.
3. Saída de Dados:
   - Apresente a fração simplificada no formato numerador, denominador.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 8, 12
  - Saída: 2, 3
   
## 💻 Exemplo em Pseudocódigo
```plaintext
estrutura fracao
  num: inteiro
  den: inteiro
fim_estrutura
// Subprogramas obter_mdc, simplificar
// Principal
F_simples = simplificar(F)
exibir F_simples.num, F_simples.den
```
