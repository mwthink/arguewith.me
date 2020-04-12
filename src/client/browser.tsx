import * as React from 'react';
import { render } from 'react-dom';
import * as SocketIOClient from 'socket.io-client';
import { generatePetName } from '../shared';
import App from './App';

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);

const socket = SocketIOClient('http://localhost:3000');

render(
  <App
    socket={socket}
    initialUsername={localStorage.getItem('username') || generatePetName()}
  />
  ,renderTarget
)
