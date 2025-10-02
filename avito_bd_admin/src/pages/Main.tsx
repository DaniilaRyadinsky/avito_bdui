// pages/Main/Main.tsx
import LeftBar from "../features/LeftBar/ui/LeftBar";
import Topbar from "../widgets/Topbar/Topbar";
import { ScreenRenderer } from "../widgets/ScreenRenderer/index";
import { BuilderProvider, useBuilder } from "../features/Builder/lib/builderContext";
import { useScreenData } from "../shared/lib/useScreenData";
import screenData from "../app/data/screen.json";
import styles from "./Main.module.css";

import { useState } from 'react'

import { PropertyPanel } from '../features/PropertyPanel/ui/PropertyPanel'
import { NumberInput } from '../shared/ui/NumberInput/NumberInput'


const Main = () => {
    // const { screen, selectedComponentId, setSelectedComponent } = useBuilder();

    const screen = useScreenData(screenData);
    const [width, setWidth] = useState(420);
    const [height, setHeight] = useState(600);

    return (
        <div className={styles.container}>
            <Topbar />

            <div className={styles.main_window}>
                <BuilderProvider screen={screen}>
                    <LeftBar />
                    <div className={styles.work_panel}>
                        <div className={styles.work_panel_top}>
                            <div className={styles.input_container}>
                                <NumberInput value={width} min={0} max={2000} onChange={(e) => setWidth(e)} />
                                <NumberInput value={height} min={0} max={2000} onChange={(e) => setHeight(e)} />
                            </div>
                        </div>
                        <div className={styles.workspace} >
                            <div className={styles.screen} style={{ width: width, height: height }}>
                                <ScreenRenderer />
                            </div>
                        </div>
                    </div>
                    <PropertyPanel />
                </BuilderProvider>
            </div>

        </div>
    )
}

export default Main;