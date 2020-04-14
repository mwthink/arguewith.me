import * as React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';

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
  private onSubmit = (e?:React.SyntheticEvent<HTMLFormElement>) => {
    if(e){
      e.preventDefault();
    }
    this.props.onSend(this.state.inputValue);
  }

  render(){
    return (
      <div>
        <InputGroup>
          <Input
            autoFocus={true}
            type="textarea"
            required
            value={this.state.inputValue}
            onChange={e => this.setState({inputValue:e.target.value})}
            placeholder="Type a message . . ."
            onKeyDown={e => {
              // If key is 'ENTER' and shift is not pressed, submit the form rather than newline
              if(!e.shiftKey && [13].indexOf(e.keyCode) > -1){
                e.preventDefault();
                this.onSubmit();
              }
            }}
          />
          <InputGroupAddon addonType="append">
            <Button>Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }
}

export default ChatForm;
