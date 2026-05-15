class ChatMediator{
    private chatMembers:ChatMember[]=[]
    public name:string=""
    constructor(name:string){
        this.name=name
    }
    addMember(cm:ChatMember){
        this.chatMembers.push(cm)
        cm.chatMediators.push(this)
    }
    sendMessage(chatMember:ChatMember,msg:string):void{
        this.chatMembers.filter(x=>x.name!=chatMember.name).forEach(cm => {
            cm.receive(chatMember,msg)
        });
    }
}

class ChatMember{
    receive(chatMember: ChatMember, msg: string) {
        console.log(this.name+" just received a msg from "+chatMember.name+": "+msg+"\n")
    }
    public name:string=""
    constructor(name:string){
        this.name=name
    }
    public chatMediators:ChatMediator[]=[]
    sendMessage(msg:string,chat:string){
        const chatMediator=this.chatMediators.filter(x=>x.name==chat)[0]
        if(chatMediator){
            chatMediator.sendMessage(this,msg)
        }
    }    
}

const mediator = () => {
    const group1Chat = new ChatMediator("Group 1");
    const group2Chat = new ChatMediator("Group 2");

    const vinicius = new ChatMember("Vinicius");
    const samuel = new ChatMember("Samuel");
    const helena = new ChatMember("Helena");

    group1Chat.addMember(vinicius);
    group1Chat.addMember(samuel);
    
    group2Chat.addMember(samuel);
    group2Chat.addMember(helena);
    group2Chat.addMember(vinicius)
    
    console.log("--- Sending to Group 1 ---\n");
    vinicius.sendMessage("Hello group 1!", "Group 1");
    samuel.sendMessage("Hey vinicius", "Group 1");

    console.log("--- Sending to Group 2 ---\n");
    helena.sendMessage("Hey samuel, how are you?", "Group 2");
    samuel.sendMessage("Im fine, helena!", "Group 2");
}

mediator();