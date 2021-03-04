class VideoPlayList {
    constructor() {
        this.videos = []
        this.actualVideo = null
    }

    add(video){
        /*
            video: <Video>
        */
       this.videos.push(video)
    }

    empty(){
        // Return a boolean indicating if playlist is empty
        return this.videos.length > 0
    }

    changeStateVideo(){
        this.actualVideo.changeState()
    }

    isPaused(){
        return this.actualVideo.isPaused()
    }

    async play(){
        // Play all the videos
        for(let index = 0; index < this.videos.length; index++){
            let video = this.videos[index]
            this.actualVideo = video
            video.play()
            await video.awaitFinished()
        }
    }
}

