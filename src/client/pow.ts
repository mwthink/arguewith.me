// pow.ts - Contains methods used for proof-of-work auth system

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
 * Determine if the given hash is valid for the given difficulty
 * @param  hash       SHA256 hash string
 * @param  difficulty The difficulty level to calculate for
 * @return boolean
 */
const checkHashDifficulty = (hash:string, difficulty:number): boolean => (
  hash.substr(0, difficulty) === new Array(difficulty).fill('0').join('')
)

/**
 * Attempt to calculate a valid PoW hash given a string and difficulty
 * @param  str           Input string to hash
 * @param  difficulty    Difficulty target
 * @param  maxIterations Maximum amount of cycles to run for
 * @return               A map of strings with keys (str, nonce)
 */
export const doProofWork = async (str:string, difficulty:number, maxIterations:number): Promise<{str:string, nonce:string}> => {
  let i = 0;
  let valid: {str:string,nonce:string} = null;
  do {
    const nonce = String(Math.random());
    const workHash = await calcSHA256(str + nonce);
    if(checkHashDifficulty(workHash, difficulty)){
      valid = {str, nonce};
    }
    i++;
  }
  while(i < maxIterations && valid === null);
  return valid;
}
