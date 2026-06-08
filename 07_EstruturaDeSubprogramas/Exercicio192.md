# 📝 Exercício 192: Sistema de Cadastro de Clientes e Busca por Código

## 📖 Descrição
Escreva um programa que gerencie 5 clientes (codigo, nome, email, telefone) e use subprogramas para ordenar os registros por código e realizar uma busca binária pelo código.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dados de 5 clientes, seguidos de 1 código para buscar.
2. Processamento:
   - Crie registros. Implemente subprogramas de ordenação por código e busca binária pelo código.
3. Saída de Dados:
   - Apresente os dados do cliente encontrado ou a mensagem 'nao encontrado'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 5, E, e@e, 555, 3, C, c@c, 333, 1, A, a@a, 111, 4, D, d@d, 444, 2, B, b@b, 222 (clientes), 3
  - Saída: C, c@c.com
   
## 💻 Exemplo em Pseudocódigo
```plaintext
estrutura cliente
  codigo: inteiro
  nome: texto
  email: texto
  telefone: texto
fim_estrutura
// Subprogramas ordenar, busca_binaria
// Principal
ordenar(cadastro)
pos = busca_binaria(cadastro, cod_busca)
SE pos != -1 ENTÃO exibir cadastro[pos] SENÃO exibir "nao encontrado" FIM SE
```
