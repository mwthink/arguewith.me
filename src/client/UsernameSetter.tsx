import * as React from 'react';
import { Button, Form, Input } from 'reactstrap';
import { generatePetName } from '../shared';

export interface UsernameSetterProps {
  initialUsername: string;
  onSubmit: (username:string) => any;
}

interface UsernameSetterState {
  username: string;
}

export class UsernameSetter extends React.Component <UsernameSetterProps,UsernameSetterState> {
  constructor(props:any){
    super(props);
    this.state = {
      username: this.props.initialUsername,
    }
  }

  onSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username)
  }

  render(){
    return (
      <Form onSubmit={this.onSubmit}>
        <Input type="text" required
          value={this.state.username}
          onChange={e => this.setState({username:e.target.value})}
        />
        <Button type="submit">Set Username</Button>
        <Button onClick={e => {e.preventDefault();this.props.onSubmit(generatePetName())}}>Generate Random Name</Button>
      </Form>
    )
  }
}

export default UsernameSetter;
