import * as React from 'react';
import * as SocketIOClient from 'socket.io-client';

export interface AppProps {}

interface AppState {
  socketConnected: boolean;
}

export class App extends React.Component <AppProps, AppState> {
  private readonly socket: SocketIOClient.Socket;

  constructor(props:any){
    super(props);
    this.state = {
      socketConnected: false,
    };
    this.socket = SocketIOClient('http://localhost:3000', {
      autoConnect: false
    });

    this.socket.on('connect', () => {
      this.setState({socketConnected: true })
    })
    this.socket.on('disconnect', () => {
      this.setState({socketConnected: false })
    })
  }

  toggleConnection = () => {
    if( this.socket.connected ) {
      this.socket.disconnect();
    }
    this.socket.connect()
  }

  render(){
    return (
      <div>
        Connected: {String(this.state.socketConnected)}
        <br/>
        <button onClick={this.toggleConnection}>Toggle Connection</button>
      </div>
    )
  }
}

export default App;