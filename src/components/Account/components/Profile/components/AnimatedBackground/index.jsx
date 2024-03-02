import styles from "./style.module.css"

export default function AnimatedBackground({children}) {
    return (
        <>
            <div className={styles.context}>
                {children}
            </div>
            <div className={styles.area}>
                <ul className={styles.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </>
    )
}