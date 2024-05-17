import React from "react";
import {Routes, Route, redirect} from 'react-router-dom';
import "./App.css";
import Login from "./Login";
import APITest from "./APITest";

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
    <Route path = "/login" element={<Login />} />
  </Routes>
  )

}

export default App;
