# 📝 Exercício 191: Sistema de Notas de Alunos

## 📖 Descrição
Escreva um programa que gerencie 5 alunos (nome, matricula, vetor de 3 notas) usando registros e subprogramas para cadastrar, calcular a média ponderada (pesos 2, 3 e 5), classificar em ordem decrescente de média e exibir os alunos acima de 7.0.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dados de 5 alunos.
2. Processamento:
   - Crie registros. Implemente subprogramas de média, ordenação e filtragem.
3. Saída de Dados:
   - Apresente os alunos com as respectivas médias ordenados e depois os alunos com média >= 7.0.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: Ana, 101, 7, 8, 9, Bia, 102, 6, 6, 6, Cid, 103, 8, 9, 10, Duo, 104, 5, 5, 5, Eva, 105, 7.5, 8.5, 9.5
  - Saída: Cid (9.10), Eva (8.80), Ana (8.30), Bia (6.00), Duo (5.00), Aprovados: Cid, Eva, Ana
   
## 💻 Exemplo em Pseudocódigo
```plaintext
estrutura aluno
  nome: texto
  matricula: inteiro
  notas: vetor_real[3]
  media: real
fim_estrutura
// Subprogramas calcular_medias, ordenar, exibir_aprovados
// Principal
cadastrar_alunos(sala)
calcular_medias(sala)
ordenar_alunos(sala)
exibir_ordenado(sala)
exibir_aprovados(sala)
```
