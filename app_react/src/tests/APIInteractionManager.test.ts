import { postTest, getTest,deleteSimple } from "../utils/APIInteractionManager";
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks()

describe('Test GET request sent from frontend', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  });

  it('address error handling', async () => {
    await expect(getTest(undefined, 'dummyApiKey'))
    .rejects.toThrow("address is undefined");
  });

  it('API key error handling', async () => {
    await expect(getTest('http://example.com', undefined))
    .rejects.toThrow("apiKey is undefined");
  });

  it('GET with the correct parameters', async () => {
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


describe("Test POST request from frontend", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  })

  it("API key error handling", async () => {
    await expect(postTest(2, "a", undefined))
    .rejects.toThrow("apiKey is undefined");
  })

  it("address error handling", async () => {
    await expect(postTest(2, undefined, "test"))
    .rejects.toThrow("address is undefined");
  })

  it("data POST test", async () => {
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

describe("Test DELETE request from frontend", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  })

  it("API key error handling", async () => {
    await expect(deleteSimple("a", undefined))
    .rejects.toThrow("apiKey is undefined");
  })

  it("address error handling", async () => {
    await expect(deleteSimple(undefined, "test"))
    .rejects.toThrow("address is undefined");
  })

  it("DELETE request test", async () => {
    const address = 'http://example.com';
    const apiKey = 'dummyApiKey';
    const data = { key: 'value' };

    fetchMock.mockResponseOnce(JSON.stringify(data));
    const res = await deleteSimple(address, apiKey).then(data => data.json());

    expect(fetchMock).toHaveBeenCalledWith(address, {
      method: "DELETE",
      mode: "cors",
      redirect: "follow",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey,
        "Accept" : "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive"
      }
    });

    expect(res).toEqual(data)

  })
})