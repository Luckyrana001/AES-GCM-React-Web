import * as React from "react";



import { AES, enc } from 'crypto-js';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

const makeKey = async (key) => {
  return await crypto.subtle.importKey(
    "raw",
    Buffer.from(key, "base64"),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};



export const aesGcmCrypto = async (text) => {
  //const crypto = require('crypto');
  const key = crypto.getRandomValues(new Uint8Array(32)); // 256-bit key
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV

  const plaintext = "Your payload to encrypt";
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();
  const output = Buffer.from(
    iv.toString("hex") + encrypted + tag.toString("hex"),
    "hex"
  ).toString("base64");

  console.log("output string=======" + output)
}

export const encryptSymmetric = async (plaintext) => {
  const key = '1QyFdOlxCnxx3LjENx3+8Q==';

  const iv =  crypto.randomBytes(12)
  //const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedPlaintext = new TextEncoder().encode(plaintext);
  const secretKey = await makeKey(key);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    secretKey,
    encodedPlaintext
  );

  return {
    ciphertext: Buffer.from(ciphertext).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
  };
};



export const decryptSymmetric = async (ciphertext, iv) => {
 //const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const key = "oU+q4YdtdOYXJ5bQfenRTw=="
  const secretKey = await makeKey(key);

  const cleartext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Buffer.from(iv, "base64"),
    },
    secretKey,
    Buffer.from(ciphertext, "base64")
  );
  const data = new TextDecoder().decode(cleartext);
  return data;
};

export const saveToLocalStorage = async (name, data) => {
  const stringified_data = JSON.stringify(data);
  const encrypted_data = await encryptSymmetric(stringified_data);
  console.log("encrypted_data string=======" + JSON.stringify(encrypted_data));
  localStorage.setItem(name, JSON.stringify(encrypted_data));

  
};

export const getFromLocalStorage = async (name) => {
  const raw_data = localStorage.getItem(name);
  if (!raw_data) return null;

  const encrypted_data = JSON.parse(raw_data);
  const decrypted_data = await decryptSymmetric(
    encrypted_data.ciphertext,
    encrypted_data.iv
  );
  const un_stringified_data = JSON.parse(decrypted_data);
  return un_stringified_data;
};

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
