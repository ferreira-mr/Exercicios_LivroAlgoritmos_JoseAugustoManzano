# 📝 Exercício 154: Mapeamento de Caminho em Labirinto Simples

## 📖 Descrição
Escreva um programa que leia uma matriz 4x4 (0 para livre, 1 para parede) e determine se existe um caminho livre de (0,0) até (3,3) movendo-se apenas para baixo ou para a direita.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite 16 números inteiros correspondentes ao labirinto.
2. Processamento:
   - Crie uma matriz booleana auxiliar de alcançabilidade. Marque alcançável[0][0] como verdadeiro (se labirinto[0][0] == 0). Para cada célula, se ela estiver livre e o vizinho de cima ou da esquerda for alcançável, marque como alcançável.
3. Saída de Dados:
   - Apresente 'caminho encontrado' ou 'sem caminho'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0
  - Saída: caminho encontrado
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: L[4][4]
PROCESSAMENTO:
  // Inicializar alcançavel com falso
  SE L[0][0] == 0 ENTÃO alc[0][0] = verdadeiro SENÃO alc[0][0] = falso FIM SE
  PARA i DE 0 ATE 3 FAÇA
    PARA j DE 0 ATE 3 FAÇA
      SE i == 0 E j == 0 ENTÃO CONTINUAR FIM SE
      SE L[i][j] == 0 ENTÃO
        de_cima = falso
        SE i > 0 ENTÃO de_cima = alc[i-1][j] FIM SE
        da_esq = falso
        SE j > 0 ENTÃO da_esq = alc[i][j-1] FIM SE
        alc[i][j] = de_cima OU da_esq
      SENÃO
        alc[i][j] = falso
      FIM SE
    FIM PARA
  FIM PARA
SAÍDA: SE alc[3][3] ENTÃO exibir "caminho encontrado" SENÃO exibir "sem caminho" FIM SE
```
