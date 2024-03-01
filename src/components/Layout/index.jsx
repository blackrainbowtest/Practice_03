import { Outlet } from "react-router-dom";
import commonStyle from "../_commonStyles/commonStyle.module.css"
import AlertComponent from "../_commonComponents/AlertComponent";
import { useSelector } from "react-redux";
import NavComponent from "./components/Nav";
import Account from "../Account";

export default function Layout() {
  const isLogin = useSelector((state) => state?.user?.isLogin);
  const errorMessage = useSelector((state) => state?.user?.errorMessage);
  const successMessage = useSelector((state) => state?.user?.successMessage);
  return (
    <div className={`${commonStyle.WHFull}`}>
      {
        errorMessage.length || successMessage.length ? <AlertComponent /> : ""
      }
      {
        isLogin ? (
          <>
            <NavComponent />
            <Outlet />
          </>
        ) : <Account />
      }
    </div>
  );
}
