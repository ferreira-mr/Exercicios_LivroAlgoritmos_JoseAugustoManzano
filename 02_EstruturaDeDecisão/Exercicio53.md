# 📝 Exercício 53: Classificação de Triângulos

## 📖 Descrição
Escreva um programa que leia três valores reais representando os lados de um triângulo. Verifique se eles formam um triângulo válido (a soma de dois lados é sempre maior que o terceiro). Se for válido, classifique-o em Equilátero, Isósceles ou Escaleno. Caso contrário, exiba 'inválido'.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite três valores reais para os lados de um triângulo.
2. Processamento:
   - Verifique se (a < b + c) e (b < a + c) e (c < a + b). Se sim, verifique se a = b e b = c (Equilátero), ou se a = b ou b = c ou a = c (Isósceles), ou caso contrário (Escaleno). Se não formarem triângulo, exiba 'inválido'.
3. Saída de Dados:
   - Apresente a classificação correspondente.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 3, 4, 5
  - Saída: escaleno
- Exemplo 2:
  - Entrada: 5, 5, 5
  - Saída: equilatero
- Exemplo 3:
  - Entrada: 1, 2, 3
  - Saída: invalido
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: a, b, c
PROCESSAMENTO:
  SE (a < b + c) E (b < a + c) E (c < a + b) ENTÃO
    SE (a == b) E (b == c) ENTÃO
      exibir "equilatero"
    SENÃO SE (a == b) OU (b == c) OU (a == c) ENTÃO
      exibir "isoceles"
    SENÃO
      exibir "escaleno"
    FIM SE
  SENÃO
    exibir "invalido"
  FIM SE
```
