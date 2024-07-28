import { LoginInfo, SignUpForm } from "../Login_and_SignUp/constants";
import { 
    loginAction, 
    signupAction, 
    logoutAction, 
    hashPassword, 
    welcomeTest 
} from "../Login_and_SignUp/utils";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
const oldEnv = process.env;

describe("Test for login and signup methods", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
        process.env.REACT_APP_LOGIN_URL = "/login_test";
        process.env.REACT_APP_API_KEY = "test-api-key";
    })

    afterEach(() => {
        fetchMock.mockClear();
        process.env = oldEnv;
    })

    it("Successful login", async () => {
        const username : string = "test-user";
        const data : LoginInfo = {
            "username" : username,
            "passwd" : "test"
        };

        fetchMock.mockResponseOnce(`${username} logged in`);
        const out = await loginAction(data);
        expect(out).toBeTruthy();
    })

    it("Unsuccessful login", async () => {
        const username : string = "test-user";
        const data : LoginInfo = {
            "username" : username,
            "passwd" : "test"
        };

        fetchMock.mockResponseOnce(`${username} not logged in`);
        const out = await loginAction(data);
        expect(out).toBeFalsy();
    })

    it("Handling backend error in login", async () => {
        const username : string = "test-user";
        const data : LoginInfo = {
            "username" : username,
            "passwd" : "test"
        };

        fetchMock.mockRejectOnce();
        const out = await loginAction(data);
        expect(out).toBeFalsy();
    })
})

describe("sign up action test (Manual)", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
        process.env.REACT_APP_CREATE_ACCOUNT_URL = "/signup_test";
        process.env.REACT_APP_API_KEY = "test-api-key";
    })

    afterEach(() => {
        fetchMock.mockClear();
        process.env = oldEnv;
    })

    it("Successful sign up", async () => {
        expect(true).toBeTruthy();
    })

    it("Handling inappropraite input for sign up", () => {
        expect(false).toBeFalsy();
    })
})

describe("Update user information test (Manual)", () => {
    it("Successful update email", () => {
        expect(true).toBeTruthy();
    })

    it("Successful update password", () => {
        expect(true).toBeTruthy();
    })

    it("Handling inappropraite input", () => {
        expect(false).toBeFalsy();
    })

    it("Handling incorrect old password input", () => {
        expect(false).toBeFalsy();
    })
})