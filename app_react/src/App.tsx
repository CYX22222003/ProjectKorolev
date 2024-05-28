import {Routes, Route, redirect} from 'react-router-dom';
import "./App.css";
import APITest from "./APITest";
import SignUp from './Login_and_SignUp/SignUp';

async function getTest(address : string | undefined, apiKey: string | undefined) : Promise<string> {
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

  return res.text();
}

function App2() {
  const addressWelcome : string | undefined = process.env.REACT_APP_WELCOME_URL;
  const apiKey : string | undefined = process.env.REACT_APP_API_KEY;

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Test
        </a> <br />
        <button onClick={() => {
           getTest(addressWelcome, apiKey)
            .then(
                data => console.log(data)
            ).catch(
                err => console.log(err)); 
        }}>welcome test</button>
        <br />
      </header>
    </div>
  );
}

function App() {
  return (
  <Routes>
    <Route path = "/" element={<APITest />} />
    <Route path = "/signup" element={<SignUp />} />
    <Route path = "/test" element={<App2 />}/>
  </Routes>
  )

}

export default App;
