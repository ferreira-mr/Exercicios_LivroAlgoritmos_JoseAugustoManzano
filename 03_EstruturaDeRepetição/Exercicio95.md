# 📝 Exercício 95: Verificador de Anagramas Numéricos

## 📖 Descrição
Escreva um programa que verifique se dois números inteiros positivos contêm exatamente os mesmos dígitos com as mesmas frequências sem usar vetores.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite dois números inteiros positivos.
2. Processamento:
   - Para cada dígito de 0 a 9, conte quantas vezes ele aparece no primeiro número e quantas vezes aparece no segundo número por meio de laços e operações de divisão/resto. Se todas as frequências baterem, é um anagrama.
3. Saída de Dados:
   - Apresente 'anagrama' ou 'nao anagrama'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1232, 2321
  - Saída: anagrama
- Exemplo 2:
  - Entrada: 112, 122
  - Saída: nao anagrama
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: num1, num2
PROCESSAMENTO:
  anagrama = verdadeiro
  PARA d DE 0 ATE 9 PASSO 1 FAÇA
    c1 = 0; temp1 = num1
    ENQUANTO temp1 > 0 FAÇA
      SE temp1 % 10 == d ENTÃO c1 = c1 + 1 FIM SE
      temp1 = temp1 / 10
    FIM ENQUANTO
    c2 = 0; temp2 = num2
    ENQUANTO temp2 > 0 FAÇA
      SE temp2 % 10 == d ENTÃO c2 = c2 + 1 FIM SE
      temp2 = temp2 / 10
    FIM ENQUANTO
    SE c1 != c2 ENTÃO
      anagrama = falso
      INTERROMPER
    FIM SE
  FIM PARA
SAÍDA: SE anagrama ENTÃO exibir "anagrama" SENÃO exibir "nao anagrama" FIM SE
```
