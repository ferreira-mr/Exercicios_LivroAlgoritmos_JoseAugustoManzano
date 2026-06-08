# 📝 Exercício 59: Validador de Triângulos e Tipo de Ângulos

## 📖 Descrição
Escreva um programa que determine se três lados formam um triângulo válido. Caso seja válido, classifique-o em: Retângulo (a² = b² + c²), Obtusângulo (a² > b² + c²) ou Acutângulo (a² < b² + c²), onde 'a' representa a medida do maior lado.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os três lados do triângulo.
2. Processamento:
   - Ordene os lados para identificar o maior (a) e os outros dois (b, c). Verifique a validade do triângulo. Em seguida, compare a² com b² + c² para classificar de acordo com as relações angulares.
3. Saída de Dados:
   - Apresente a classificação correspondente ou 'invalido'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 3, 4, 5
  - Saída: retangulo
- Exemplo 2:
  - Entrada: 6, 8, 12
  - Saída: obtusangulo
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: l1, l2, l3
PROCESSAMENTO:
  // Identificar maior lado como 'a'
  a = l1; b = l2; c = l3
  SE l2 > a ENTÃO a = l2; b = l1; c = l3 FIM SE
  SE l3 > a ENTÃO a = l3; b = l1; c = l2 FIM SE
  // Se a for l2 ou l3, garantir que b e c sejam os outros lados
  SE a == l2 ENTÃO b = l1; c = l3 FIM SE
  SE a == l3 ENTÃO b = l1; c = l2 FIM SE
  SE a < b + c ENTÃO
    SE a*a == (b*b + c*c) ENTÃO exibir "retangulo"
    SENÃO SE a*a > (b*b + c*c) ENTÃO exibir "obtusangulo"
    SENÃO exibir "acutangulo"
    FIM SE
  SENÃO
    exibir "invalido"
  FIM SE
```
