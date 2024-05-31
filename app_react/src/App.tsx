import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import "./App.css";
import APITest from "./APITest";
import SignUp from "./Login_and_SignUp/SignUp";
import Login from "./Login_and_SignUp/Login";
import App2 from "./tests/AppTest";
import { AuthoType } from "./Login_and_SignUp/constants";
import { getLocalStorage, setLocalStorage } from "./utils/localStorageManager";
import { welcomeTest } from "./Login_and_SignUp/utils";

export const AuthenContext = createContext<AuthoType>({
  AuthoState: true,
  setState: () => {},
});

function App() {
  const [AuthoState, setState] = useState<boolean>(false);

  useEffect((): void => {
    welcomeTest()
      .then((state: boolean) => {
        setLocalStorage("loginState", state);
        setState(state);
      })
      .catch((err) => {
        setLocalStorage("loginState", false);
        setState(false);
      });
  }, []);

  return AuthoState ? (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<APITest />} />
        <Route path="/signup" element={<APITest />} />
        <Route path="/test" element={<App2 />} />
        <Route path="/login" element={<APITest />} />
      </Routes>
    </AuthenContext.Provider>
  ) : (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<APITest />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthenContext.Provider>
  );
}

export default App;
