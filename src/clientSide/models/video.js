class Video {
    constructor(videoElement,url) {
        /*
            video: <videoHTMLElement>
            url: <str>
        */
        this.interval = 3000
        this.videoElement = videoElement 
        this.videoElement.src = url

    }
    isPaused(){
        return this.videoElement.paused
    }

    changeState(){
        console.log('Cambiamos')
        if(this.isPaused()){
            this.play()
        }else{
            this.stop()
        }
    }

    async play(){
        this.videoElement.play()
    }

    async stop(){
        this.videoElement.pause()
    }

    async awaitFinished(){
        // Return a <Promise> to be waited that checks every 3 seconds if the video is ended.
        return new Promise(resolve => {
            const interval = setInterval(() => {
                console.log('Interval...')
                if(this.videoElement.currentTime >= this.videoElement.duration) {
                    resolve('foo') // Once video finished, the promise pass to Resolve Stated
                    clearInterval(interval) // Stop interval
                } 
            },this.interval);
        })
    }
}
