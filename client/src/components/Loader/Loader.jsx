import styles from "../Loader/Loader.module.css"

export default function Loader(){

    return(
        <div className={styles.loader}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
        </div>
    )
}