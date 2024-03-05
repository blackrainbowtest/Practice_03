import styles from "./style.module.css";

export default function AlertItemComponent({ alert, index, handleErrorClose, success=false, exit=false }) {
  return (
    <div className={`${styles.itemBox} ${exit ? styles.out : ""} ${success ? styles.itemSuccess : ""}`}>
      <div className={styles.closeItem} onClick={() => handleErrorClose(index)}>
        X
      </div>
      {alert}
    </div>
  );
}
