import { passwordValidator, usernameValidator } from "../utils/formatValidator";
import { hashPassword } from "../Login_and_SignUp/utils";
import { SHA256 } from "crypto-js";

describe("Validate user input",() => {
    it("Username validator test",
        () => {
            expect(usernameValidator("user-123")).toEqual(true);
            expect(usernameValidator("_123_a")).toEqual(false);
            expect(usernameValidator("ABC")).toEqual(false);
            expect(usernameValidator("abc-12#")).toEqual(false);
        }
    )

    it("Password validator test",
        () => {
            expect(passwordValidator("test123#")).toEqual(true);
            expect(passwordValidator("test123456")).toEqual(false);
            expect(passwordValidator("")).toEqual(false);
            expect(passwordValidator("#$!12")).toEqual(false);
        }
    )

    it("password hasher test", 
        () => {
            const password = "test123";
            const hashPwd = SHA256(password).toString();
            
            expect(hashPassword(password)).toEqual(hashPwd)
            expect(hashPassword('')).toEqual(SHA256('').toString())
        }
    )
})