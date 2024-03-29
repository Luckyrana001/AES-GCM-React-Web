import { createHash } from 'crypto';

export function generateBasicAuthHeader() {

    const userName = 'ymcauser';
    const password = 'password';
    const requestId = '88888888';


    const hashedPassword = getHashedPassword(password,requestId)
    const newString = userName+':'+hashedPassword;
    const encodedString = btoa(newString);
    const  finalString = encodedString.replace(/\n/g, ''); // Remove newline characters
     console.log("Encoded string:", finalString);

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
      console.log("generatedPassword==========="+generatedPassword)
    } catch (error) {
      console.error('Hashing error:', error);
    }
    return generatedPassword;
  }