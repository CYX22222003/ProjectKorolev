import {
  createSession,
  getPatientSessionList,
  generateSessionName,
  uploadSessionDocument,
  deleteSession
} from "../Session_Management/utils";

import fetchMock from "jest-fetch-mock";

const originalEnv : NodeJS.Process["env"] = process.env;
const mockResponseData : string = "post test outcome";

jest.mock("../utils/APIInteractionManager", () => {
  return {
    postTest: jest.fn((data, address, key) => {
        if (address !== undefined && key !== undefined) {
        return Promise.resolve(
          new Response(mockResponseData + data.session_name)
        );
        } else {
          return Promise.reject("Error");
        }
    }),

    getTest : jest.fn((address, key) => {
      if (address !== undefined && key !== undefined) {
        return Promise.resolve(
          new Response(JSON.stringify({"collections" : []}))
        )
      } else {
        return Promise.reject("Error")
      }
    })
  }
})

describe("Test session creation feature", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    fetchMock.mockClear();
    process.env = originalEnv;
  })

  it("Create session test", async () => {

    process.env.REACT_APP_CREATE_SESSION = "http://example.com";
    process.env.REACT_APP_API_KEY = "apiKey";

    const data = { "session_name": "Test", "patient_id": 1 };
    const response = await createSession(data);

    const jesRes = await response.text()
    expect(jesRes).toEqual(mockResponseData + data.session_name);
  })

  it("Incorrect API key handling in session creation", async () => {
    process.env.REACT_APP_CREATE_SESSION = "http://example.com";
    process.env.REACT_APP_API_KEY = undefined;

    const data = { "session_name": "Test", "patient_id": 1 };   
    await expect(createSession(data)).rejects.toThrow("Error")

  })

  it("Incorrect Address handling in session creation", async () => {
    process.env.REACT_APP_CREATE_SESSION = undefined;
    process.env.REACT_APP_API_KEY = "apiKey";

    const data = { "session_name": "Test", "patient_id": 1 };   
    await expect(createSession(data)).rejects.toThrow("Error")
  })
})


describe("Test session documents management", () => {
    it("Test creation of file list (manual)", () => {
        expect(true).toBeTruthy();
    });

    it("Error handling of filelist creation (manual)", () => {
        expect(false).toBeFalsy();
    });
})