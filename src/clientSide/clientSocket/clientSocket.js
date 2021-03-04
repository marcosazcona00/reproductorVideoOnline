let socket
let evento
let videoToPlay = null 


function connectServer() {
    const host = 'XXX.XXX.XXX.XXX:3000' 
    socket = new WebSocket(`ws://${host}`)
}

function sendUsername(){
    // Send to server a nickname
    socket.send(getUsername());
}

function sendPlayServer(){
    // Send play list to server
    socket.send('play-list')
}

function sendChangeStateVideo(){
    // Send to server that an user clicked on pause or play
    socket.send("change-state-list");
}

function sendUrlsServer(url){
    // Send url to play to server 
    socket.send("url-list")
    socket.send(url)
}

function sendMessageChat(msg){
    // Send to server the msg of client
    socket.send("msg-chat")
    socket.send(msg)
}

async function playVideo(url) {
    hideForm()
    showVideoPlayer()    
    videoToPlay = (new VideoFactory(video,url)).createVideo()
    videoToPlay.play()        
    await videoToPlay.awaitFinished()
    socket.send('finished-video')   
}

    
/* Connect to  server, ask client username and send it to the server */
connectServer()
/*********************************************************************/

socket.onopen = function (event) {
    console.log("Conexion establecida!")
    sendUsername()
}

socket.onerror = function(event){
    hideForm()  
    hideChat()
    hideButtonPlay()
    alert('The server is not running!')
}

socket.onmessage = async function(event) {
    console.log(event.data)
    //if (event.data.split(" ")[0] == "<msg>"){
    if (hasMsgTag(event.data)){
        addMessageChat(event.data)
    }else if(event.data == 'change-state-list'){
        changeButtonState() 
        videoToPlay.changeState()
    }else if(event.data == "finished-playlist"){
        showForm()
        showButtonPlay()
        hideVideoPlayer()
        alert("No more videos in playlist!")
    }else if(event.data == "playlist-empty"){
        alert("The playlist is empty")
    }else{
        // Here we receive the url to play
        hideButtonPlay()
        playVideo(event.data)
    }   
}



