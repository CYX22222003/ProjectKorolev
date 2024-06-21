import { passwordValidator, usernameValidator } from "./formatValidator";

test("Username validator test:",
    () => {
        expect(usernameValidator("user-123")).toEqual(true);
        expect(usernameValidator("_123_a")).toEqual(false);
        expect(usernameValidator("ABC")).toEqual(false);
        expect(usernameValidator("abc-12#")).toEqual(false);
    }
)

test("Password validator test",
    () => {
        expect(passwordValidator("test123#")).toEqual(true);
        expect(passwordValidator("test123456")).toEqual(false);
        expect(passwordValidator("")).toEqual(false);
        expect(passwordValidator("#$!12")).toEqual(false);
    }
)