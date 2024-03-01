import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setSuccessMessage } from "../../../../features/user/userSlice";

export default function NavComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state?.user?.successMessage);

  return (
    <div className={styles.navContainer}>
      <nav className={styles.navBox}>
        <div className={styles.navLink} onClick={() => navigate("/")}>
          Home
        </div>
        <div className={styles.navLink} onClick={() => navigate("/profile")}>
          Profile
        </div>
        <div
          className={styles.navLink}
          onClick={() => {
            dispatch(setSuccessMessage([...successMessage, "Exit successful"]))
            dispatch(setLogin(false));
          }}
        >
          Exit
        </div>
        <div className={`${styles.animation} ${styles.startHome}`}></div>
      </nav>
    </div>
  );
}
