import styles from "./styles.module.css";

export default function InputComponent({
  handleChange,
  errors = [],
  type = "text",
  required = true,
  autoComplete = "nope",
  label = "label",
  value = "",
}) {
  return (
    <div className={styles.inputBox}>
      <input
        type={type}
        className={styles.inputBody}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={handleChange}
      />
      <i className={styles.inputLabel}>{label}</i>
      {errors.length ? <div className={styles.errorsBox}>{errors}</div> : ""}
    </div>
  );
}
