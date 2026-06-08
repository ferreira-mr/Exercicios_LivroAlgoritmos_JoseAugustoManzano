# 📝 Exercício 188: Sistema de Inventário de Produtos

## 📖 Descrição
Escreva um programa de controle de estoque que armazene 5 produtos em uma estrutura de registro (codigo, nome, quantidade, preco) e use subprogramas para cadastrar, calcular o valor total acumulado e exibir ordenados por nome.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dados para 5 produtos (código, nome, quantidade e preço).
2. Processamento:
   - Crie registros. Crie o procedimento cadastrar(produtos), a função calcular_total(produtos) somando quantidade * preço de todos, e o procedimento exibir_ordenado(produtos) ordenando por nome e listando.
3. Saída de Dados:
   - Apresente o valor total do inventário e a listagem ordenada de nomes.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, B, 10, 10.00, 2, A, 5, 20.00, 3, D, 2, 50.00, 4, C, 1, 100.00, 5, E, 4, 25.00
  - Saída: Total: 500.00, Produtos: A, B, C, D, E
   
## 💻 Exemplo em Pseudocódigo
```plaintext
estrutura produto
  codigo: inteiro
  nome: texto
  quantidade: inteiro
  preco: real
fim_estrutura
// Subprogramas cadastrar, calcular_total, ordenar_nomes
// Principal
cadastrar(estoque)
total = calcular_total(estoque)
exibir total
ordenar_e_exibir(estoque)
```
