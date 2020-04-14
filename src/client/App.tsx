import * as React from 'react';
import { ChatClientI, ChatMessageData } from '../shared';
import Chat from './Chat';

export interface AppProps {
  chat: ChatClientI;
}

interface AppState {
  connected: boolean;
  ready: boolean;
  messages: ChatMessageData[];
}

export class App extends React.Component<AppProps, AppState,{}> {
  state: AppState = {
    connected: false,
    ready: false,
    messages: []
  }

  componentDidMount(){
    this.props.chat.connected.subscribe(connected => this.setState({connected}))
    this.props.chat.ready.subscribe(ready => this.setState({ready}))
    this.props.chat.messages.subscribe(message => this.setState({
      messages: this.state.messages.concat(message)
    }))
  }

  render(){
    return (
      <div>
        <Chat messages={this.state.messages} handleSend={msg=>this.props.chat.sendMessage(msg)}/>
        <hr/>
        {this.renderDebug()}
      </div>
    )
  }
  renderDebug(){
    return <pre>{JSON.stringify(this.state,null,2)}</pre>
  }
}

export default App;
