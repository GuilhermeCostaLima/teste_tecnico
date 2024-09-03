''' Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne:
• O menor valor de faturamento ocorrido em um dia do mês;
• O maior valor de faturamento ocorrido em um dia do mês;
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

IMPORTANTE:
a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;'''

import json

#arquivo json
with open('dados.json') as file:
    data = json.load(file)

faturamento = [dia['valor'] for dia in data if dia['valor'] > 0]

#calculo maior e menor 
menor_faturamento = min(faturamento)
maior_faturamento = max(faturamento)

# média
media_faturamento = sum(faturamento) / len(faturamento)

# conta os dias com faturamento acima da média
dias_acima_da_media = len([dia for dia in faturamento if dia > media_faturamento])

#prints
print(f"Menor faturamento: {menor_faturamento}")
print(f"Maior faturamento: {maior_faturamento}")
print(f"Dias acima da média: {dias_acima_da_media}")
