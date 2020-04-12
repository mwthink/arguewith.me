import { createHash } from 'crypto';
import { AuthResponse, checkHashDifficulty } from '../shared';

export const calcSHA256 = async (str:string): Promise<string> => {
  const hash = createHash('sha256').update(str).digest('hex');
  return hash;
}

export const verifyAuthResponse = async (auth:AuthResponse, difficulty:number, salt:string): Promise<boolean> => {
  // Confirm input data shape
  if(
    typeof auth !== 'object'
    || typeof auth.hash !== 'string'
    || typeof auth.nonce !== 'string'
    || typeof auth.salt !== 'string'
    || typeof auth.username !== 'string'
  ){
    return false;
  }

  // Check hash difficulty match
  if(!checkHashDifficulty(auth.hash, difficulty)){
    return false;
  }

  // Confirm validity of salt
  if(auth.salt !== salt){
    return false;
  }

  // Verify work
  const hashStr = [auth.username, auth.salt, auth.nonce].join('');
  if(await calcSHA256(hashStr) !== auth.hash){
    return false;
  }

  // Confirm
  return true;
}
