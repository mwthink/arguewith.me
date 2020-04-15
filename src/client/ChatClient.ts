import * as SocketIO from 'socket.io-client';
import { Observable, Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { ChatClientI, ChatMessageData } from '../shared';
import { PowSolverI, PowParams } from '../shared';

export class SocketIOChatClient implements ChatClientI {
  private readonly socket: SocketIO.Socket;
  private readonly authRequests: Observable<PowParams>;

  readonly messages: Observable<ChatMessageData>;
  readonly authenticated: Subject<boolean>;
  readonly connected: Subject<boolean>;
  readonly ready: Subject<boolean>;

  username: string;

  constructor(socket:SocketIO.Socket, solver:PowSolverI){
    this.socket = socket;
    this.username = 'my_username';

    this.authRequests = fromEvent<PowParams>(this.socket, 'authcheck');

    this.messages = fromEvent<ChatMessageData>(this.socket, 'message');
    this.authenticated = new BehaviorSubject(false);
    this.connected = new BehaviorSubject(socket.connected);
    this.ready = new BehaviorSubject<boolean>(false);

    this.socket.on('connect', () => {
      this.connected.next(true)
    })
    this.socket.on('disconnect', () => {
      this.connected.next(false);
      this.ready.next(false);
    })

    this.authRequests.subscribe( async (req) => {
      const solution = await solver.solve(req, this.username)
      this.socket.emit('authsolution', solution);
    })

    this.socket.on('authenticated', () => this.authenticated.next(true))

    this.authenticated.subscribe(isAuthed => {
      this.ready.next(isAuthed)
    })
  }

  async sendMessage(content:string){
    console.log('sending msg');
    this.socket.send(content);
  }

  async setUsername(newUsername:string){
    this.username = newUsername;
    this.socket.disconnect();
    (this.socket as any).connect();
  }
}

export default SocketIOChatClient;
