import * as React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import * as ReactMarkdown from 'react-markdown';
import { ChatMessageData } from '../shared';

const Timestamp: React.SFC<{time:number}> = props => (
  <small className="text-muted">
    {new Date(props.time).toLocaleTimeString()}
  </small>
)

export interface ChatMessageProps {
  message: ChatMessageData
}

export const ChatMessage: React.SFC<ChatMessageProps> = (props:ChatMessageProps) => (
  <Card>
    <CardBody>
      <CardTitle style={{cursor:'default'}}>
        <span className="font-weight-bold">{props.message.sender_display_name || props.message.sender_id}</span> - <Timestamp time={props.message.timestamp}/>
      </CardTitle>
      <ReactMarkdown source={props.message.content}/>
    </CardBody>
  </Card>
)

export default ChatMessage;
