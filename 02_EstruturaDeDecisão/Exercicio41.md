# 📝 Exercício 41: Classificação de Categoria de Atleta

## 📖 Descrição
Escreva um programa que leia a idade de um nadador e determine sua categoria correspondente: Infantil A (5 a 7 anos), Infantil B (8 a 10 anos), Juvenil A (11 a 13 anos), Juvenil B (14 a 17 anos), Adulto (18 anos ou mais), ou Sem categoria (menos de 5 anos).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite a idade do nadador (valor inteiro).
2. Processamento:
   - Verifique em qual categoria a idade se enquadra de forma sequencial-exclusiva.
3. Saída de Dados:
   - Apresente o nome da categoria obtida.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 6
  - Saída: Infantil A
- Exemplo 2:
  - Entrada: 25
  - Saída: Adulto
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: idade
PROCESSAMENTO:
  SE idade < 5 ENTÃO
    cat = "Sem categoria"
  SENÃO SE idade <= 7 ENTÃO
    cat = "Infantil A"
  SENÃO SE idade <= 10 ENTÃO
    cat = "Infantil B"
  SENÃO SE idade <= 13 ENTÃO
    cat = "Juvenil A"
  SENÃO SE idade <= 17 ENTÃO
    cat = "Juvenil B"
  SENÃO
    cat = "Adulto"
  FIM SE
SAÍDA: exibir cat
```
