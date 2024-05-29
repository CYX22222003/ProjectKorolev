export function setLocalStorage(key : string, value : string) : void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        throw new Error("Fail to cache the value");
    }
  }
  
export function getLocalStorage(key : string, initialValue : string) : string {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  }