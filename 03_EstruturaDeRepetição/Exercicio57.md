# 📝 Exercício 57: Cálculo da Área Total de uma Residência

## 📖 Descrição
Escreva um programa que calcule a área total em metros quadrados de uma residência com vários cômodos, como sala, cozinha, banheiro, quartos, área de serviço, quintal, garagem, entre outros. O programa solicita ao usuário o nome, a largura e o comprimento de cada cômodo e oferece a opção de continuar adicionando novos cômodos ou encerrar o cálculo. Ao encerrar, o programa apresente o valor total acumulado da área residencial.

## 🚶 Passo a Passo

1. Inicialização da Área Total:
   - Inicialize uma variável "areaTotal" com valor zero para armazenar a área total acumulada da residência.

2. Laço de Iteração para Leitura de Cômodos:
   - Inicie um laço de iteração que permite ao usuário fornecer os dados de cada cômodo da residência.
   - Para cada cômodo, solicite ao usuário o nome, a largura e o comprimento.
   - Calcule a área do cômodo e acumule na variável "areaTotal".
   - Pergunte ao usuário se deseja continuar adicionando cômodos.
   - Se a resposta for "NÃO", encerre o laço.

3. Saída de Dados:
   - Apresente a mensagem com o valor total acumulado da área residencial.

## 💻 Exemplo em Pseudocódigo

```plaintext
INICIALIZAR areaTotal COM 0
FAÇA
    SOLICITAR nomeDoComodo
    SOLICITAR larguraDoComodo
    SOLICITAR comprimentoDoComodo
    calcular areaDoComodo = larguraDoComodo * comprimentoDoComodo
    areaTotal = areaTotal + areaDoComodo
    SOLICITAR continuar
ENQUANTO continuar = "SIM"
EXIBIR "Área total da residência: ", areaTotal, " metros quadrados"
```
