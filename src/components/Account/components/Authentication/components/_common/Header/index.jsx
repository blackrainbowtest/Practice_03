import styles from "./style.module.css"

export default function HeaderComponent({title}) {
    return (
        <h2 className={styles.header}>{title}</h2>
    )
}