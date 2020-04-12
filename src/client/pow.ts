// pow.ts - Contains methods used for proof-of-work auth system
import { AuthParams, AuthResponse, checkHashDifficulty } from '../shared';

/**
 * Given an input string, calculate the SHA256 hash of it
 * @param  str
 */
export const calcSHA256 = async (str:string): Promise<string> => {
  const strBuff = new TextEncoder().encode(str);
  const hashBuff = await crypto.subtle.digest('SHA-256', strBuff);
  const hashArr = Array.from(new Uint8Array(hashBuff));
  const hashHex = hashArr.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}

/**
 * Attempt to calculate a valid PoW hash given a string and difficulty
 * @param  str           Input string to hash
 * @param  difficulty    Difficulty target
 * @param  maxIterations Maximum amount of cycles to run for
 * @return               A map of strings with keys (str, nonce)
 */
export const doProofWork = async (str:string, difficulty:number, maxIterations:number): Promise<{str:string, nonce:string, hash:string}> => {
  let i = 0;
  let valid: {str:string,nonce:string,hash:string} = null;
  do {
    const nonce = String(Math.random());
    const hash = await calcSHA256([str, nonce].join(''));
    if(checkHashDifficulty(hash, difficulty)){
      valid = {str, nonce, hash};
    }
    i++;
  }
  while(i < maxIterations && valid === null);
  return valid;
}

export const proveWorkUsername = async (username:string, params:AuthParams, maxIterations:number = 100000): Promise<AuthResponse> => {
  const proveString = [username, params.salt].join('');
  const workProof = await doProofWork(proveString, params.difficulty, maxIterations);
  return {
    salt: params.salt,
    nonce: workProof.nonce,
    username: username,
    hash: workProof.hash
  }
}
