import Background from "../Components/Background";
import EditorElement from "./EditorTemplate";

export default function Element() {
  return <Background elements={[<EditorElement />]} header="Editor" />;
}
