import * as Http from 'http';
import * as Express from 'express';
import * as SocketIO from 'socket.io';
import { Observable } from 'rxjs';

const port = 3000;
const app = Express();
const server = Http.createServer(app);
const io = SocketIO(server);

const sockets = new Observable<SocketIO.Socket>(sub => {
  io.on('connection', socket => sub.next(socket));
})

sockets.subscribe(socket => {})

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/tpl.html')
})

Promise.resolve()
.then(() => (
  server.listen(port, () => {
    console.log('Listening on port', port);
  })
))
