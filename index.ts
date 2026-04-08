import {INotificator,NotificationFactory,Notificators,Email, Push, SMS} from './notifications'
class SystemManager {
    private static instance: SystemManager | null = null

    public name: string
    private maxRetry: number
    private notificator: INotificator | null = null
    private notificatorFactory: NotificationFactory = new NotificationFactory()

     constructor(name: string, maxRetry: number) {
        this.name = name
        this.maxRetry = maxRetry
    }

    public static getInstance(name: string, maxRetry: number): SystemManager {
        if (!SystemManager.instance) {
            SystemManager.instance = new SystemManager(name, maxRetry)
        }
        return SystemManager.instance
    }

    public setNotificator(notificationType: Notificators) {
        this.notificator = this.notificatorFactory.create(notificationType)
    }

    public sendNotification(forceError: boolean = false) {
        if (!this.notificator) {
            console.log("No notificator configured")
            return
        }

        let tries = 0
        let success = false

        while (!success && tries < this.maxRetry) {
            try {
                if (forceError) throw new Error()

                this.notificator.send()
                success = true
            } catch {
                tries++
                console.log("erro number " + tries)
            }
        }
    }
}



function testSystem() {
    const system = SystemManager.getInstance("My company", 3)

    system.setNotificator(Email)
    system.sendNotification()
    system.sendNotification(true)

    system.setNotificator(SMS)
        system.sendNotification()

    system.sendNotification(true)

    system.setNotificator(Push)
    system.sendNotification()
        system.sendNotification(true)

}

testSystem()