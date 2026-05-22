# 📝 Exercício 55: Somatório, Média e Total de Valores Lidos

## 📖 Descrição
Este programa lê sucessivamente valores numéricos fornecidos pelo usuário e, ao final, apresenta o somatório, a média e o total de valores lidos. O programa continua a ler os valores enquanto o usuário fornecer valores positivos.

## 🚶 Passo a Passo

1. Inicialização do Somatório, Total de Valores Lidos e Média:
   - Inicialize uma variável "somatorio" com valor zero para armazenar o somatório.
   - Inicialize uma variável "totalValores" com valor zero para contar o total de valores lidos.
   - Inicialize uma variável "media" com valor zero para calcular a média.

2. Laço de Iteração:
   - Inicie um laço de iteração que continua enquanto o valor lido for positivo.
   - Dentro do laço, solicite ao usuário que insira um valor numérico.
   - Se o valor lido for positivo, adicione-o ao somatório e incremente o total de valores lidos.
   - Atualize a média.

3. Cálculo da Média:
   - Calcule a média dos valores lidos dividindo o somatório pelo total de valores lidos.

4. Saída de Dados:
   - Apresente o somatório, a média e o total de valores lidos.

## 💻 Exemplo em Pseudocódigo

```plaintext
INICIALIZAR somatorio COM 0
INICIALIZAR totalValores COM 0
INICIALIZAR media COM 0
ENQUANTO TRUE FAÇA
    SOLICITAR valor
    SE valor <= 0 ENTÃO
        SAIR DO LAÇO
    FIM SE
    somatorio = somatorio + valor
    totalValores = totalValores + 1
    media = somatorio / totalValores
EXIBIR "Somatório: " + somatorio + ", Média: " + media + ", Total de valores lidos: " + totalValores
```
