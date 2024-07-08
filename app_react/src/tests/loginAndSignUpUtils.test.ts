import { LoginInfo } from "../Login_and_SignUp/constants";
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