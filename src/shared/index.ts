export * from './docker-names';

export type ChatMessageData = {
  id: string;
  sender_id: string;
  sender_display_name?: string;
  content: string;
  timestamp: number;
}

export type AuthParams = {
  difficulty: number;
  salt: string;
}

export type AuthResponse = {
  salt: string;
  nonce: string;
  username: string;
  hash: string;
};

/**
 * Determine if the given hash is valid for the given difficulty
 * @param  hash       SHA256 hash string
 * @param  difficulty The difficulty level to calculate for
 * @return boolean
 */
export const checkHashDifficulty = (hash:string, difficulty:number): boolean => (
  hash.substr(0, difficulty) === new Array(difficulty).fill('0').join('')
)
