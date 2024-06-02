import * as React from "react";
import Background from "../Components/Background";
import WelcomeHelp from "./WelcomeHelp";

export default function Welcome() {
  return <Background element={<WelcomeHelp />} />;
}
