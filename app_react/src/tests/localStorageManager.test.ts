import { setLocalStorage, getLocalStorage } from "../utils/localStorageManager";
const key : string = "TestKey";
const value : string = "TestValue"
const faultKey : string = "TestKey123###"

test("Test local storage", () => {
    setLocalStorage(key, value)
    expect(getLocalStorage(key,"")).toBe(value)
    expect(getLocalStorage(faultKey,"")).toBe("")
    //expect(setLocalStorage(key, undefined))
})
