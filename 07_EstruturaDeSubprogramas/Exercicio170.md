# 📝 Exercício 170: Média de Notas com Função

## 📖 Descrição
Escreva um programa que leia três notas escolares de um aluno e use uma função para calcular a média. Exiba a aprovação (média >= 6) ou reprovação.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite três notas bimestrais reais.
2. Processamento:
   - Crie a função calcular_media(n1, n2, n3) retornando a média aritmética. No programa principal, verifique a média retornada para indicar aprovação ou reprovação.
3. Saída de Dados:
   - Apresente a média com 2 casas decimais e a mensagem 'aprovado' ou 'reprovado'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 7.0, 6.0, 8.0
  - Saída: 7.00, aprovado
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao calcular_media(n1, n2, n3)
  retorne (n1 + n2 + n3) / 3.0
fim_funcao
// Principal
m = calcular_media(n1, n2, n3)
exibir m
SE m >= 6.0 ENTÃO exibir "aprovado" SENÃO exibir "reprovado" FIM SE
```
