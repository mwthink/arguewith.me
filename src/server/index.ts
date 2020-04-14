import * as Http from 'http';
import * as Path from 'path';
import * as Express from 'express';
import * as SocketIO from 'socket.io';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
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


const userCount = new BehaviorSubject<number>(0);
const messagePool = new ReplaySubject<ChatMessageData>(Number(process.env['MESSAGE_POOL_SIZE' || 100]));
const sockets = new Observable<SocketIO.Socket>(sub => {
  io.on('connection', socket => {
    const authParams: AuthParams = {
      difficulty: Number(process.env['POW_DIFFICULTY'] || 3),
      salt: String(Math.random())
    };
    socket.emit('authparams', authParams)

    // If client is not authenticated by the authDeadlineSeconds, kick them out
    const authDeadlineSeconds = 20;
    const authTimeout = setTimeout(() => {
      socket.disconnect();
    }, authDeadlineSeconds * 1000)

    socket.on('authentication', async (payload: AuthResponse) => {
      if(await verifyAuthResponse(payload, authParams.difficulty, authParams.salt)){
        // Socket has successfully authenticated, send it into the stream
        clearTimeout(authTimeout);
        socket['username'] = payload.username;
        socket.emit('authenticated');
        return sub.next(socket);
      }
      return socket.disconnect(true);
    })
  });
})

userCount.subscribe(userCount => {
  io.emit('usercount', userCount);
})

sockets.subscribe(socket => {
  // console.log('got socket connection @', new Date().toLocaleTimeString());
  userCount.next(userCount.getValue() + 1);
  socket.on('disconnect', () => userCount.next(userCount.getValue() - 1))

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

if( (process.env['SERVE_STATIC']||'false').toLowerCase() === 'true' ){
  const staticPath = Path.resolve(__dirname,'../client');
  console.log('Serving static assets from', staticPath);
  app.use(Express.static(staticPath))
}

Promise.resolve()
.then(() => (
  server.listen(port, () => {
    console.log('Listening on port', port);
  })
))
