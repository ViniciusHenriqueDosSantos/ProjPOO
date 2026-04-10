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
    type Notificators = new () => INotificator
    class NotificationFactory{
        constructor(){

        }
        create(mode: Notificators=Email):INotificator{
        return new mode;
        }
        
    }
    export {NotificationFactory,Notificators,INotificator,Email,SMS,Push}