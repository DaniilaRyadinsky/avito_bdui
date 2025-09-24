
import LeftBar from '../features/LeftBar/ui/LeftBar'
import Topbar from '../widgets/Topbar/Topbar'
import styles from './Main.module.css'

const Main = () => {
    return (
        <div className={styles.container}>
            <Topbar />
            <div className={styles.main_window}>
                <LeftBar/>
            </div>

        </div>
    )
}

export default Main