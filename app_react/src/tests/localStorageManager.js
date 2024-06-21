"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalStorage = exports.setLocalStorage = void 0;
function setLocalStorage(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch (e) {
        throw new Error("Fail to cache the value");
    }
}
exports.setLocalStorage = setLocalStorage;
function getLocalStorage(key, initialValue) {
    try {
        var value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
    }
    catch (e) {
        return initialValue;
    }
}
exports.getLocalStorage = getLocalStorage;
