import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ChatMessageData } from '../shared';

export interface ChatProps {
  messages: ChatMessageData[];

  handleSend: (msg:string) => any;

}

export const Chat: React.FunctionComponent<ChatProps> = props => {
  const [ input, setInput ] = React.useState('');

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handleSend(input);
  }

  return (
    <div>
      {props.messages.map(c => (
        <div key={c.id}>
          <ReactMarkdown source={c.content}/>
        </div>
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
