import styles from "./style.module.css";

export default function TextBoxComponent({
  handleChange,
  errors = [],
  required = true,
  label = "label",
  value = "",
}) {
  return (
    <div className={styles.inputBox}>
      <textarea
        required={required}
        className={styles.inputBody}
        cols="45"
        rows="3"
        style={{ resize: "none" }}
        value={value}
        onChange={handleChange}
      ></textarea>
      <i className={styles.inputLabel}>{label}</i>
      {errors.length ? <div className={styles.errorsBox}>{errors}</div> : ""}
    </div>
  );
}
