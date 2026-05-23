# 📝 Exercício 110: Agenda de Contatos

## 📖 Descrição
Escreva um programa que gerencie os registros de 10 pessoas na forma de uma agenda de contatos, contendo os campos nome, endereço e telefone. O programa deve, por meio de um menu de opções, executar as seguintes etapas:.

## 🚶 Passo a Passo

1. Cadastrar os dez registros:
   - Solicitar ao usuário que insira o nome, endereço e telefone de cada uma das dez pessoas.
   - Armazenar esses registros em uma estrutura de dados homogênea baseada em um tipo registro definido pelo desenvolvedor.

2. Pesquisar um registro por vez pelo campo nome:
   - Solicitar ao usuário o nome a ser pesquisado.
   - Realizar uma busca linear/sequencial para localizar o registro.
   - Se encontrado, apresentar o registro correspondente (nome, endereço e telefone); caso contrário, exibir uma mensagem informando que o registro não foi localizado.

3. Classificar os registros em ordem alfabética de nome:
   - Utilizar um algoritmo de ordenação (como Bubble Sort ou outro método de troca) para classificar todos os registros com base no campo nome em ordem alfabética crescente.

4. Apresentar todos os registros:
   - Percorrer o vetor de registros e exibir na tela os dados de cada uma das pessoas (nome, endereço e telefone).

5. Sair do programa de cadastro.

## 🧪 Exemplos

- Entrada:
  Cadastro de 10 pessoas com seus respectivos nomes, endereços e telefones.
- Processamento / Operações:
  - Escolher a opção de cadastro e preencher as informações.
  - Escolher a opção de ordenação para colocar os contatos em ordem alfabética.
  - Pesquisar por um nome específico e exibir suas informações na tela.
- Saída:
  Exibição dos contatos cadastrados de forma individual (pesquisa) ou coletiva (apresentação de todos).

## 💻 Exemplo em Pseudocódigo

```plaintext
tipo_cadastro = estrutura {nome: literal, endereco: literal, telefone: literal}
agenda[10] = vetor de tipo_cadastro
opcao = inteiro

REPITA
    ESCREVER "--- MENU AGENDA ---"
    ESCREVER "1. Cadastrar Contatos"
    ESCREVER "2. Pesquisar por Nome"
    ESCREVER "3. Ordenar por Nome"
    ESCREVER "4. Exibir Todos os Contatos"
    ESCREVER "5. Sair"
    ESCREVER "Escolha uma opção: "
    LER opcao

    SE opcao == 1 ENTÃO
        PARA i DE 0 ATÉ 9 FAÇA
            ESCREVER "Cadastro do registro ", i + 1
            ESCREVER "Nome: "
            LER agenda[i].nome
            ESCREVER "Endereço: "
            LER agenda[i].endereco
            ESCREVER "Telefone: "
            LER agenda[i].telefone
        FIM PARA
    SENÃO SE opcao == 2 ENTÃO
        ESCREVER "Digite o nome para pesquisar: "
        LER nome_pesquisa
        achado = falso
        PARA i DE 0 ATÉ 9 FAÇA
            SE agenda[i].nome == nome_pesquisa ENTÃO
                ESCREVER "Nome: ", agenda[i].nome
                ESCREVER "Endereço: ", agenda[i].endereco
                ESCREVER "Telefone: ", agenda[i].telefone
                achado = verdadeiro
            FIM SE
        FIM PARA
        SE achado == falso ENTÃO
            ESCREVER "Contato não encontrado."
        FIM SE
    SENÃO SE opcao == 3 ENTÃO
        PARA i DE 0 ATÉ 8 FAÇA
            PARA j DE i + 1 ATÉ 9 FAÇA
                SE agenda[i].nome > agenda[j].nome ENTÃO
                    aux = agenda[i]
                    agenda[i] = agenda[j]
                    agenda[j] = aux
                FIM SE
            FIM PARA
        FIM PARA
        ESCREVER "Agenda classificada com sucesso!"
    SENÃO SE opcao == 4 ENTÃO
        PARA i DE 0 ATÉ 9 FAÇA
            ESCREVER "Registro ", i + 1, ":"
            ESCREVER "Nome: ", agenda[i].nome
            ESCREVER "Endereço: ", agenda[i].endereco
            ESCREVER "Telefone: ", agenda[i].telefone
        FIM PARA
    FIM SE
ATÉ opcao == 5
```
