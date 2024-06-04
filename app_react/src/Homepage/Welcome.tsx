import React, {ReactElement} from "react";
import Background from "../Components/Background";
import WelcomeHelp from "./WelcomeHelp";

export default function Welcome() : ReactElement {
  return <Background element={<WelcomeHelp />} header="Home" />;
}
