import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import "./App.css";
import Welcome from "./Homepage/Welcome";
import SignUp from "./Login_and_SignUp/SignUp";
import Login from "./Login_and_SignUp/Login";
import { AuthoType } from "./Login_and_SignUp/constants";
import { setLocalStorage } from "./utils/localStorageManager";
import { welcomeTest } from "./Login_and_SignUp/utils";
import Footer from "./Components/Footer";
import CreatePatient from "./utils/Document_Upload/CreatePatientTest";
import PatinetManagementMain from "./Patient_Management/PatientManagementMain";
import SessionManagementMain from "./Session_Management/SessionManagementMain";

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

  return wait ? (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Footer />} />
      </Routes>
    </AuthenContext.Provider>
  ) : AuthoState ? (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/patients" element={<PatinetManagementMain />} />
        <Route
          path="/sessions/:patient_id/:patient_name"
          element={<SessionManagementMain />}
        />
        <Route path="/test" element={<CreatePatient />} />
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
