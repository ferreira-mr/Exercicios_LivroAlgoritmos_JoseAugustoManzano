# 📝 Exercício 60: Classificador Completo de Triângulos

## 📖 Descrição
Escreva um programa que leia três valores de lados, valide a formação de um triângulo e apresente sua dupla classificação conjunta: de lados (Equilátero, Isósceles ou Escaleno) e de ângulos (Retângulo, Obtusângulo ou Acutângulo).

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite três valores de lados reais.
2. Processamento:
   - Verifique a validade do triângulo. Caso seja válido, obtenha a classificação por lados e a classificação por ângulos (ordenando os lados para achar o maior) e junte-as.
3. Saída de Dados:
   - Apresente a string combinada, ex: 'escaleno retangulo', ou 'invalido'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 3, 4, 5
  - Saída: escaleno retangulo
- Exemplo 2:
  - Entrada: 5, 5, 5
  - Saída: equilatero acutangulo
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: l1, l2, l3
PROCESSAMENTO:
  SE (l1 < l2 + l3) E (l2 < l1 + l3) E (l3 < l1 + l2) ENTÃO
    // Lados
    SE l1 == l2 E l2 == l3 ENTÃO t_lado = "equilatero"
    SENÃO SE l1 == l2 OU l2 == l3 OU l1 == l3 ENTÃO t_lado = "isoceles"
    SENÃO t_lado = "escaleno"
    FIM SE
    // Angulos
    a = l1; b = l2; c = l3
    SE l2 > a ENTÃO a = l2; b = l1; c = l3 FIM SE
    SE l3 > a ENTÃO a = l3; b = l1; c = l2 FIM SE
    SE a*a == (b*b + c*c) ENTÃO t_ang = "retangulo"
    SENÃO SE a*a > (b*b + c*c) ENTÃO t_ang = "obtusangulo"
    SENÃO t_ang = "acutangulo"
    FIM SE
    exibir t_lado, " ", t_ang
  SENÃO
    exibir "invalido"
  FIM SE
```
