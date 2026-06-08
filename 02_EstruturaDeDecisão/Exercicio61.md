# 📝 Exercício 61: Validador de Horário e Acréscimo de um Segundo

## 📖 Descrição
Escreva um programa que leia três valores correspondentes a horas, minutos e segundos. Verifique se o horário fornecido é válido. Se for válido, calcule e apresente o horário correspondente a um segundo depois. Caso contrário, exiba 'horario invalido'.

## 🚶 Passo a Passo
1. Entrada de Dados:
   - Solicite valores inteiros de horas, minutos e segundos.
2. Processamento:
   - Verifique se horas estão entre 0 e 23, minutos entre 0 e 59 e segundos entre 0 e 59. Se for válido, adicione 1 aos segundos. Se segundos atingirem 60, resete para 0 e adicione 1 aos minutos. Faça o mesmo para minutos atingindo 60 (resete para 0 e adicione 1 às horas). Se horas atingirem 24, resete para 0.
3. Saída de Dados:
   - Apresente o horário resultante formatado no padrão hh:mm:ss ou a mensagem 'horario invalido'.
   
## 🧪 Exemplos
- Exemplo 1:
  - Entrada: 23, 59, 59
  - Saída: 00:00:00
- Exemplo 2:
  - Entrada: 12, 30, 45
  - Saída: 12:30:46
- Exemplo 3:
  - Entrada: 25, 0, 0
  - Saída: horario invalido
   
## 💻 Exemplo em Pseudocódigo
```plaintext
ENTRADA: h, m, s
PROCESSAMENTO:
  SE h >= 0 E h <= 23 E m >= 0 E m <= 59 E s >= 0 E s <= 59 ENTÃO
    s = s + 1
    SE s == 60 ENTÃO
      s = 0
      m = m + 1
      SE m == 60 ENTÃO
        m = 0
        h = h + 1
        SE h == 24 ENTÃO
          h = 0
        FIM SE
      FIM SE
    FIM SE
    exibir formatar(h) + ":" + formatar(m) + ":" + formatar(s)
  SENÃO
    exibir "horario invalido"
  FIM SE
```
