import * as Http from 'http';
import * as Path from 'path';
import * as Express from 'express';
import * as SocketIO from 'socket.io'
import { ChatServerI } from './interfaces';
import { SocketChatServer } from './entities';

const port = 3000;
const app = Express();
const server = Http.createServer(app);
const io = SocketIO(server);

const chatServer: ChatServerI = new SocketChatServer(io);

if( (process.env['SERVE_STATIC']||'false').toLowerCase() === 'true' ){
  const staticPath = Path.resolve(__dirname, '../client');
  console.log('Serving static assets from', staticPath);
  app.use(Express.static(staticPath));
}

Promise.resolve()
.then(() => (
  server.listen(port, () => {
    console.log('Listening on port', port);
  })
))

function shutdown(){
  chatServer.send('Server is shutting down');
  setTimeout(() => {
    process.exit();
  }, 1000)
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
