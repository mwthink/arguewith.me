import * as React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export type ChatMessageD = {id:string,sender_id:string,content:string,timestamp:number};


export interface ChatMessageProps {
  message: ChatMessageD
}

export const ChatMessage: React.SFC<ChatMessageProps> = (props:ChatMessageProps) => (
  <Card>
    <CardBody>
      <CardTitle>{props.message.sender_id}</CardTitle>
      <CardText>{props.message.content}</CardText>
    </CardBody>
  </Card>
)

export default ChatMessage;