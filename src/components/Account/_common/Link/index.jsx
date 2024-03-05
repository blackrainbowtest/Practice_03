import styles from "./styles.module.css";

export default function LinkComponent({
  isSignIn,
  handleForgotPassword,
  handleChange,
}) {
  return (
    <div className={styles.linkBox}>
      {isSignIn ? (
        <div className={styles.linkItem} onClick={handleForgotPassword}>
          Forgot Password?
        </div>
      ) : (
        ""
      )}
      <div className={styles.linkItemVariant} onClick={handleChange}>
        {isSignIn ? "SignUp" : "SignIn"}
      </div>
    </div>
  );
}
