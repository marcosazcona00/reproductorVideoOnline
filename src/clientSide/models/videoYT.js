class VideoYT{
    constructor(url){
        /*
            url: <String>
            iframe: <HTMLIframe>
        */
       this.url = url
       this.videoID = null
       this.player = null
       this.interval = 3000
       this.getYTVideoID()
       this.createPlayer()
    }

    createPlayer(){
        // Crreate the yt video player
        window.YT.ready(() => {
            this.player = new YT.Player('youtube-video-player', {
                height: '360',
                width: '640',
                videoId: this.videoID,
                events: {
                'onReady': this.onPlayerReady
                }
            });    
        })
    }
    getYTVideoID(url){
        let splittedStr = this.url.split("/")
        this.videoID = splittedStr[splittedStr.length - 1]
    }

    onPlayerReady(event) {
        event.target.playVideo();
    }

    async play(){
        this.player.playVideo()
    }

    stop(){
        this.player.pauseVideo()
    }

    isPaused(){
        return YT.PlayerState.PLAYING == 0
    }

    changeState(){
        if(this.isPaused()){
            this.play()
            YT.PlayerState.PLAYING = 1

        }else{
            this.stop()
            YT.PlayerState.PLAYING = 0
        }
    }

    async awaitFinished(){
        // Return a <Promise> to be waited that checks every 3 seconds if the video is ended.
        console.log('Await')
        return new Promise(resolve => {
            const interval = setInterval(() => {
                console.log('Interval...')
                if(this.player.getCurrentTime() >= (this.player.getDuration() - 2)) {
                    resolve('foo') // Once video finished, the promise pass to Resolve Stated
                    clearInterval(interval) // Stop interval
                } 
            },this.interval);
        })
    }
}