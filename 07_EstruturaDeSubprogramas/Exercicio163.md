# 📝 Exercício 163: Maior Elemento de Vetor com Função

## 📖 Descrição
Escreva um programa que leia um vetor de 5 inteiros e utilize uma função para encontrar e retornar o maior elemento presente no vetor.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 5 elementos inteiros.
2. Processamento:
   - Crie a função obter_maior(V). Defina o primeiro elemento como maior e percorra o vetor comparando para encontrar o maior.
3. Saída de Dados:
   - Apresente o maior elemento.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 10, 34, 56, 2, 12
  - Saída: 56
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao obter_maior(V)
  maior = V[0]
  PARA i DE 1 ATE 4 FAÇA
    SE V[i] > maior ENTÃO maior = V[i] FIM SE
  FIM PARA
  retorne maior
fim_funcao
```
