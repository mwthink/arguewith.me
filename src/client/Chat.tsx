import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ChatMessageData } from '../shared';
import { Alert, Col, Row } from 'reactstrap';

export interface ChatMessageProps {
  message: ChatMessageData;
}
export const ChatMessage: React.SFC<ChatMessageProps> = ({message}) => (
  <Alert color={'dark'}>
    <small>
      <span className={'font-weight-bold'}>{message.sender_display_name}{' @ '}</span>
      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
    </small>
    <ReactMarkdown source={message.content}/>
  </Alert>
)

export interface ChatProps {
  messages: ChatMessageData[];
  handleSend: (msg:string) => any;
}
export const Chat: React.FunctionComponent<ChatProps> = props => {
  const [ input, setInput ] = React.useState('');

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleSend(input);
    setInput('');
  }

  return (
    <div>
      {props.messages.map(m => (
        <ChatMessage key={m.id} message={m}/>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <textarea required value={input} onChange={e => setInput(e.target.value)}>
          </textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;
