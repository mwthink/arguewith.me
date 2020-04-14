import { createHash } from 'crypto';
import { PowParams, PowSolution, checkHashDifficulty, buildPowString } from '../shared';

export const calcSHA256 = async (str:string): Promise<string> => {
  const hash = createHash('sha256').update(str).digest('hex');
  return hash;
}

export const verifyPowSolution = async (solution:PowSolution, params:PowParams): Promise<boolean> => {
  // Confirm input data shape
  if(
    typeof solution !== 'object'
    || typeof solution.hash !== 'string'
    || typeof solution.nonce !== 'string'
    || typeof solution.salt !== 'string'
    || typeof solution.data !== 'string'
  ){
    return false;
  }

  // Check hash difficulty match
  if(!checkHashDifficulty(solution.hash, params.difficulty)){
    return false;
  }

  // Confirm validity of salt
  if(solution.salt !== params.salt){
    return false;
  }

  // Verify work
  if(await calcSHA256(buildPowString(params, solution.data, solution.nonce)) !== solution.hash){
    return false;
  }

  // Confirm
  return true;
}
