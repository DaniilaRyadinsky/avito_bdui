import styles from './LeftBar.module.css'
import Sidebar from './sidebar/Sidebar'
import { useState } from 'react'
import ColorsWidget from './ColorsWiget/ColorsWidget'
import ComponentsWidget from '../../ComponentLibrary/ui/ComponentWidget/ComponentWidget'
import { ComponentControls } from './ComponentControls/ComponentControls'
import ComponentTree from '../../ComponentTree/ComponentTree'
import AddonsWidget from '../../../entities/screenAddons/ui/AddonsControl/AddonsControls'

const LeftBar = () => {
    const [mode, setMode] = useState<"comp" | "col" | "var">("comp")

    return (
        <div className={styles.container}>

            <Sidebar mode={mode} setMode={setMode} />
            <div className={styles.panel}>
                {mode == "comp" && <>
                    <ComponentsWidget />
                    <ComponentControls />
                    <ComponentTree />
                    <AddonsWidget/>
                </>}
                {mode == "col" && <ColorsWidget />}
                <div>

                </div>
            </div>

        </div>
    )
}

export default LeftBar;
