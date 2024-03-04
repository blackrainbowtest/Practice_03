import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import AlertItemComponent from "./components/AlertItemComponent";
import { setError, setSuccessMessage } from "../../../features/user/userSlice";
import { setPostErrors, setPostSuccessMessage } from "../../../features/posts/postSlice";
import { useEffect } from "react";

export default function AlertComponent() {
  const errorMessage = useSelector((state) => state?.user?.errorMessage);
  const errorPostMessage = useSelector((state) => state?.post?.errorMessage);
  const successMessage = useSelector((state) => state?.user?.successMessage);
  const successPostMessage = useSelector((state) => state?.post?.successMessage);
  const dispatch = useDispatch();

  const handleErrorClose = (index = 0) => {
    dispatch(setError(errorMessage.filter((_, ind) => ind !== index)));
  };
  const handleSuccessClose = (index = 0) => {
    dispatch(setSuccessMessage(successMessage.filter((_, ind) => ind !== index)));
  };
  const handlePostErrorClose = (index = 0) => {
    dispatch(setPostErrors(errorPostMessage.filter((_, ind) => ind !== index)));
  };
  const handlePostSuccessClose = (index = 0) => {
    dispatch(setPostSuccessMessage(successPostMessage.filter((_, ind) => ind !== index)));
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
    if (errorPostMessage.length) {
      const timeoutPostBYId = setTimeout(() => {
        handlePostErrorClose();
      }, 2000);

      return () => clearTimeout(timeoutPostBYId);
    }
    if (successPostMessage.length) {
      const successPostTimeoutBYId = setTimeout(() => {
        handlePostSuccessClose();
      }, 2000);

      return () => clearTimeout(successPostTimeoutBYId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, successMessage, errorPostMessage, successPostMessage]);

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
      {errorPostMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={index}
            index={index}
            alert={alert}
            handleErrorClose={handleErrorClose}
          />
        );
      })}
      {successPostMessage.map((alert, index) => {
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
