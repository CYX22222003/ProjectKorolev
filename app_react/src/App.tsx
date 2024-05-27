import {Routes, Route, redirect} from 'react-router-dom';
import "./App.css";
import LoginTest from "./LoginTest";
import APITest from "./APITest";
import SignUp from './Login_and_SignUp/SignUp';

function App2() {
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
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
  <Routes>
    <Route path = "/" element={<APITest />} />
    <Route path = "/login" element={<LoginTest />} />
    <Route path = "/signup" element={<SignUp />} />
    <Route path = "/test" element={<App2 />}/>
  </Routes>
  )

}

export default App;
