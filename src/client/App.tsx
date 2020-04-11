import * as React from 'react';
import * as SocketIOClient from 'socket.io-client';
import { Container, Row, Col } from 'reactstrap';
import { ChatMessage } from './ChatMessage';
import { ChatMessageData } from '../shared';
import ChatForm from './ChatForm';


export interface AppProps {
  socket: SocketIOClient.Socket;
}

interface AppState {
  connected: boolean;
  messages: ChatMessageData[];
  lastSentMessage: number;
}

export class App extends React.Component <AppProps, AppState> {

  constructor(props:any){
    super(props);
    this.state = {
      connected: false,
      messages: [],
      lastSentMessage: Date.now(),
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
    // TODO Only proceed after message was "sent"
    this.setState({lastSentMessage:Date.now()})
  }

  render(){
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
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
