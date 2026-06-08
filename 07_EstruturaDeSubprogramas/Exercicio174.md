# 📝 Exercício 174: Verificador de Ano Bissexto com Função

## 📖 Descrição
Escreva um programa que leia um ano e verifique se ele é bissexto por meio de uma função lógica.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o ano (valor inteiro).
2. Processamento:
   - Crie a função e_bissexto(ano) retornando verdadeiro se (ano%4 == 0 e ano%100 != 0) ou (ano%400 == 0).
3. Saída de Dados:
   - Apresente 'bissexto' ou 'nao bissexto'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 2004
  - Saída: bissexto
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao e_bissexto(ano)
  retorne (ano % 4 == 0 E ano % 100 != 0) OU (ano % 400 == 0)
fim_funcao
// Principal
SE e_bissexto(ano) ENTÃO exibir "bissexto" SENÃO exibir "nao bissexto" FIM SE
```
