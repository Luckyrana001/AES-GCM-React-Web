// localStorageUtils.js

import { BASIC_AUTH_TOKKEN, MESSAGE_KEY, SESSION_ID } from "../constants/LocalStorageKeyValuePairString";
import DebugLog from "./DebugLog";

// Function to save data to local storage
export const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, data);
      DebugLog("saved "+key+" to local storage-====="+data)
    } catch (error) {
      console.error('Error saving '+key+' to localStorage:', error);
    }
  };
  export const saveToLocalStorageJsonObject = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      DebugLog("saved "+key+" to local storage====="+JSON.stringify(data))
    } catch (error) {
      console.error('Error saving '+key+' to localStorage:', error);
    }
  };
  
  // Function to retrieve data from local storage
  export const getFromLocalStorageJsonObject = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error fetching '+key+' from localStorage:', error);
      return null;
    }
  };

   // Function to retrieve data from local storage
   export const getFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? data : null;
    } catch (error) {
      console.error('Error fetching '+key+' from localStorage:', error);
      return null;
    }
  };

  export const deleteAllKeyFromLocalStorage = () => {
    const allKeys = [BASIC_AUTH_TOKKEN, MESSAGE_KEY, SESSION_ID];
    allKeys.forEach(item => {
      deleteLocalStorageKey(item)
    });
    
  }


   const deleteLocalStorageKey = (keyToDelete) => {
    try {
      localStorage.removeItem(keyToDelete);
    } catch (error) {
      console.error('Error while deleting '+keyToDelete+' key:', error);
    }
  };
  