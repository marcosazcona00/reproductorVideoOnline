const form = document.getElementById("form")
const ulChat = document.getElementById("chat-list")
const chatArea = document.getElementById("chat-area")
const videoPlayer = document.getElementById("video-player")

function parseMessageChatServer(msg){
    // Parse the chat message received from server
    msgSplitted = msg.split(" ") // Split to result in ["<msg>", "Person (You/Nickname)",":","<msg>"]
    message = msgSplitted.splice(1)
    return message.join(" ")
}

function addMessageChat(msg){
    // Add to list the message received from server
    msg = parseMessageChatServer(msg)
    chatArea.value += msg + '\n'
}

function showForm(){
    // Hide form after put urls in playlist
    form.style.display = "block"
}

function hideForm(){
    // Hide form after put urls in playlist
    form.style.display = "none"
}

function hideChat(){
    document.getElementById("chat").style.display = "none"
}

function hideButtonPlay(){
    document.getElementById("button-play").style.display = "none"
}

function showButtonPlay(){
    document.getElementById("button-play").style.display = "block"
}

function showVideoPlayer(){
    // Display video player after put urls in playlist
    videoPlayer.style.display = "block"
}

function hideVideoPlayer(){
    // Hide video player after finish playlist
    videoPlayer.style.display = "none"
}

function validUrl(url){
    // Check if url is valid
    return url.trim() != ""
}

function changeButtonState(){
    // Change text button when pause or play
    let newState = "Play"
    if(videoToPlay.isPaused() ){
        newState = "Pause"
    }
    buttonChangeStateVideo.textContent = newState  
}

function displayError(msg = '', style = 'none'){ 
    // Show error in html
    let divError = document.getElementById("error-div")
    let spanError = document.getElementById("error-span")
    divError.style.display = style
    spanError.innerHTML = msg

}

function getUsername(){
    // Ask for user his nickname
    let username = ""
    do {
        username = prompt("Enter your username")
    }while(username.trim() == "")
    return username
}

function hasMsgTag(event){
    // Return boolean if is a message chat
    return event.split(" ")[0] == "<msg>"
}