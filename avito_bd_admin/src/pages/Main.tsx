
import LeftBar from '../features/LeftBar/ui/LeftBar'
import RightBar from '../features/RightBar/ui/RightBar'
import Topbar from '../widgets/Topbar/Topbar'
import styles from './Main.module.css'

const Main = () => {
    return (
        <div className={styles.container}>
            <Topbar />
            <div className={styles.main_window}>
                <LeftBar/>
                <div style={{flexGrow: "1"}}></div>
                <RightBar/>
            </div>

        </div>
    )
}

export default Main