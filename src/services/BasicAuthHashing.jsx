import { createHash } from 'crypto';
import DebugLog from '../utils/DebugLog';

export function generateBasicAuthHeader() {

    const userName = process.env.REACT_APP_USER_NAME;
    const password =  process.env.REACT_APP_USER_PASSWORD;
    const requestId =  process.env.REACT_APP_USER_REQUEST_NO;


    const hashedPassword = getHashedPassword(password,requestId)
    const newString = userName+':'+hashedPassword;
    const encodedString = btoa(newString);
    const  finalString = encodedString.replace(/\n/g, ''); // Remove newline characters
    DebugLog("Encoded string:", finalString);

     return finalString;

  }

 function getHashedPassword(passwordToHash, salt) {
    let generatedPassword = null;
    try {
      const md5Hash = createHash('md5');
      md5Hash.update(salt);
      md5Hash.update(passwordToHash);
      const hashResult = md5Hash.digest();
      const base64Encoded = Buffer.from(hashResult).toString('base64');
      generatedPassword = base64Encoded.replace(/\n/g, ''); // Remove newline characters
      DebugLog("generatedPassword==========="+generatedPassword)
    } catch (error) {
      DebugLog('Hashing error:', error);
    }
    return generatedPassword;
  }