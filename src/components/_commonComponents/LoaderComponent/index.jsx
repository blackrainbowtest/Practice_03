import styles from "./style.module.css"

export default function LoaderComponent() {
  return (
    <div className={styles.loaderMain}>
      <div className={styles.loader}></div>
    </div>
  );
}
