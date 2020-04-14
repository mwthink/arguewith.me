import * as React from 'react';
import * as SocketIOClient from 'socket.io-client';
import { Container, Row, Col } from 'reactstrap';
import { ChatMessage } from './ChatMessage';
import { proveWorkUsername } from './pow';
import { AuthParams, ChatMessageData } from '../shared';
import ChatForm from './ChatForm';
import UsernameSetter from './UsernameSetter';

export interface AppProps {
  socket: SocketIOClient.Socket;
  initialUsername?: string;
}

interface AppState {
  authenticated: boolean;
  connected: boolean;
  messages: ChatMessageData[];
  lastSentMessage: number;
  username: string;
  currentUsers: number;
}

export class App extends React.Component <AppProps, AppState> {

  constructor(props:any){
    super(props);
    this.state = {
      authenticated: false,
      connected: false,
      messages: [],
      lastSentMessage: Date.now(),
      username: this.props.initialUsername || 'devuser',
      currentUsers: 0,
    };

    this.props.socket.on('connect', () => {
      this.setState({ connected: true })
    })
    this.props.socket.on('disconnect', () => {
      this.setState({
        connected: false,
        currentUsers: 0,
      })
    })
    this.props.socket.on('authenticated', () => {
      this.setState({ authenticated: true })
    })
    this.props.socket.on('authparams', async (authParams: AuthParams) => {
      const username = this.state.username;
      const idProof = await proveWorkUsername(username, authParams);
      this.props.socket.emit('authentication', {...idProof})
    })
    this.props.socket.on('usercount', (userCount:number) => (
      this.setState({currentUsers:userCount})
    ))
  }

  componentDidMount(){
    this.props.socket.on('message', (msg:ChatMessageData) => {
      this.setState({
        messages: this.state.messages.concat(msg)
      })
    })
  }

  setUsername = (newUsername:string) => {
    localStorage.setItem('username', newUsername);
    this.setState({
      username: newUsername,
      messages: [],
    }, () => {
      this.props.socket.disconnect();
      this.props.socket.connect();
    })
  }

  sendMessage = (msg:string) => {
    this.props.socket.send(msg)
    // TODO Only proceed after message was "sent"
    this.setState({lastSentMessage:Date.now()})
  }

  render(){
    if(!this.state.authenticated){
      return <b>Authenticating . . .</b>
    }
    return (
      <Container>
        <Row>
          <Col>
            {this.state.messages.map(msg => (
              <ChatMessage key={msg.id} message={msg}/>
            ))}
          </Col>
        </Row>
        <Row style={{paddingTop:'1.5em'}}>
          <Col>
            <ChatForm key={this.state.lastSentMessage} disabled={!this.state.connected} onSend={this.sendMessage}/>
            <hr/>
            <UsernameSetter key={this.state.username} initialUsername={this.state.username} onSubmit={this.setUsername}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Current users: ${this.state.currentUsers}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
