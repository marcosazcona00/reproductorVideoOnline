const video = document.getElementById("video")
const chatList = document.getElementById("chat-list")
const chatForm = document.getElementById('chat-form');
const buttonPlay = document.getElementById("button-play")
const inputMsgChat = document.getElementById("message-chat")
const buttonChangeStateVideo = document.getElementById("button-player")


form.addEventListener("submit", (event) => {
    event.preventDefault()
    url = document.getElementById("url-video").value
    if(!validUrl(url)){
        alert("Url cant be blank")
        return
    }
    // Send to the the server the new url
    sendUrlsServer(url)
})

chatForm.addEventListener("submit", (event) => {
  event.preventDefault()
  msg = inputMsgChat.value
  // Clear the message input
  inputMsgChat.value = ""
  sendMessageChat(msg)  

})

buttonPlay.addEventListener("click",async () => {
    sendPlayServer()
})

buttonChangeStateVideo.addEventListener("click", (event) =>{
    sendChangeStateVideo()
})


