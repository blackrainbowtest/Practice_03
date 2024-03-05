import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import AlertItemComponent from "./components/AlertItemComponent";
import { setError, setSuccessMessage } from "../../../features/user/userSlice";
import {
  setPostErrors,
  setPostSuccessMessage,
} from "../../../features/posts/postSlice";
import { useEffect } from "react";

export default function AlertComponent() {
  const errorMessage = useSelector((state) => state?.user?.errorMessage);
  const errorPostMessage = useSelector((state) => state?.post?.errorMessage);
  const successMessage = useSelector((state) => state?.user?.successMessage);
  const successPostMessage = useSelector(
    (state) => state?.post?.successMessage
  );
  const dispatch = useDispatch();

  const handleErrorClose = async (index = 0) => {
    dispatch(
      setError(
        errorMessage.map((alr, ind) =>
          ind === index ? { ...alr, exit: true } : alr
        )
      )
    );
    let timeoutId;
    const timeoutPromise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        dispatch(setError(errorMessage.filter((_, ind) => ind !== index)));
        resolve();
      }, 1000);
    });

    await timeoutPromise;
    clearTimeout(timeoutId);
  };
  const handleSuccessClose = async (index = 0) => {
    dispatch(
      setSuccessMessage(
        successMessage.map((alr, ind) =>
          ind === index ? { ...alr, exit: true } : alr
        )
      )
    );
    let timeoutId;
    const timeoutPromise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        dispatch(
          setSuccessMessage(successMessage.filter((_, ind) => ind !== index))
        );
        resolve();
      }, 1000);
    });

    await timeoutPromise;
    clearTimeout(timeoutId);
  };
  const handlePostErrorClose = async (index = 0) => {
    dispatch(
      setPostErrors(
        errorPostMessage.map((alr, ind) =>
          ind === index ? { ...alr, exit: true } : alr
        )
      )
    );
    let timeoutId;
    const timeoutPromise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        dispatch(
          setPostErrors(errorPostMessage.filter((_, ind) => ind !== index))
        );
        resolve();
      }, 1000);
    });

    await timeoutPromise;
    clearTimeout(timeoutId);
  };
  const handlePostSuccessClose = async (index = 0) => {
    dispatch(
      setPostSuccessMessage(
        successPostMessage.map((alr, ind) =>
          ind === index ? { ...alr, exit: true } : alr
        )
      )
    );
    let timeoutId;
    const timeoutPromise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        dispatch(
          setPostSuccessMessage(
            successPostMessage.filter((_, ind) => ind !== index)
          )
        );
        resolve();
      }, 1000);
    });

    await timeoutPromise;
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    const handleTimeout = (messages, closeHandler) => {
      if (messages.length) {
        const timeout = setTimeout(() => {
          closeHandler();
        }, 2000);
        return timeout;
      }
    };

    const timeoutIds = [
      handleTimeout(errorMessage, handleErrorClose),
      handleTimeout(successMessage, handleSuccessClose),
      handleTimeout(errorPostMessage, handlePostErrorClose),
      handleTimeout(successPostMessage, handlePostSuccessClose),
    ];

    return () => timeoutIds.forEach((id) => id && clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage, successMessage, errorPostMessage, successPostMessage]);

  console.log(errorMessage);
  return (
    <div className={styles.alertBox}>
      {errorMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={alert.id}
            index={index}
            alert={alert.message}
            handleErrorClose={handleErrorClose}
            exit={alert.exit}
          />
        );
      })}
      {successMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={alert.id}
            index={index}
            alert={alert.message}
            handleErrorClose={handleSuccessClose}
            success={true}
            exit={alert.exit}
          />
        );
      })}
      {errorPostMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={alert.id}
            index={index}
            alert={alert?.message}
            handleErrorClose={handlePostErrorClose}
            exit={alert.exit}
          />
        );
      })}
      {successPostMessage.map((alert, index) => {
        return (
          <AlertItemComponent
            key={alert.id}
            index={index}
            alert={alert?.message}
            handleErrorClose={handlePostSuccessClose}
            success={true}
            exit={alert.exit}
          />
        );
      })}
    </div>
  );
}
