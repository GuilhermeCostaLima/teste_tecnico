'''Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.'''

number = int(input("Digite um número positivo: "))

#sequencia fibo até o primeiro numero
fibonacci = [0, 1]
while fibonacci[-1] < number:
  next_number = fibonacci[-1] + fibonacci[-2]
  fibonacci.append(next_number)

#imprime a sequencia fibo
print("a sequencia fibonacci até o primeiro numero superior a {} é: {}".format(number, fibonacci))

#verifica se é fibo
if number in fibonacci:
  print("o numero {} pertence a fibonacci".format(number))
else:
  print("o numero {} nao pertence a fibonacci".format(number))