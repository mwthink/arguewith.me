import * as SocketIO from 'socket.io'
import { ChatServerI } from './interfaces';
import { SocketChatServer } from './entities';

const io = SocketIO(3000);

const chatServer: ChatServerI = new SocketChatServer(io);
