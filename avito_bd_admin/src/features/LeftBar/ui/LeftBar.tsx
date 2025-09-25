import styles from './LeftBar.module.css'
import ComponentsWidget from './ComponentsWidget/ComponentsWidget'
import Sidebar from './sidebar/Sidebar'
import { useState } from 'react'
import ColorsWidget from './ColorsWiget/ColorsWidget'

const LeftBar = () => {
    const [mode, setMode] = useState<"comp"| "col" | "var">("comp")

    return (
        <div className={styles.container}>

            <Sidebar  mode={mode} setMode={setMode}/>
            <div className={styles.panel}>
                {mode == "comp" && <ComponentsWidget />}
                {mode== "col" && <ColorsWidget/>}
                
            </div>
        </div>
    )
}

export default LeftBar