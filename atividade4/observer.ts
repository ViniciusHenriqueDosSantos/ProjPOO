interface Observer{
    pcd: PCD
    university: University
    update(novice:any):void
}
class Subject{
    private observers: Observer[] = []
    public addObserver(observer:Observer){
        this.observers.push(observer)
    }
    public removeObserver(observer:Observer){
        this.observers = this.observers.filter(x=>x!=observer)
    }
    public notifyObservers(novice:any){
        this.observers.forEach(element => {
            element.update(novice)
        });
    }
}
class PCD{
    temperature: Temperature
    ph: PH
    private university: University | null = null
    private termometro: Termometro | null = null
    private phMetro: PHMetro | null = null
    name: string
    constructor(name:string, temperature: Temperature, ph: PH){
        this.name = name
        this.temperature = temperature
        this.ph = ph
    }
    setUniversity(university: University){
        this.university = university
        this.termometro = new Termometro(this, university)
        this.phMetro = new PHMetro(this, university)
        this.temperature.addObserver(this.termometro)
        this.ph.addObserver(this.phMetro)
    }

}
class Temperature extends Subject{
    private temperature: number = 0
    constructor(temperature:number){
        super()
        this.temperature = temperature
    }
    public setTemperature(temperature:number){
        this.temperature = temperature
        this.notifyObservers(temperature)
    }
}
class PH extends Subject{
    private ph: number = 0
    constructor(ph:number){
        super()
        this.ph = ph
    }
    public setPH(ph:number){
        this.ph = ph
        this.notifyObservers(ph)
    }
}
class PHMetro implements Observer{
    pcd: PCD
    university: University
    constructor(pcd: PCD, university: University){
        this.pcd = pcd
        this.university = university
    }   
    update(novice:any): void {
        console.log("PHmetro from PCD " + this.pcd.name + " from university " + this.university.name + " says: PH updated to " + novice)
    }
}
class Termometro implements Observer{
    pcd: PCD
    university: University
    constructor(pcd: PCD, university: University){
        this.pcd = pcd
        this.university = university
    }
    update(novice:any): void {
        console.log("Termometro from PCD " + this.pcd.name + " from university " + this.university.name + " says:" + novice)
    }
}

interface University{
    pcds: PCD[]
    name: string
    addPCD(pcd:PCD):void

}
class UNIFESP implements University{
    pcds: PCD[] = []
    name: string = "UNIFESP"
    addPCD(pcd: PCD): void {
        pcd.setUniversity(this)
        this.pcds.push(pcd)
    }
}
class UFRJ implements University{
    pcds: PCD[] = []
    name: string = "UFRJ"
    addPCD(pcd: PCD): void {
        pcd.setUniversity(this)
        this.pcds.push(pcd)
    }
}
function observe(){
    const unifesp = new UNIFESP()
    const ufrj = new UFRJ()
    const pcdsNames= ["PALMAS", "MANAUS", "RIO BRANCO", "BELÉM", "BOA VISTA"]
    const temperaturesInitial= [25, 30, 28, 32, 26]
    const phInitials= [7, 7, 7, 7, 8]
    const temperatures = temperaturesInitial.map(temperature => new Temperature(temperature))
    const phs = phInitials.map(ph => new PH(ph))
    const pcds = pcdsNames.map((name,i) => new PCD(name,temperatures[i], phs[i]))
    unifesp.addPCD(pcds[0])
    ufrj.addPCD(pcds[0])
    unifesp.addPCD(pcds[1])
    ufrj.addPCD(pcds[2])
    ufrj.addPCD(pcds[3])
    ufrj.addPCD(pcds[4])

    
    setInterval(() => {
        console.log("\n============\n")
        const randomPCD =pcds[0]
        const randomTemperature = Math.floor(Math.random() * 30) 
        const randomPH = Math.floor(Math.random() * 14) 
        randomPCD.temperature.setTemperature(randomTemperature)
        randomPCD.ph.setPH(randomPH)
                console.log("\n============\n")

    }, 5000)
}
observe()