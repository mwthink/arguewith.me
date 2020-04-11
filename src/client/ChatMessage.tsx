import * as React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { ChatMessageData } from '../shared';


export interface ChatMessageProps {
  message: ChatMessageData
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