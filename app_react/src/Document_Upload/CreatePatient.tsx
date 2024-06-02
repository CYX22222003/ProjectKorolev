import React, { ReactElement } from "react";
import Background from "../Components/Background";
import Upload from "./Upload";

export default function CreatePatient(): ReactElement {
  return <Background element={<Upload />} />;
}
