import styles from './LeftBar.module.css'
import ComponentsWidget from './ComponentsWidget/ComponentsWidget'
import Sidebar from './sidebar/Sidebar'

const LeftBar = () => {
    return (
        <div className={styles.container}>

            <Sidebar />
            <div className={styles.panel}>
                <ComponentsWidget />
            </div>
        </div>
    )
}

export default LeftBar