
import { useState } from 'react'
import LeftBar from '../features/LeftBar/ui/LeftBar'
import { DemoPanel } from '../features/PropertyPanel/ui/DemoPanel'
import { PropertyPanel } from '../features/PropertyPanel/ui/PropertyPanel'
import { NumberInput } from '../shared/ui/NumberInput/NumberInput'
import Topbar from '../widgets/Topbar/Topbar'
import styles from './Main.module.css'

const Main = () => {
    const [width, setWidth] = useState(320);
    const [height, setHeight] = useState(600);

    return (
        <div className={styles.container}>
            <Topbar />
            <div className={styles.main_window}>
                <LeftBar />
                <div className={styles.work_panel}>
                    <div className={styles.work_panel_top}>
                        <div className={styles.input_container}>
                            <NumberInput value={width} min={0} max={2000} onChange={(e) => setWidth(e)} />
                            <NumberInput value={height} min={0} max={2000} onChange={(e) => setHeight(e)} />
                        </div>
                    </div>
                    <div className={styles.workspace} >
                        <div className={styles.screen} style={{ width: width, height: height }}></div>
                    </div>
                </div>
                <DemoPanel />
            </div>

        </div>
    )
}

export default Main