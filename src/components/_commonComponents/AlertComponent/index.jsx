import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import AlertItemComponent from "./components/AlertItemComponent";
import { setError, setSuccessMessage } from "../../../features/user/userSlice";
import { useEffect } from "react";

export default function AlertComponent() {
  const errorMessage = useSelector((state) => state?.user?.errorMessage);
  const successMessage = useSelector((state) => state?.user?.successMessage);
  const dispatch = useDispatch();

  const handleErrorClose = (index = 0) => {
    dispatch(setError(errorMessage.filter((_, ind) => ind !== index)));
  };
  const handleSuccessClose = (index = 0) => {
    dispatch(setSuccessMessage(successMessage.filter((_, ind) => ind !== index)));
  };

  useEffect(() => {
    if (errorMessage.length) {
      const timeoutBYId = setTimeout(() => {
        handleErrorClose();
      }, 2000);

      return () => clearTimeout(timeoutBYId);
    }
    if (successMessage.length) {
      const successTimeoutBYId = setTimeout(() => {
        handleSuccessClose();
      }, 2000);

      return () => clearTimeout(successTimeoutBYId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, successMessage]);

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
      {successMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={index}
            index={index}
            alert={alert}
            handleErrorClose={handleSuccessClose}
            success={true}
          />
        );
      })}
    </div>
  );
}
