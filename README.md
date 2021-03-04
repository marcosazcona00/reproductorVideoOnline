# Requerimientos
* python (>=3)
* virtualenv
* pip

# Virtualenv
* Dentro de la carpeta `src/serverSide` ejecutar `virtualenv venv` para crear el entorno virtual
* Para activar el entorno virtual ejecutar `soruce venv/bin/activate`

# Instalacion Requerimientos
* Ejecutar `pip install -r requirements.txt`

# Configuracion Inicial
* Para poder conectarse al servidor, en el archivo `Server.py` modificar en la linea `start_server = websockets.serve(server.accept_client, "XXX.XXX.XXX.XXX", 3000)` las X por la IP 
* En el `clientSocket/clientSocket.js` modificar `const host = 'XXX.XXX.XXX.XXX:3000'` las X por la misma IP que se colocó en el servidor

# Server
* Para ejecutar el server ejecutar `python manage.py runserver`

# Frontend
* Abrir el archivo `index.html` dentro de la carpeta `src/clientSide/frontend`, luego de haber iniciado el servidor
