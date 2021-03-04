class VideoFactory {
    constructor(video,url){
        this.url = url
        this.video = video
    }

    createVideo(){
        // Return an instance of Video or VideoYT
        try{
            deleteVideoYTPlayer()
        }catch(e){ }
        
        if(this.url.includes("youtu")){
            hideNormalVideo()
            createVideoYTPlayer()
            return new VideoYT(this.url)
        }else{
            showNormalVideo()
            return new Video(this.video,this.url)
        }
    }
}