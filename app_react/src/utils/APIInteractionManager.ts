export async function postTest(data : any, 
    address : string | undefined, apiKey: string | undefined) 
    : Promise<Response> {
    if (address === undefined ) {
        throw new Error("address is undefined");
    }

    if (apiKey === undefined ) {
        throw new Error("apiKey is undefined");
    }

    const res : Response = await fetch(address, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: 'include',
        headers: {
            "Content-Type" : "application/json",
            "API-Key" : apiKey,
            "Accept-Encoding": "gzip, deflate, br",
            "Connection" : "keep-alive"
        },
        body: JSON.stringify(data)
    })
    
    return res;
}

export async function getTest(address : string | undefined, 
    apiKey: string | undefined) : Promise<Response> {
  if (address === undefined ) {
      throw new Error("address is undefined");
  }

  if (apiKey === undefined ) {
      throw new Error("apiKey is undefined");
  }

  const res : Response = await fetch(address, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      credentials: 'include',
      headers: {
          "Content-Type" : "application/json",
          "API-Key": apiKey,
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection" : "keep-alive"
      }
  })

  return res;
}
