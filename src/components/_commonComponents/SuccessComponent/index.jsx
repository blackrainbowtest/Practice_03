import styles from "./style.module.css";
import commonDefault from "../../_commonStyles/commonDefault.module.css";

export default function SuccessComponent({ handleChange, handleSubmit}) {
  const handlePopapClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleChange((prev) => !prev);
  };

  return (
    <div
      className={`${styles.popapContainer} ${commonDefault.dFlex} ${commonDefault.jcc} ${commonDefault.aic}`}
      onClick={handlePopapClick}
    >
      <div className={styles.successContainer}>
        <span>Do you want to delete your post?</span>
        <div className={styles.answerBox}>
            <div className={styles.noButton} onClick={handlePopapClick}>No</div>
            <div className={styles.yesButton} onClick={handleSubmit}>Yes</div>
        </div>
      </div>
    </div>
  );
}
