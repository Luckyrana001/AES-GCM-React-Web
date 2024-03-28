import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const signInData = {
    imeiNumber: "",
    isAutoLogin: "N",
    loginId: "pdc_dealer",
    password: "xm1234",
  };

  const keyBase64 = "U+M3HkGeOvIs2JVlJso1zw==";
  const rawIv = "AAAAAAAAAAAAAAAAAAAAAA==";


  useEffect(() => {
    InitializeEncryption();
  }, []);

  function InitializeEncryption() {
   
    encryptData(keyBase64, JSON.stringify(signInData), rawIv)
      .then((encryptedData) => {
        console.log(encryptedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  

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

    const iv = convertStringIntoBase64ToUint8Array(ivBase64);

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
