import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setSuccessMessage } from "../../../../features/user/userSlice";
import { useLocation } from 'react-router-dom';


export default function NavComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const successMessage = useSelector((state) => state?.user?.successMessage);

  const getInitialPosition = () => {
    if (location.pathname === '/') {
      return styles.startHome;
    } else if (location.pathname === '/profile') {
      return styles.startProfile;
    }
    return 0;
  };

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
            dispatch(setSuccessMessage([...successMessage, {id: successMessage[successMessage.length - 1]?.id || 0  + 1, message: "Exit successful", exit: false}]))
            localStorage.removeItem('accessToken');
            dispatch(setLogin(false));
          }}
        >
          Exit
        </div>
        <div className={`${styles.animation} ${getInitialPosition()}`}></div>
      </nav>
    </div>
  );
}
