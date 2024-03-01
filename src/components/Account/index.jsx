import commonDebug from "../_commonStyles/commonDebug.module.css";
import Authentication from "./components/Authentication";

export default function Account() {

  return (
    <div className={`${commonDebug.borderRed}`}>
      <Authentication />
    </div>
  );
}
