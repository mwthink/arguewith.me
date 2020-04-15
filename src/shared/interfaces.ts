import { Observable } from 'rxjs';
import { ChatMessageData, PowParams, PowSolution } from './types';

export interface ChatClientI {
  readonly messages: Observable<ChatMessageData>;
  readonly authenticated: Observable<boolean>;
  readonly ready: Observable<boolean>;
  readonly connected: Observable<boolean>;
  readonly username: string;

  sendMessage(content:string): Promise<void>;
  setUsername(newName:string): any;
}

export interface PowSolverI {
  solve(params:PowParams, data: string): Promise<PowSolution>;
}

export interface PowValidatorI {
  verify(solution:PowSolution): Promise<boolean>;
}
