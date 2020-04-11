import * as Http from 'http';
import * as Express from 'express';
import * as SocketIO from 'socket.io';
import { Observable, ReplaySubject } from 'rxjs';

const port = 3000;
const app = Express();
const server = Http.createServer(app);
const io = SocketIO(server);
const messagePool = new ReplaySubject<{id:string,sender_id:string,content:string,timestamp:number}>(3);

const sockets = new Observable<SocketIO.Socket>(sub => {
  io.on('connection', socket => sub.next(socket));
})

sockets.subscribe(socket => {
  console.log('got socket connection @', new Date().toLocaleTimeString())

  socket.on('message', (msg) => {
    console.log('got message from', socket.id, `that says "${msg}"`);
    messagePool.next({id:String(Math.random()),sender_id:socket.id,content:msg,timestamp:Date.now()});
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
