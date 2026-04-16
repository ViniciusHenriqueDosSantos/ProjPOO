class Tv{
    turnOn(){
        console.log("Turning Tv On...\n")
    }
    turnOff(){
        console.log("Turning Tv Off...\n")
    }
}
class Projector{
    turnOn(){
        console.log("Turning Projector On...\n")
    }
    turnOff(){
        console.log("Turning Projector Off...\n")
    }
}
class SoundSystem{
    turnOnMusic(){
        console.log("Turning Soud System on for Music...\n")
    }
    turnOnMovie(){
        console.log("Turning Soud System on for Movie...\n")
    }
}
class MediaPlayer{
    turnOnMusic(){
        console.log("Turning Media Player on for Music...\n")
    }
    turnOnMovie(){
        console.log("Turning Media Player on for Movie...\n")
    }
}
class LightSystem{
        turnOn(){
        console.log("Turning Lights On...\n")
    }
    turnOff(){
        console.log("Turning Lights Off...\n")
    }
}
class HomeTheater{
    public tv: Tv= new Tv()
    public projector: Projector = new Projector()
    public mediaPlayer: MediaPlayer = new MediaPlayer()
    public soundSystem: SoundSystem = new SoundSystem()
    public lightSystem: LightSystem = new LightSystem()
    constructor(){ }

}
class HomeTheaterFacade{
    private homeTheater:HomeTheater
    constructor(homeTheater:HomeTheater){
        this.homeTheater=homeTheater
    }
    watchMovie(){
        console.log("MOVIE SETTING\n")
        this.homeTheater.lightSystem.turnOn()
        this.homeTheater.tv.turnOff()
        this.homeTheater.mediaPlayer.turnOnMovie()
        this.homeTheater.soundSystem.turnOnMovie()
        this.homeTheater.projector.turnOn()
    }
    listenToMusic(){
        console.log("MUSIC SETTING\n")
        this.homeTheater.lightSystem.turnOff()
        this.homeTheater.tv.turnOn()
        this.homeTheater.mediaPlayer.turnOnMusic()
        this.homeTheater.soundSystem.turnOnMusic()
        this.homeTheater.projector.turnOff()
    }
}
function main(){
    const homeTheater = new HomeTheater()
    const homeTheaterFacade= new HomeTheaterFacade(homeTheater)
    // most simple way, using facade instead of each individual method
    console.log("\n\n---With Facade---\n\n")
    homeTheaterFacade.watchMovie()
    homeTheaterFacade.listenToMusic()
    console.log("\n\n--Without Facade---\n\n")

    console.log("MOVIE SETTING\n")
    homeTheater.lightSystem.turnOn()
    homeTheater.tv.turnOff()
    homeTheater.mediaPlayer.turnOnMovie()
    homeTheater.soundSystem.turnOnMovie()
    homeTheater.projector.turnOn()

    console.log("MUSIC SETTING\n")
    homeTheater.lightSystem.turnOff()
    homeTheater.tv.turnOn()
    homeTheater.mediaPlayer.turnOnMusic()
    homeTheater.soundSystem.turnOnMusic()
    homeTheater.projector.turnOff()
    
}

main()