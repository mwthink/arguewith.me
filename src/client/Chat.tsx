import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ChatMessageData } from '../shared';
import {
  Alert, Button, Form, Input, InputGroup, InputGroupAddon,
  Col, Row,
} from 'reactstrap';

export interface ChatMessageProps {
  message: ChatMessageData;
}
export const ChatMessage: React.SFC<ChatMessageProps> = ({message}) => (
  <div>
    <small>
      <span className={'font-weight-bold'}>{message.sender_display_name}{' @ '}</span>
      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
    </small>
    <ReactMarkdown source={message.content}/>
  </div>
)

export interface ChatProps {
  messages: ChatMessageData[];
  handleSend: (msg:string) => any;
}
export const Chat: React.FunctionComponent<ChatProps> = props => {
  const [ input, setInput ] = React.useState('');

  const handleSubmit = (e?:React.SyntheticEvent<HTMLFormElement>) => {
    if(e){
      e.preventDefault();
    }
    props.handleSend(input.trim());
    setInput('');
  }

  const handleInputKeyDown = (e:React.KeyboardEvent) => {
    // If ENTER key is pressed without SHIFT handle submission
    if(e.keyCode === 13 && !e.shiftKey){
      e.preventDefault();
      // Only if input is not blank
      if(input.trim() !== ''){
        return handleSubmit();
      }
    }
  }

  return (
    <>
      <Row>
        <div>
        {props.messages.map(m => (
          <Col key={m.id} xs={12}>
            <ChatMessage message={m}/>
          </Col>
        ))}
        </div>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input required type="textarea" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => handleInputKeyDown(e)}
              />
              <InputGroupAddon addonType={'append'}>
                <Button type="submit">Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Chat;
