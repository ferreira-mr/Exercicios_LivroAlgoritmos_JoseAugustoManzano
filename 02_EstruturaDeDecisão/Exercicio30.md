# 📝 Exercício 30: Cálculo da Média e Verificação de Aprovação com Exame

## 📖 Descrição
Este exercício consiste em desenvolver um programa que leia os valores de
quatro notas bimestrais de um aluno, calcule a média aritmética e verifique
a aprovação do aluno. Se a média for maior que 7, o aluno é aprovado.
Caso contrário, solicite a nota do exame para calcular a nova média. Se a
nova média for maior que 5, o aluno é aprovado em exame. Caso contrário, é
reprovado.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira os valores das quatro notas bimestrais
     do aluno.
   - Aguarde a entrada do usuário.

2. Processamento:
   - Calcule a média aritmética das quatro notas.
   - Verifique se a média é maior que 7. Se sim, o aluno está aprovado.
   - Caso contrário, solicite a nota do exame e calcule a nova média.
   - Verifique se a nova média é maior que 5 para determinar se o aluno foi
     aprovado em exame.

3. Saída de Dados:
   - Apresente a média calculada e a situação do aluno (aprovado, exame ou
     reprovado).

## 🧪 Exemplos

- Exemplo 1:
  - Entrada: 6, 7, 5, 8
  - Saída: Média: 6.5, Aprovado

- Exemplo 2:
  - Entrada: 4, 6, 3, 5
  - Saída: Média: 4.5, Exame

- Exemplo 3:
  - Entrada: 8, 9, 7, 8
  - Saída: Média: 8.0, Aprovado

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: nota1, nota2, nota3, nota4
PROCESSAMENTO:
  - media = (nota1 + nota2 + nota3 + nota4) / 4
  - SE media > 7
      - exibir "Média:", media, "Aprovado"
  - SENÃO SE media >= 5
      - exibir "Média:", media, "Exame"
  - SENÃO
      - exibir "Média:", media, "Reprovado"
```
