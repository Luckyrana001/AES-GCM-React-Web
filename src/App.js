import logo from './logo.svg';
import './App.css';
import { encrypt, getFromLocalStorage, saveToLocalStorage } from "./encrypter";
import { useEffect, useState } from 'react';
import Aes256Gcm from 'aes-256-gcm';
import * as crypto from "crypto";

function App() {
  const [clientInfo, setClientInfo] = useState(null);

  const CryptoJS = require("crypto-js");
const imeiNumber = '';
const isAutoLogin = 'N';
const loginId = 'pdc_dealer';
const password = 'ytlc@xm1234';
//{"imeiNumber":"","isAutoLogin":"N","loginId":"pdc_dealer","password":"ytlc@xm1234"}
                                     
  const signInData = {
    imeiNumber: imeiNumber,
    isAutoLogin: isAutoLogin,
    loginId:loginId,
    password:password
  };


function finalMethod(){
   const keyBase64 = "U+M3HkGeOvIs2JVlJso1zw==";
   const iv  = 'AAAAAAAAAAAAAAAAAAAAAA==';
  
    encryptWithOwnKey(keyBase64,JSON.stringify(signInData),iv).then((encryptedData) => {
    
    console.log(encryptedData);
   
    const encodedString = Buffer.from(encryptedData).toString('base64');
    console.log("base 64=====   "+encodedString);
 
}).catch((error) => {
    console.error(error);
});


}
function base64ToUint8Array(base64String) {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}


// Function to decrypt data using AES-GCM
async function decryptData(encryptedData, keyRaw) {
  const keyBase64 = "n90319fy/AccgSe+GfXWuQ==";
 // Convert key from Base64 to Uint8Array
 const keyBuffer = Uint8Array.from(atob(keyRaw), c => c.charCodeAt(0));
// // Assume `key` and `iv` are received securely from the server
// const key1 = await crypto.subtle.importKey(
//   "raw",
//   /* your_server_encryption_key_here (in Uint8Array format) */
//   keyBuffer,
//   { name: "AES-GCM" },
//   false,
//   ["decrypt"]
// );

const keyArrayBuffer = base64ToUint8Array(keyRaw);

 // Import key
 const key = await window.crypto.subtle.importKey(
     "raw",
     keyArrayBuffer,
     { name: "AES-GCM" },
    //algorithm,
     false,
     ["decrypt"]
 );

 const iV = new Uint8Array(12);
 
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
function base64ToUint8Array(base64String) {
  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function encryptWithOwnKey(keyBase64,data,ivBase64) {


  const algorithm = { name: "AES-GCM", length: 128 };
  
    const keyBuffer = base64ToUint8Array(keyBase64);
    // Import key
    const key = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
       // { name: "AES-GCM" },
       algorithm,
        false,
        ["encrypt"]
    );

    const iv = base64ToUint8Array(ivBase64)

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

 
useEffect(() => {


     finalMethod()
  
 }, []);




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 
        </a>
      </header>
    </div>
  );
}

export default App;
