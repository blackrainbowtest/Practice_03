import styles from "./style.module.css";
import commonStyle from "../../../_commonStyles/commonStyle.module.css";

export default function PostBoxComponent({ children }) {
  return (
    <div className={`${styles.mainContainer} ${commonStyle.WHMax}`}>
      {children}
    </div>
  );
}
