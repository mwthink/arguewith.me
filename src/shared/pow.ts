import { PowParams } from './types';

/**
 * Determine if the given hash is valid for the given difficulty
 * @param  hash       SHA256 hash string
 * @param  difficulty The difficulty level to calculate for
 * @return boolean
 */
export const checkHashDifficulty = (hash:string, difficulty:number): boolean => (
  hash.substr(0, difficulty) === new Array(difficulty).fill('0').join('')
)

export const buildPowString = (params:PowParams, data:string, nonce:string) => (
  [params.salt, data, nonce].join('')
)
