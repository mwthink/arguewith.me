import * as React from 'react';
import { render } from 'react-dom';
import * as SocketIO from 'socket.io-client';
import { generatePetName } from '../shared';
import { SocketIOChatClient } from './ChatClient';
import { BrowserPowSolver } from './BrowserPow';
import App from './App';

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);

// Use different endpoint if in local env
const socketEndpoint = ((['localhost','127.0.0.1'].indexOf(location.hostname) > -1) ? `http://${location.hostname}:3000` : undefined)

const socket = SocketIO(socketEndpoint, {
  // autoConnect: false
});

if(localStorage.getItem('username') === null){
  localStorage.setItem('username', generatePetName());
}

const chatClient = new SocketIOChatClient(socket as any, new BrowserPowSolver());

render(
  <App
    chat={chatClient}
  />
  ,renderTarget
)

// render(
//   <App
//     socket={socket}
//     initialUsername={localStorage.getItem('username')}
//   />
//   ,renderTarget
// )
