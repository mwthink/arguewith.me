import * as React from 'react';
import { render } from 'react-dom';
import * as SocketIOClient from 'socket.io-client';
import { generatePetName } from '../shared';
import App from './App';

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);

// Use different endpoint if in local env
const socketEndpoint = ((['localhost','127.0.0.1'].indexOf(location.hostname) > -1) ? `http://${location.hostname}:3000` : undefined)

const socket = SocketIOClient(socketEndpoint);

render(
  <App
    socket={socket}
    initialUsername={localStorage.getItem('username') || generatePetName()}
  />
  ,renderTarget
)
