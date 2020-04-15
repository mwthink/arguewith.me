import * as React from 'react';
import {
  Button, Input, FormGroup, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export interface SettingsProps {
  clientUsername: string;
  setClientUsername: (newUsername:string) => any;
}

export const Settings: React.FunctionComponent<SettingsProps> = (props) => {
  const [ modal, setModal ] = React.useState(false);
  const [ usernameValue, setUsernameValue ] = React.useState(props.clientUsername);
  const toggle = () => {
    setUsernameValue(props.clientUsername);
    setModal(!modal);
  }

  const saveSettings = () => {
    props.setClientUsername(usernameValue);
    toggle();
  }

  return (
    <div>
      <Button block outline onClick={toggle}>Settings</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Settings</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Username</Label>
            <Input type='text' value={usernameValue} onChange={e => setUsernameValue(e.target.value)}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={()=>saveSettings()}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Settings;
