'''Escreva um programa que inverta os caracteres de um string.

IMPORTANTE:
a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código;
b) Evite usar funções prontas, como, por exemplo, reverse;'''

string = input("escreva algo: ")

print("a string invertida é:")

max  =len(string)

for i in range(len(string)-1,-1,-1):
    print(string[i], end = "")