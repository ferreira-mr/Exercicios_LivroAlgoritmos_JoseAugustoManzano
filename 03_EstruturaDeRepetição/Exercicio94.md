# 📝 Exercício 94: Algoritmo da Raiz Quadrada por Método Babilônico

## 📖 Descrição
Escreva um programa que estime a raiz quadrada de um número real positivo S pelo Método Babilônico com exatamente 10 iterações.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite um número real positivo S.
2. Processamento:
   - Defina o palpite inicial x = S / 2. A cada uma das 10 iterações, atualize o palpite com a fórmula x = (x + S / x) / 2.
3. Saída de Dados:
   - Apresente o resultado final com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 25
  - Saída: 5.00
- Exemplo 2:
  - Entrada: 2
  - Saída: 1.41
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: s
PROCESSAMENTO:
  x = s / 2.0
  PARA i DE 1 ATE 10 PASSO 1 FAÇA
    x = (x + s / x) / 2.0
  FIM PARA
SAÍDA: exibir x
```
