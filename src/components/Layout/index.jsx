import { Outlet } from "react-router-dom";
import commonStyle from "../_commonStyles/commonStyle.module.css"
import AlertComponent from "../_commonComponents/AlertComponent";
import { useSelector } from "react-redux";

export default function Layout() {
  const isLogin = useSelector((state) => state?.user?.isLogin);
  return (
    <div className={`${commonStyle.WHFull}`}>
      <AlertComponent />
      {
        isLogin ? (
          <>
            <div>Layout</div>
            <Outlet />
          </>
        ) : <Outlet />
      }
    </div>
  );
}
