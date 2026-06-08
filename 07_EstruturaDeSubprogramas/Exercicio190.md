# 📝 Exercício 190: Validador Completo de CPF

## 📖 Descrição
Escreva um programa que leia um CPF de 11 dígitos numéricos e utilize funções e procedimentos para validar os dígitos verificadores através do cálculo de peso.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite uma string de 11 dígitos correspondente ao CPF.
2. Processamento:
   - Escreva subprogramas de cálculo de peso para o primeiro dígito (pesos de 10 a 2) e para o segundo dígito (pesos de 11 a 2). Se ambos os dígitos calculados coincidirem com os do CPF, ele é válido.
3. Saída de Dados:
   - Apresente 'valido' ou 'invalido'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 12345678909
  - Saída: valido
- Exemplo 2:
  - Entrada: 11111111111
  - Saída: invalido
   
## 💻 Exemplo em Pseudocódigo
```plaintext
funcao calcular_digito(cpf, n_digito)
  // lógica de cálculo baseada nos pesos
fim_funcao
// Principal
SE validar(cpf) ENTÃO exibir "valido" SENÃO exibir "invalido" FIM SE
```
