import { Outlet } from "react-router-dom";
import commonStyle from "../_commonStyles/commonStyle.module.css"
import commonDefault from "../_commonStyles/commonDefault.module.css"
import AlertComponent from "../_commonComponents/AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import NavComponent from "./components/Nav";
import Account from "../Account";
import { useEffect } from "react";
import { getUser } from "../../features/user/userAPI";
import LoaderComponent from "../_commonComponents/LoaderComponent";

export default function Layout() {
  const isLogin = useSelector((state) => state?.user?.isLogin);
  const loading = useSelector((state) => state?.user?.loading);
  const loadingPost = useSelector((state) => state?.post?.loading);
  const errorMessage = useSelector((state) => state?.user?.errorMessage);
  const errorPostMessage = useSelector((state) => state?.post?.errorMessage);
  const successMessage = useSelector((state) => state?.user?.successMessage);
  const successPostMessage = useSelector((state) => state?.post?.successMessage);
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser({token: accessToken}))
    }
  }, [accessToken, dispatch])

  return (
    <div className={`${commonStyle.WHFull} ${commonDefault.dFlex} ${commonDefault.fdc}`}>
      {
        errorMessage?.length || successMessage?.length || errorPostMessage.length || successPostMessage.length ? <AlertComponent /> : ""
      }
      {
        loadingPost || loading ? (
          <LoaderComponent />
        ) : ""
      }
      {
        isLogin || accessToken ? (
          <>
            <NavComponent />
            <Outlet />
          </>
        ) : <Account />
      }
    </div>
  );
}
