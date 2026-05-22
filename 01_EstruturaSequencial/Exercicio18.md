# 📝 Exercício 18: Apuração de Votos em uma Eleição Sindical

## 📖 Descrição
Este exercício consiste em desenvolver um programa que faça a leitura da
quantidade de votos válidos para cada candidato, além da quantidade de votos
nulos e em branco, calcule o número total de eleitores, o percentual
correspondente de votos válidos dos candidatos e de votos brancos e nulos, e
exiba esses resultados.

## 🚶 Passo a Passo

1. Entrada de Dados:
   - Solicite ao usuário que insira a quantidade de votos válidos para cada
     candidato.
   - Solicite ao usuário que insira a quantidade de votos nulos.
   - Solicite ao usuário que insira a quantidade de votos em branco.
   - Aguarde a entrada do usuário.

2. Processamento:
   - Calcule o número total de eleitores somando os votos válidos, nulos e
     em branco.
   - Calcule o percentual de votos válidos para cada candidato e o total de
     votos nulos e em branco.

3. Saída de Dados:
   - Exiba o número total de eleitores.
   - Exiba o percentual de votos válidos para cada candidato.
   - Exiba o percentual de votos nulos.
   - Exiba o percentual de votos em branco.

## 🧪 Exemplos

- Exemplo 1:
  - ENTRADA: Votos válidos para o candidato 1 = 200, candidato 2 = 150,
    candidato 3 = 100; Votos nulos = 50; Votos em branco = 30
  - SAÍDA: Total de eleitores: 530;
           Percentual de votos válidos:
           candidato 1 = 37.74%,
           candidato 2 = 28.30%,
           candidato 3 = 18.87%;
           Percentual de votos nulos: 9.43%;
           Percentual de votos em branco: 5.66%

- Exemplo 2:
  - ENTRADA: Votos válidos para o candidato 1 = 300, candidato 2 = 180,
    candidato 3 = 120; Votos nulos = 20; Votos em branco = 40
  - SAÍDA: Total de eleitores: 660;
           Percentual de votos válidos:
           candidato 1 = 45.45%,
           candidato 2 = 27.27%,
           candidato 3 = 18.18%;
           Percentual de votos nulos: 3.03%;
           Percentual de votos em branco: 6.06%

- Exemplo 3:
  - ENTRADA: Votos válidos para o candidato 1 = 150, candidato 2 = 100,
    candidato 3 = 50; Votos nulos = 30; Votos em branco = 20
  - SAÍDA: Total de eleitores: 350;
           Percentual de votos válidos:
           candidato 1 = 42.86%,
           candidato 2 = 28.57%,
           candidato 3 = 14.29%;
           Percentual de votos nulos: 8.57%;
           Percentual de votos em branco: 5.71%

## 💻 Exemplo em Pseudocódigo

```plaintext
ENTRADA: votos_candidato1, votos_candidato2, votos_candidato3, votos_nulos,
         votos_branco
PROCESSAMENTO: total_eleitores = votos_candidato1 + votos_candidato2 +
                votos_candidato3 + votos_nulos + votos_branco
               percentual_candidato1 = (votos_candidato1 / total_eleitores) * 100
               percentual_candidato2 = (votos_candidato2 / total_eleitores) * 100
               percentual_candidato3 = (votos_candidato3 / total_eleitores) * 100
               percentual_nulos = (votos_nulos / total_eleitores) * 100
               percentual_branco = (votos_branco / total_eleitores) * 100
SAÍDA: exibir "Total de eleitores: " + total_eleitores + ";
       Percentual de votos válidos:
       candidato 1 = " + percentual_candidato1 + "%,
       candidato 2 = " + percentual_candidato2 + "%,
       candidato 3 = " + percentual_candidato3 + "%,
       Percentual de votos nulos: " + percentual_nulos + "%,
       Percentual de votos em branco: " + percentual_branco + "%,
```
