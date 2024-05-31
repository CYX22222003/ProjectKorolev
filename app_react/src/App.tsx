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
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthenContext.Provider>
  );
}

export default App;
