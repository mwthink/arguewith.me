import * as React from 'react';
import { render } from 'react-dom';
import * as SocketIOClient from 'socket.io-client';
import { AuthParams } from '../shared';
import { proveWorkUsername } from './pow';
import App from './App';

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);

const socket = SocketIOClient('http://localhost:3000');

socket.on('authparams', async (authParams: AuthParams) => {
  const username = 'devuser';
  const idProof = await proveWorkUsername(username, authParams);
  socket.emit('authentication', {...idProof})
})

render(
  <App socket={socket}/>
  ,renderTarget
)
