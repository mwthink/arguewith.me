import { Socket, Server as SocketServer } from 'socket.io';
import { Subject, ReplaySubject } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { ChatServerI } from './interfaces';
import { ChatMessageData, PowParams, PowSolution } from '../shared';
import { verifyPowSolution } from './pow';

const generatePowParams = (): PowParams => ({
  difficulty: 1,
  salt: String(Math.random())
})

export class SocketChatServer implements ChatServerI {
  readonly sockets: Subject<Socket>;
  readonly messages: ReplaySubject<ChatMessageData>;

  constructor(io:SocketServer){
    this.sockets = new Subject<Socket>();
    this.messages = new ReplaySubject<ChatMessageData>(0);

    // Listen for incoming connections and authenticate them
    // After authentication, put them into the sockets stream
    io.on('connection', socket => {
      const powParams = generatePowParams();
      socket.emit('authcheck', powParams);
      socket.on('authsolution', async (solution:PowSolution) => {
        if(await verifyPowSolution(solution, powParams)){
          socket['username'] = solution.data;
          return this.sockets.next(socket);
        }
        // Failed authcheck, kick them
        return socket.disconnect();
      })
    });

    this.sockets.subscribe(socket => {
      socket.emit('authenticated');
      this.messages.subscribe(msg => socket.send(msg))

      socket.on('message', (msgContent:string) => {
        this.messages.next({
          id: uuid4(),
          sender_id: socket.id,
          sender_display_name: socket['username'],
          content: msgContent,
          timestamp: Date.now()
        })
      })
    })

  }

  async send(msgContent:string){
    return this.messages.next({
      id: uuid4(),
      sender_id: 'SERVER',
      sender_display_name: '[Server]',
      content: msgContent,
      timestamp: Date.now()
    })
  }
}
