import styles from "./style.module.css";

export default function AlertItemComponent({ alert, index, handleErrorClose, success=false }) {
  return (
    <div className={`${styles.itemBox} ${success ? styles.itemSuccess : ""}`}>
      <div className={styles.closeItem} onClick={() => handleErrorClose(index)}>
        X
      </div>
      {alert}
    </div>
  );
}
