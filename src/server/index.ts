import * as Http from 'http';
import * as Express from 'express';
import * as SocketIO from 'socket.io';
import { Observable, ReplaySubject } from 'rxjs';
import { v4 as uuid4} from 'uuid';
import { verifyAuthResponse } from './pow';
import { AuthParams, AuthResponse, ChatMessageData } from '../shared';

const port = 3000;
const app = Express();
const server = Http.createServer(app);
const io = SocketIO(server);
(io.engine as any).generateId = () => {
  return uuid4();
}

const messagePool = new ReplaySubject<ChatMessageData>(3);
const sockets = new Observable<SocketIO.Socket>(sub => {
  io.on('connection', socket => {
    const authParams: AuthParams = {
      difficulty: 3,
      salt: String(Math.random())
    };
    socket.emit('authparams', authParams)
    socket.on('authentication', async (payload: AuthResponse) => {
      if(await verifyAuthResponse(payload, authParams.difficulty, authParams.salt)){
        // Socket has successfully authenticated, send it into the stream
        socket['username'] = payload.username;
        return sub.next(socket);
      }
      return socket.disconnect(true);
    })
  });
})

sockets.subscribe(socket => {
  // console.log('got socket connection @', new Date().toLocaleTimeString());

  socket.on('message', (msg) => {
    // console.log('got message from', socket.id, `that says "${msg}"`);
    messagePool.next({
      id: String(Math.random()),
      sender_id: socket.id,
      sender_display_name: socket['username'],
      content: msg,
      timestamp: Date.now()
    });
  })

  messagePool.subscribe(msg => {
    socket.send(msg);
  })
})

Promise.resolve()
.then(() => (
  server.listen(port, () => {
    console.log('Listening on port', port);
  })
))
