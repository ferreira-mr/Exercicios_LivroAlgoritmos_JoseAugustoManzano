# 📝 Exercício 172: Pesquisa Sequencial em Vetor com Função

## 📖 Descrição
Escreva um programa que use uma função de busca sequencial para retornar a posição de uma chave em um vetor de 5 inteiros ou -1 caso não seja encontrada.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 5 inteiros para o vetor e 1 para pesquisa.
2. Processamento:
   - Crie a função buscar(V, chave). Ela deve varrer o vetor comparando cada elemento e retornar o índice ao achar, ou -1 ao final.
3. Saída de Dados:
   - Apresente o índice ou -1.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 10, 20, 30, 40, 50 (vetor), 30
  - Saída: 2
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao buscar(V, chave)
  PARA i DE 0 ATE 4 FAÇA
    SE V[i] == chave ENTÃO retorne i FIM SE
  FIM PARA
  retorne -1
fim_funcao
```
