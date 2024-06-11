import React, { ReactElement } from "react";
import Background from "../../Components/Background";
import Upload from "../../Components/Upload";

export default function CreatePatient(): ReactElement {
  return <Background elements={[<Upload />]} header="Create Patient" />;
}
