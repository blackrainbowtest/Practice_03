import { useNavigate } from "react-router-dom";
import commonDebug from "../_commonStyles/commonDebug.module.css";
import Authentication from "./components/Authentication";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Account() {
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state?.user?.isLogin);

  useEffect(() => {
      if(!isLogin) {
          navigate("/")
      }
  }, [isLogin, navigate])

  return (
    <div className={`${commonDebug.borderRed}`}>
      <Authentication />
    </div>
  );
}
