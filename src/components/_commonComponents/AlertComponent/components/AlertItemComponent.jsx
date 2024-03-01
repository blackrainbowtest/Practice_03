import styles from "./style.module.css";

export default function AlertItemComponent({ alert, index, handleErrorClose }) {
  return (
    <div className={styles.itemBox}>
      <div className={styles.closeItem} onClick={() => handleErrorClose(index)}>
        X
      </div>
      {alert}
    </div>
  );
}
