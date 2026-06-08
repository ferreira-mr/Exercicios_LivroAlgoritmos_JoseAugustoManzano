# 📝 Exercício 29: Área e Perímetro do Hexágono Regular

## 📖 Descrição
Escreva um programa que leia o comprimento do lado de um hexágono regular e apresente o seu perímetro e a sua área aproximada (considere a aproximação de raiz quadrada de 3 como 1.732).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o valor do lado do hexágono regular.
2. Processamento:
   - O perímetro é lado * 6. A área é (3 * lado^2 * 1.732) / 2.
3. Saída de Dados:
   - Apresente o perímetro e a área com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 5
  - Saída: Perímetro: 30.00, Área: 64.95
- Exemplo 2:
  - Entrada: 10
  - Saída: Perímetro: 60.00, Área: 259.80
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: lado
PROCESSAMENTO:
  perimetro = lado * 6
  area = (3 * (lado * lado) * 1.732) / 2
SAÍDA: exibir perimetro, area
```
