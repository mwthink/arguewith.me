import * as React from 'react';
import { Button, Form, Input } from 'reactstrap';

export interface ChatFormProps {
  disabled?: boolean;
  onSend: (msg:string) => any;
}

interface ChatFormState {
  inputValue: string;
}

export class ChatForm extends React.Component <ChatFormProps, ChatFormState> {
  constructor(props:any){
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  private onSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSend(this.state.inputValue);
  }

  render(){
    return (
      <Form onSubmit={this.onSubmit} disabled={Boolean(this.props.disabled)}>
        <Input
          type="text"
          required
          value={this.state.inputValue}
          onChange={e => this.setState({inputValue:e.target.value})}
          placeholder="Type a message . . ."
        />
        <Button disabled={this.props.disabled} block type="submit">Send</Button>
      </Form>
    )
  }
}

export default ChatForm;
