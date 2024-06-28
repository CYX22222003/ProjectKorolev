import { postTest, getTest } from "../utils/APIInteractionManager";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks()

describe('getTest', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  });

  it('address error handling', async () => {
    await expect(getTest(undefined, 'dummyApiKey'))
    .rejects.toThrow("address is undefined");
  });

  it('api jey error handling', async () => {
    await expect(getTest('http://example.com', undefined))
    .rejects.toThrow("apiKey is undefined");
  });

  it('calls fetch with the correct parameters', async () => {
    const address = 'http://example.com';
    const apiKey = 'dummyApiKey';

    await getTest(address, apiKey);

    expect(fetch).toHaveBeenCalledWith(address, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey,
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      }
    });
  });

  it('returns the response from fetch', async () => {
    const mockResponse = {data : "test"};
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const address = 'http://example.com';
    const apiKey = 'dummyApiKey';

    const response = await getTest(address, apiKey);
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual(mockResponse);
  });

  afterEach(() => {
    fetchMock.mockClear();
  })
});


describe("postTest", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  })

  it("api key error handling", async () => {
    await expect(postTest(2, "a", undefined))
    .rejects.toThrow("apiKey is undefined");
  })

  it("address error handling", async () => {
    await expect(postTest(2, undefined, "test"))
    .rejects.toThrow("address is undefined");
  })

  it("data post test", async () => {
    const address = 'http://example.com';
    const apiKey = 'dummyApiKey';
    const data = { key: 'value' };

    fetchMock.mockResponseOnce(JSON.stringify({}));

    const response = await postTest(data, address, apiKey).then(data => data.json());

    expect(fetchMock).toHaveBeenCalledWith(address, {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey,
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      },
      body: JSON.stringify(data)
    });

    expect(response).toEqual({})
  })

  afterEach(() => {
    fetchMock.mockClear();
  })
})