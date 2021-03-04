import asyncio

class Client(object):
    def __init__(self,ws,name):
        '''
            ws: <WebSocket>
        '''
        self._ws = ws
        self._name = name

    def name(self):
        return str(self._name)

    async def send(self,msg):
        '''
            Client socket send a msg to server
        '''
        await self._ws.send(msg)

    async def recv(self):
        '''
            Return the msg of the client
            Return: <str>
        '''
        msg = await self._ws.recv()   
        return msg