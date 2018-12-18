
import io from 'socket.io-client';



export class ChatManager {

    constructor(callbackMesgChange){
        this.callbackMesgChange = callbackMesgChange;
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', () => console.log("connected to back via websockets"));
        this.socket.on('disconnect', ()=> console.log("DISconnected to back via websockets"));
        
        this.socket.on('chatMsg', (data) => this.msgFromServer(data));

        this.messages = []
    }

    getMessages(){
        return this.messages
    }
    
    sendMessage(txt){
        const message = { type:'Me', message:txt };
        this.messages.push(message);
        this.callbackMesgChange();
        this.socket.emit('chatMsg', txt)
    }

    msgFromServer(txt){
        this.messages.push({ type:'Server', message:txt });
        this.callbackMesgChange();
    }

}