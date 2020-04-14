export type ChatMessageData = {
  id: string;
  sender_id: string;
  sender_display_name?: string;
  content: string;
  timestamp: number;
}

export type PowParams = {
  difficulty: number;
  salt: string;
}

export type PowSolution = {
  salt: string;
  nonce: string;
  data: string;
  hash: string;
}
