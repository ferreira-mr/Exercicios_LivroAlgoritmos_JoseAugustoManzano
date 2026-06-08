# 📝 Exercício 187: Calculadora de Vetores Tridimensionais

## 📖 Descrição
Escreva um programa que utilize registros para modelar vetores tridimensionais (x, y, z) e use funções para obter o produto escalar e a norma dos vetores.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite os componentes x, y, z de dois vetores A e B.
2. Processamento:
   - Crie o registro Vetor3D. Implemente a função produto_escalar(A, B) = A.x*B.x + A.y*B.y + A.z*B.z e a função norma(V) = raiz(V.x^2 + V.y^2 + V.z^2).
3. Saída de Dados:
   - Apresente o produto escalar e a norma de A e B com 2 casas decimais.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 1, 2, 3 (A), 4, 5, 6 (B)
  - Saída: Escalar: 32.00, Norma A: 3.74, Norma B: 8.77
   
## 💻 Exemplo em Pseudocódigo
```plaintext
estrutura vetor3d
  x: real
  y: real
  z: real
fim_estrutura
// Subprogramas produto_escalar, norma
// Principal
esc = produto_escalar(A, B)
n_a = norma(A)
n_b = norma(B)
exibir esc, n_a, n_b
```
