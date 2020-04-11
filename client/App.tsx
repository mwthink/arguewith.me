import * as React from 'react';
import * as SocketIOClient from 'socket.io-client';
import { ChatMessage, ChatMessageD } from './ChatMessage';


export interface AppProps {
  socket: SocketIOClient.Socket;
}

interface AppState {
  connected: boolean;
  messages: ChatMessageD[];
  inputContent: string;
}

export class App extends React.Component <AppProps, AppState> {

  constructor(props:any){
    super(props);
    this.state = {
      connected: false,
      messages: [],
      inputContent: '',
    };

    this.props.socket.on('connect', () => {
      this.setState({connected: true })
    })
    this.props.socket.on('disconnect', () => {
      this.setState({connected: false })
    })
  }

  componentDidMount(){
    this.props.socket.on('message', (msg) => {
      this.setState({
        messages: this.state.messages.concat(msg)
      })
    })
  }

  sendMessage = (msg:string) => {
    this.props.socket.send(msg)
  }

  render(){
    return (
      <div>
        Connected: {String(this.state.connected)}
        <br/>
        {this.state.messages.map(msg => (
          <ChatMessage key={msg.id} message={msg}/>
        ))}
        <hr/>
        <input value={this.state.inputContent} onChange={e => this.setState({inputContent: e.target.value})}/>
        <button onClick={() => this.sendMessage(this.state.inputContent)}>Send</button>
      </div>
    )
  }
}

export default App;