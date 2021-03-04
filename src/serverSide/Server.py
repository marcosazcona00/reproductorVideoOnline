import asyncio
import threading
import websockets
from Client import Client


#https://media.w3.org/2010/05/sintel/trailer.mp4	

class Server(object):
    def __init__(self):
        '''
            clients: [<Client>, <Client>, <Client>]
        '''
        self.urls = []
        self._clients = [] 
        self._actual_url = '' 
        self._is_playing = False 
        self._clients_finished = 0
        self._mutex = threading.Semaphore(1)
        self._mutex_msg_chat = threading.Semaphore(1)
        
    def _is_client_active(self,client):
        return client in self._clients

    def _add_client(self,ws,username):
        '''
            Add a client
            Return: <Client>
        '''
        client = Client(ws,username)
        self._mutex.acquire()
        self._clients.append(client)
        self._mutex.release()
        return client
    
    async def _verifiy_is_playing(self,client):
        '''
            Check if already is playing playlist
            If its the case, send the actual url
        '''
        print(f'Playing ',self._is_playing)
        if self._is_playing:
            await client.send(self._actual_url)

    async def _send_clients_urlvideo(self):
        self._actual_url = self.urls.pop()
        await self._send_to_clients(self._actual_url) # Send broadcast to all clients the url to play

    async def _finished_video(self):
        self._clients_finished += 1 # Increment the number of clients that finished the actual video
        if self._clients_finished == len(self._clients):
            # All the clients finished actual video
            if len(self.urls) > 0:
                print('[ SERVER ] NEW VIDEO TO PLAY')
                # The playlist is not empty
                await self._send_clients_urlvideo()
            else:
                # Broadcast to all clients that the playlist is empty
                self._is_playing = False
                print('[ SERVER ] Finsihed Playlist', self.urls) 
                await self._send_to_clients('finished-playlist')
            # Back to 0 beacuse there is no clients waiting new url 
            self._clients_finished = 0 # Reinitialize count of clients

    async def _send_to_clients(self,msg):
        '''
            Send a broadcast to all clients
        '''
        for client in self._clients:
            await client.send(msg)

    async def _add_url(self,client,url):
        self.urls.append(url)
    
    def _remove_client(self,client_to_remove):
        '''
            Remove a client of list of clients
        '''
        for index in range(0,len(self._clients)):
            if self._clients[index] == client_to_remove:
                self._mutex.acquire()
                self._clients.pop(index)
                self._mutex.release()
                return
    
    async def _play_list(self,client):
        ''' 
            Start playlist
            If not empty urls, send the actual url. Else send that the playlist is empty
        '''
        if len(self.urls) == 0:
            # No playlist to play
            await client.send('playlist-empty')
        else:
            # Start playlist
            self._is_playing = True
            await self._send_clients_urlvideo() # Send broadcast to all clients the url to play
    
    async def _send_msg_chat(self,client):
        print('[ Server ] Msg')
        msg_chat = await client.recv()
        for client_to_send in self._clients:
            msg = ''
            if client == client_to_send:
                msg = '<msg> You:'
            else:
                msg = '<msg> ' + client.name() + ':'
            msg = msg + ' ' + msg_chat
            # This mutex is to prevent two message at same time to a simple user
            self._mutex_msg_chat.acquire() 
            await client_to_send.send(msg)
            self._mutex_msg_chat.release()

    async def attend_client(self,client):
        '''
            Receive actions of clients 
        '''
        try:
            while True: 
                msg = await client.recv()
                print('[ Client ] ',msg)
                if msg == 'url-list':
                    # Add url to list
                    url = await client.recv() # Waiting to receive the url
                    await self._add_url(client,url)
                elif msg == 'play-list':
                    await self._play_list(client)
                elif msg == 'change-state-list':
                    # Stop or Replay playlist
                    await self._send_to_clients(msg)
                elif msg == 'finished-video':
                    # Clients advise that he finished the video
                    await self._finished_video()
                elif msg == 'msg-chat':
                    # Client send a msg to chat
                    await self._send_msg_chat(client)
        except:
            print('[Server ] Bye!')
            self._remove_client(client)
            print('[ Server ] Clients List ',self._clients )

    async def accept_client(self,ws,path):
        '''
            Add a client into the list of clients watching the video
        '''
        try:
            username = await ws.recv()
            print('[ CLIENT ] ',username)
            print(f'[ SERVER ] Welcome {username}!')
            client = self._add_client(ws,username) 
            await self._verifiy_is_playing(client)   
            await self.attend_client(client)
        except:
            pass

if __name__ == '__main__':
    server = Server()
    start_server = websockets.serve(server.accept_client, "XXX.XXX.XXX.XXX", 3000)
    print('Listening on... 192.168.1.42:3000')
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()