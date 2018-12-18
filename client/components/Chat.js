import React from 'react';
import './chat.scss';
import { ChatManager } from '../lib/ChatManager';

const Message = ({type, message}) => (
    <div style={{textAlign: type == 'Me' ? 'right':'left' }}>
        <div style={{
            padding:'5px 10px', 
            background:  type == 'Me' ? 'lightgreen':'lightgray', 
            margin:'5px',
            color:'white',
            borderRadius:'10px',
            display:'inline-block'
            }}>
            <b>{type}:</b> {message}
        </div>
    </div>
)

const Messages = ({messages}) => (
    <div>
        {messages.map( (m,i) => <Message key={i} type={m.type} message={m.message}/> )}
    </div>
)


class InputBox extends React.Component {
    constructor(){
        super();
        this.state = {
            txt:''
        }
    }

    sendMessage(){
        this.props.sendMessage(this.state.txt);
        this.setState({txt:''});
    }

    render(){
        return (
            <div className="inputbox">
                <textarea onChange={(e) => this.setState({txt:e.target.value})} value={this.state.txt}></textarea>
                <button onClick={() => this.sendMessage(this.state.txt)}>Send</button>
            </div>
        )
    }
} 


export class Chat extends React.Component{
    constructor(){
        super();
        
        this.chatmgr = new ChatManager(() => {
            this.setState({messages: this.chatmgr.getMessages()})
        });

        this.state = {
            messages: this.chatmgr.getMessages()
        }
    }

    render(){
        return (
            <div style={{border:'1px solid red', width:400, margin:'0 auto', padding:10}}>
                <h2>Chat Component</h2>
                <Messages messages={this.state.messages} />
                <InputBox sendMessage={(msg)=>this.chatmgr.sendMessage(msg)}/>
            </div> 
        )
    }
}