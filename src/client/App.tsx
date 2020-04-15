import * as React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import { ChatClientI, ChatMessageData } from '../shared';
import Chat from './Chat';
import Settings from './Settings';

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
    this.props.chat.ready.subscribe(ready => this.setState({
      ready,
      messages: ready ? this.state.messages : []
    }))
    this.props.chat.messages.subscribe(message => this.setState({
      messages: this.state.messages.concat(message)
    },() => {
      // This bit will scroll the window to the bottom when the messages are updated
      // This is awful and I feel dirty implementing it, but it works
      window.scrollTo(0,document.querySelector('.container').scrollHeight)
    }))
  }

  render(){
    return (
      <Container>
        <Chat disabled={!this.state.ready} messages={this.state.messages} handleSend={msg=>this.props.chat.sendMessage(msg)}/>
        <Row>
          <Col>
            <hr />
            <Settings
              clientUsername={this.props.chat.username}
              setClientUsername={un=>this.props.chat.setUsername(un)}
              />
          </Col>
        </Row>
      </Container>
    )
  }
  renderDebug(){
    return <pre>{JSON.stringify(this.state,null,2)}</pre>
  }
}

export default App;
