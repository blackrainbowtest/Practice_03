import styles from "./style.module.css";

export default function FormComponent({ handleSubmitAction, children }) {
  return (
    <form onSubmit={handleSubmitAction} className={styles.formContainer}>
      {children}
    </form>
  );
}
