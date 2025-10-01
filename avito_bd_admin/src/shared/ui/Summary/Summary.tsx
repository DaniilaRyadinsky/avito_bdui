import styles from './Summary.module.css'
import arrow from '../../assets/icons/arrow.svg'

interface ISummary {
    children: React.ReactNode,
    title: string,
}
const Summary = ({children, title}: ISummary) => {
    return (
        <>
            <details className={styles.details} open>
                <summary><div className={styles.details_title_container}>{title}<img className={styles.arrow} src={arrow} /></div></summary>
                <div>
                    {children}
                </div>
            </details>
        </>
    )
}

export default Summary