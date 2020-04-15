import * as SocketIO from 'socket.io'
import { ChatServerI } from './interfaces';
import { SocketChatServer } from './entities';

const io = SocketIO(3000);

const chatServer: ChatServerI = new SocketChatServer(io);

function shutdown(){
  chatServer.send('Server is shutting down');
  setTimeout(() => {
    process.exit();
  }, 1000)
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
