# 📝 Exercício 61: Leitura e Apresentação de Nomes

## 📖 Descrição
Escreva um programa que leia dez nomes e os apresente em seguida.

## 🚶 Passo a Passo

1. Inicialização:
   - Inicialize um contador como 1 e uma lista vazia para armazenar os nomes.

2. Enquanto o contador for menor ou igual a 10:
   - Solicite ao usuário que insira um nome.
   - Adicione o nome à lista de nomes.
   - Incremente o contador.

3. Apresentação dos Nomes:
   - Apresente os nomes lidos na forma "Nomes lidos: nome1, nome2, ..., nome10".

## 💻 Exemplo em Pseudocódigo

```plaintext
contador = 1
nomes = []
ENQUANTO contador <= 10 FAÇA
    SOLICITAR nome
    ADICIONAR nome À nomes
    contador = contador + 1
EXIBIR "Nomes lidos: " + juntar(nomes, ", ")
```
