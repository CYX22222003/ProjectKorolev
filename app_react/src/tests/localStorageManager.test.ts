import { setLocalStorage, getLocalStorage } from "../utils/localStorageManager";
const key : string = "TestKey";
const value : string = "TestValue"
const faultKey : string = "TestKey123###"

it("Test local storage", () => {
    setLocalStorage(key, value)
    expect(getLocalStorage(key,"")).toEqual(value)
})

it("Test local storage", () => {
    const faultKey : string = "TestKey123###"
    expect(getLocalStorage(faultKey,"")).toEqual("")
})

it('throws an error when localStorage.setItem fails', () => {
    const key = 'testKey';
    const value = { key: 'value' };

    // Mock localStorage.setItem to throw an error
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