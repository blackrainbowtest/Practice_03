import styles from "./style.module.css";

export default function Container(props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
}
