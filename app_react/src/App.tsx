import { Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import "./App.css";
import Welcome from "./Homepage/Welcome";
import SignUp from "./Login_and_SignUp/SignUp";
import Login from "./Login_and_SignUp/Login";
import UpdateProfile from "./Login_and_SignUp/UpdateProfile";
import { AuthoType } from "./Login_and_SignUp/constants";
import { setLocalStorage } from "./utils/localStorageManager";
import { welcomeTest } from "./Login_and_SignUp/utils";
import Footer from "./Components/Footer";
import CreatePatient from "./utils/Document_Upload/CreatePatientTest";
import PatinetManagementMain from "./Patient_Management/PatientManagementMain";
import SessionManagementMain from "./Session_Management/SessionManagementMain";
import React from "react";
import { Component } from "react";
import Editor from "./DocumentEditor/EditorMain";
import MeetingTranscriptionMain from "./Meeting_Transcription/MeetingTranscriptionMain";
import TrendAnalysis from "./Trend_Analysis/TrendAnalysisMain";

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
        <Route path="/editor" element={<Editor />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/audio" element={<MeetingTranscriptionMain />} />
        <Route path="/trend" element={<TrendAnalysis />} />
      </Routes>
    </AuthenContext.Provider>
  ) : (
    <AuthenContext.Provider value={{ AuthoState, setState }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Welcome />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/audio" element={<MeetingTranscriptionMain />} />
      </Routes>
    </AuthenContext.Provider>
  );
}

export default App;
