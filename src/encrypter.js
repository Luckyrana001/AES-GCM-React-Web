import { Buffer } from 'buffer';
import * as React from "react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import * as crypt from "crypto";

// @ts-ignore
window.Buffer = Buffer;

const ALGORITHM = 'aes-256-gcm';
const BLOCK_SIZE_BYTES = 16; // 128 bit

export const encrypt = async(text, secret) => {try {
  
    const crypt = require('crypto');
  
    const iv = crypt.randomBytes(BLOCK_SIZE_BYTES);
    const cipher = crypt.createCipheriv(ALGORITHM, secret, iv);
  
    let ciphertext = cipher.update(text, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    return {
      ciphertext,
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
    };
} catch (error) {
   console.log(error)
}
}


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

export const encryptSymmetric = async (plaintext) => {
  const key = "lQ670IgFFA4ckmz8cfZC2Q==";//crypto.getRandomValues(new Uint8Array(32));
 // const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  console.log("encrypted_data====="+JSON.stringify(iv))

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
  const key = crypto.getRandomValues(new Uint8Array(32));

  //const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
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
  console.log("stringified_data====="+stringified_data)
  const encrypted_data = await encryptSymmetric(stringified_data);
  console.log("encrypted_data====="+JSON.stringify(encrypted_data))
  localStorage.setItem(name, JSON.stringify(encrypted_data));
};

export const getFromLocalStorage = async (name) => {
  const raw_data = localStorage.getItem(name);
  console.log("raw_data====="+JSON.stringify(raw_data))
  if (!raw_data) return null;

  const encrypted_data = JSON.parse(raw_data);
  const decrypted_data = await decryptSymmetric(
    encrypted_data.ciphertext,
    encrypted_data.iv
  );
  const un_stringified_data = JSON.parse(decrypted_data);
  console.log("decrypted_data====="+un_stringified_data)
  return un_stringified_data;
};

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
