'''Observe o trecho de código abaixo: int INDICE = 13, SOMA = 0, K = 0;
Enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; }
Imprimir(SOMA);'''

indice = 13
soma = 0
k = 0

#loop enquanto o indice for maior
while k < indice:
    k += 1
    soma += k

print(soma)