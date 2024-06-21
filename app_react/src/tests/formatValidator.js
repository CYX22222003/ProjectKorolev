"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.usernameValidator = void 0;
function usernameValidator(username) {
    var reg = /^[a-z0-9][a-z0-9-]+$/;
    return reg.test(username);
}
exports.usernameValidator = usernameValidator;
function passwordValidator(password) {
    var reg = /^(?=.*[\W_]+).{6,}$/;
    return reg.test(password);
}
exports.passwordValidator = passwordValidator;
