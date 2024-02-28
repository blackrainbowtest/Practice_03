import { useSelector } from "react-redux";
import commonDebug from "../_commonStyles/commonDebug.module.css";
import commonStyle from "../_commonStyles/commonStyle.module.css";
import Authentication from "./components/Authentication";

export default function Account() {
  const isLogin = useSelector((state) => state?.user?.isLogin);

  return (
    <div className={`${commonDebug.borderBlue} ${commonStyle.WHMax}`}>
      {
        isLogin ? (
            ""
        ) : <Authentication />
      }
    </div>
  );
}
