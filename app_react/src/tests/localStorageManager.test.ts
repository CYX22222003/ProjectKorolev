import { setLocalStorage, getLocalStorage } from "../utils/localStorageManager";

test("Test local storage", () => {
    const key : string = "TestKey";
    const value : string = "TestValue"
    setLocalStorage(key, value)
    expect(getLocalStorage(key,"")).toBe(value)
})