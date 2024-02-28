import styles from "./style.module.css"
import commonDefault from "../../_commonStyles/commonDefault.module.css"

export default function PopapComponent({children, handleChange}) {
    const handlePopapClick = (e) => {
        handleChange(prev => !prev)
    }

    return (
        <div className={`${styles.popapContainer} ${commonDefault.dFlex} ${commonDefault.jcc} ${commonDefault.aic}`} onClick={handlePopapClick}>
            {children}
        </div>
    )
}