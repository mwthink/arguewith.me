import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { ChatMessageData } from '../shared';

export interface ChatServerI {
  readonly sockets: Observable<Socket>;
  readonly messages: Observable<ChatMessageData>;

  send(msgContent:string): Promise<void>;
}
