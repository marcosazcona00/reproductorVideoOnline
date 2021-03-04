import os
import sys

ARGS = ['runserver']

if __name__ == '__main__':
    action = sys.argv[1] # La posicion 0 tiene el nombre del archivo 
    if action in ARGS:
        command = 'python3 src/serverSide/Server.py'
        os.system(command)
    else:
        raise Exception('Command not found')
