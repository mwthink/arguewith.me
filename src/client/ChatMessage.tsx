import * as React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { ChatMessageData } from '../shared';


export interface ChatMessageProps {
  message: ChatMessageData
}

export const ChatMessage: React.SFC<ChatMessageProps> = (props:ChatMessageProps) => (
  <Card>
    <CardBody>
      <CardTitle><span className="font-weight-bold">{props.message.sender_id}</span> - <small className="text-muted">{new Date(props.message.timestamp).toLocaleTimeString()}</small></CardTitle>
      <CardText>{props.message.content}</CardText>
    </CardBody>
  </Card>
)

export default ChatMessage;
