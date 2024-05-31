import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import SignUp from "./Login_and_SignUp/SignUp";
import Login from "./Login_and_SignUp/Login";
import App2 from "./tests/AppTest";
import { AuthoType } from "./Login_and_SignUp/constants";
import { getLocalStorage, setLocalStorage } from "./utils/localStorageManager";
import { welcomeTest } from "./Login_and_SignUp/utils";
import Footer from "./components/Footer"

export const AuthenContext = createContext<AuthoType>({
  AuthoState: true,
  setState: () => {},
});

function App() {
  const [AuthoState, setState] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(true);
  
  useEffect((): void => {
    welcomeTest()
      .then((state: boolean) => {
        setLocalStorage("loginState", state);
        setState(state);
        setWait(false);
      })
      .catch((err) => {
        setLocalStorage("loginState", false);
        setState(false);
        setWait(false);
      });
  }, []);

  return wait ?  (    
  <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Footer />} />
      </Routes>
    </AuthenContext.Provider>)
  : AuthoState ? (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/test" element={<App2 />} />
      </Routes>
    </AuthenContext.Provider>
  ) : (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Welcome />} />
      </Routes>
    </AuthenContext.Provider>
  );
}

export default App;
