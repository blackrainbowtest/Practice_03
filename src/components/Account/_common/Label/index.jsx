import styles from "./style.module.css";

export default function LabelComponent({ title = "title", data = "data" }) {
  return (
    <div className={styles.labelBox}>
      <span className={styles.titleBody}>{title}:</span>
      <span className={styles.labelBody}>{data}</span>
    </div>
  );
}
