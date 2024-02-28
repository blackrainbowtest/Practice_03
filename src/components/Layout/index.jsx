import { Outlet } from "react-router-dom";
import commonDebug from "../_commonStyles/commonDebug.module.css"
import commonStyle from "../_commonStyles/commonStyle.module.css"

export default function Layout() {

  return (
    <div className={`${commonDebug.borderRed} ${commonStyle.WHFull}`}>
      <Outlet />
    </div>
  );
}
