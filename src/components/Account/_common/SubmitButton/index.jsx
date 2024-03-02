import styles from "./style.module.css";

export default function SubmitButtonComponent({ value }) {
  return (
    <div className={styles.inputBox}>
      <input type="submit" className={styles.submitButton} value={value} />
    </div>
  );
}
