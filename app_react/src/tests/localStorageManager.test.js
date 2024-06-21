import { getLocalStorage, setLocalStorage } from "./localStorageManager";

test("Local Storage Manager test", () => {
    const testKey = "StorageManagerTestKey";
    const testStr = "Test document";
    try {
        setLocalStorage(testKey, testStr);
        expect(getLocalStorage(testKey,"")).toEqual(testStr);
        expect(getLocalStorage(testKey+"#", "") === testStr ).toBe(false)
    } catch (err) {
        throw new Error(err);
    }
})