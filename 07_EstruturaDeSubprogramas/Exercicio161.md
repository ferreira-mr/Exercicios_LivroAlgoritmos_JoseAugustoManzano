# 📝 Exercício 161: Potenciação por Multiplicações Sucessivas

## 📖 Descrição
Escreva um programa que calcule a potência base^expoente utilizando uma função que realize multiplicações sucessivas (sem usar operadores nativos de potência).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite a base (inteiro) e o expoente (inteiro não negativo).
2. Processamento:
   - Crie a função calcular_potencia(b, e) executando multiplicações repetidas por b em um laço executado e vezes.
3. Saída de Dados:
   - Apresente o resultado da potência.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 2, 5
  - Saída: 32
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao calcular_potencia(b, e)
  res = 1
  PARA i DE 1 ATE e FAÇA
    res = res * b
  FIM PARA
  retorne res
fim_funcao
```
