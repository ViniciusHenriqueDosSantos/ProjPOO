interface INotificator{
send():void
}
class Email implements INotificator{
    constructor(){}
    send(){
        console.log("Sending via Email")
    }
}
class SMS implements INotificator{
    constructor(){}
    send(){
        console.log("Sending via SMS")
    }
}
class Push implements INotificator{
    constructor(){}
    send(){
        console.log("Sending via Push")
    }
}
class NotificationFactory{
    constructor(){

    }
    create(mode: Notificators=Email):INotificator{
    return new mode;
    }
    
}

class Telegraph{
    constructor(){}
    sendTelegraph(){
        console.log("Sending notification via telegraph")
    }
}

class TelegraphAdaptor implements INotificator{
    private telegraph:Telegraph
    constructor(telegraph:Telegraph=new Telegraph()){
        this.telegraph=telegraph
    }
    send(){
        this.telegraph.sendTelegraph()
    }
}

class NotificationSenderProxy implements INotificator{
    private notificator: INotificator;
    constructor(notificador: INotificator){
        this.notificator = notificador
    }
    send(){
        console.log("[Proxy] Calling base's send method")
        this.notificator.send()
    }
}

type Notificators = new () => INotificator

export {NotificationFactory,Notificators,INotificator,Email,SMS,Push, TelegraphAdaptor, NotificationSenderProxy}