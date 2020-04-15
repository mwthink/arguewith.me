import { PowSolverI, PowParams } from '../shared';
import { buildPowString, checkHashDifficulty } from '../shared';

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

export class BrowserPowSolver implements PowSolverI {
  async solve(params:PowParams, data:string){
    let nonce = null;
    let validHash = null;
    do {
      nonce = String(Math.random());
      const hash = await calcSHA256(buildPowString(params, data, nonce));
      if(checkHashDifficulty(hash, params.difficulty)){
        validHash = hash;
      }
    }
    while(validHash === null)
    return {
      salt: params.salt,
      nonce: nonce,
      data: data,
      hash: validHash
    }
  }
}
