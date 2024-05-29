import {Routes, Route, redirect} from 'react-router-dom';
import { useContext } from 'react';
import "./App.css";
import APITest from "./APITest";
import SignUp from './Login_and_SignUp/SignUp';
import Login from "./Login_and_SignUp/Login";
import App2 from "./tests/AppTest"


function App() {
  return (
  <Routes>
    <Route path = "/" element={<APITest />} />
    <Route path = "/signup" element={<SignUp />} />
    <Route path = "/test" element={<App2 />}/>
    <Route path = "/login" element={<Login />} />
  </Routes>
  )

}

export default App;
