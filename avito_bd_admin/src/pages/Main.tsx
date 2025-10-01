
import LeftBar from '../features/LeftBar/ui/LeftBar'
import { DemoPanel } from '../features/PropertyPanel/ui/DemoPanel'
import { PropertyPanel } from '../features/PropertyPanel/ui/PropertyPanel'
import Topbar from '../widgets/Topbar/Topbar'
import styles from './Main.module.css'

const Main = () => {
    return (
        <div className={styles.container}>
            <Topbar />
            <div className={styles.main_window}>
                <LeftBar/>
                <DemoPanel/>
            </div>

        </div>
    )
}

export default Main