# 📝 Exercício 42: Conversor de Notas em Conceitos

## 📖 Descrição
Escreva um programa que leia uma nota escolar de 0 a 10 e informe o conceito equivalente: A (nota >= 9), B (7.5 <= nota < 9), C (6 <= nota < 7.5), D (4 <= nota < 6) e F (nota < 4).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite a nota do aluno (valor real de 0 a 10).
2. Processamento:
   - Compare a nota informada com as faixas de corte estabelecidas e atribua o respectivo conceito.
3. Saída de Dados:
   - Apresente o conceito correspondente (A, B, C, D ou F).
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 9.5
  - Saída: A
- Exemplo 2:
  - Entrada: 3.5
  - Saída: F
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: nota
PROCESSAMENTO:
  SE nota >= 9.0 ENTÃO
    conceito = "A"
  SENÃO SE nota >= 7.5 ENTÃO
    conceito = "B"
  SENÃO SE nota >= 6.0 ENTÃO
    conceito = "C"
  SENÃO SE nota >= 4.0 ENTÃO
    conceito = "D"
  SENÃO
    conceito = "F"
  FIM SE
SAÍDA: exibir conceito
```
