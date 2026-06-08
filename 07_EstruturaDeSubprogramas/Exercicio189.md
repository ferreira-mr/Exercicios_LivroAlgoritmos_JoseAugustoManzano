# 📝 Exercício 189: Processador de Transações Bancárias

## 📖 Descrição
Escreva um programa que utilize registros para gerenciar as contas de 3 clientes (conta, titular, saldo) e use subprogramas para depositar, sacar (validando limite) e exibir ordenado por saldo de forma decrescente.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite o cadastro das 3 contas, seguido por uma conta de saque com valor e uma de depósito com valor.
2. Processamento:
   - Crie registros. Implemente subprogramas de saque, depósito e ordenação de contas.
3. Saída de Dados:
   - Apresente a listagem final de titulares e saldos de forma ordenada.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 101, Alice, 1000.00, 102, Bob, 500.00, 103, Charlie, 2000.00, 102, 200.00 (saque), 101, 500.00 (deposito)
  - Saída: Charlie (2000.00), Alice (1500.00), Bob (300.00)
   
## 💻 Exemplo em Pseudocódigo
```plaintext
estrutura conta_bancaria
  numero: inteiro
  titular: texto
  saldo: real
fim_estrutura
// Subprogramas depositar, sacar, exibir_ordenado
// Principal
cadastrar_contas(contas)
sacar(contas, num_saque, val_saque)
depositar(contas, num_dep, val_dep)
exibir_ordenado_saldo(contas)
```
