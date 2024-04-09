import { getFromLocalStorage } from "../utils/localStorageUtils";



//const keyBase64 = "70vNajEqkT4tUmXx7gNzBA==";
//const keyBase64 = getFromLocalStorage("messageKey");
const rawIv = "AAAAAAAAAAAAAAAAAAAAAA==";


 export async function initializeEncryption(signInData,keyBase64) {

  const CryptoJS = require("crypto-js");

  const encryptAES = (plaintext, keyBase64) => {
    const encrypted = CryptoJS.AES.encrypt(plaintext, keyBase64).toString();
    return encrypted;
  };
   
}
//  return await  encryptData(keyBase64, JSON.stringify(signInData), rawIv)
//       .then((encryptedData) => {
//         console.log("encrypted login data-------   "+encryptedData);
//         return encryptedData
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

  

  async function encryptData(keyBase64, data, ivBase64) {
    const algorithm = { name: "AES-GCM", length: 128 };
  
    const keyBuffer = convertStringIntoBase64ToUint8Array(keyBase64);
    // Import key
    const key = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
       // { name: "AES-GCM" },
       algorithm,
        false,
        ["encrypt"]
    );

    const iv = convertStringIntoBase64ToUint8Array(ivBase64)

    // Convert data to ArrayBuffer
    const dataBuffer = new TextEncoder().encode(data);

    // Encrypt data
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        dataBuffer
    );

    // Encode the encrypted data to Base64
    const encryptedBytes = new Uint8Array(encryptedData);
    return btoa(String.fromCharCode(...encryptedBytes));
  }

  function convertStringIntoBase64ToUint8Array(base64String) {
    const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
  }

  // Function to decrypt data using AES-GCM
  async function decryptData(encryptedData, keyRaw) {
    
    const keyArrayBuffer = convertStringIntoBase64ToUint8Array(keyRaw);

    // Import key
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyArrayBuffer,
      { name: "AES-GCM" },
      //algorithm,
      false,
      ["decrypt"]
    );

    const iV = convertStringIntoBase64ToUint8Array(rawIv);

    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iV,
      },
      key,
      encryptedData.ciphertext
    );

    return new TextDecoder().decode(decryptedData);
  }
