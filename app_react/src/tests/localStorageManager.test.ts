import { setLocalStorage, getLocalStorage } from "../utils/localStorageManager";
const key : string = "TestKey";
const value : string = "TestValue"
const faultKey : string = "TestKey123###"

describe("Test the use of local storage", () => {
it("Test for storing value", () => {
    setLocalStorage(key, value)
    expect(getLocalStorage(key,"")).toEqual(value)
})

it("Test for extracting storage", () => {
    const faultKey : string = "TestKey123###"
    expect(getLocalStorage(faultKey,"")).toEqual("")
})

it('throws an error when localStorage.setItem fails', () => {
    const key = 'testKey';
    const value = { key: 'value' };
    
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(() => {
        throw new Error('LocalStorage error');
    });

    expect(() => setLocalStorage(key, value)).toThrow('Fail to cache the value');
});

it("throws an error when localStorage.getItem fails", () => {
    jest.spyOn(window.localStorage.__proto__, "getItem").mockImplementation(() => {
        throw new Error("Local Storage error");
    })

    expect(getLocalStorage(faultKey, "test")).toEqual("test");
})
});