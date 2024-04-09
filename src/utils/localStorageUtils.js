// localStorageUtils.js

// Function to save data to local storage
export const saveToLocalStorage = (key, data) => {
    try {
      //localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(key, data);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  export const saveToLocalStorageJsonObject = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
     // localStorage.setItem(key, data);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  // Function to retrieve data from local storage
  export const getFromLocalStorageJsonObject = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error fetching from localStorage:', error);
      return null;
    }
  };

   // Function to retrieve data from local storage
   export const getFromLocalStorage = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? data : null;
    } catch (error) {
      console.error('Error fetching from localStorage:', error);
      return null;
    }
  };
  