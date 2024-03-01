import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import AlertItemComponent from "./components/AlertItemComponent";
import { setError } from "../../../features/user/userSlice";
import { useEffect } from "react";

export default function AlertComponent() {
  const errorMessage = useSelector((state) => state?.user?.errorMessage);
  const dispatch = useDispatch();

  const handleErrorClose = (index = 0) => {
    dispatch(setError(errorMessage.filter((_, ind) => ind !== index)));
  };

  useEffect(() => {
    if (errorMessage.length) {
      const timeoutBYId = setTimeout(() => {
        handleErrorClose();
      }, 2000);

      return () => clearTimeout(timeoutBYId);
    }
  }, [errorMessage]);

  return (
    <div className={styles.alertBox}>
      {errorMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={index}
            index={index}
            alert={alert}
            handleErrorClose={handleErrorClose}
          />
        );
      })}
    </div>
  );
}
