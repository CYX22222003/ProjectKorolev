import fetchMock from "jest-fetch-mock";
import { TriggerAIRequest, TriggerAIAction } from "../GenAI_Management/utils";
import { triggerMultipleAnalysis } from "../Trend_Analysis/utils";

fetchMock.enableMocks();
const oldEnv = process.env;

describe("GenAI analysis test", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
        process.env.REACT_APP_AI_ACTION = "/ai/action";
        process.env.REACT_APP_API_KEY = "test-api-key";
        process.env.REACT_APP_MULTIPLE_DOCUMENT = "/multi-document";
    })

    afterEach(() => {
        fetchMock.mockClear();
        process.env = oldEnv;
    })

    it("Upload document for analysis", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({"AIresponse" : "test"}));

        const data : TriggerAIRequest = {
            dest : "test",
            type : "test",
            prompt: "test"
        }

        const out : string = await TriggerAIAction(data);
        expect(out).toBe("test");
    })

    it("Trend analysis", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({"AIResponse" : "test"}));

        const out : string = await triggerMultipleAnalysis(1, "test");
        expect(out).toBe("test");
    })
})