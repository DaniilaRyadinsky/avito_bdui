import { useBuilder } from '../../../../features/Builder/lib/builderContext';
import { ComponentFactory } from '../../../components/ui/ComponentFactory/ComponentFactory';
import { findBottomSheetById } from '../../lib/findBottomsheets';
import type { BottomSheetComponent } from '../../model/screenAddonsTypes';
import styles from './BottomSheetRenderer.module.css'




const BottomSheetRenderer = () => {
    const { screen,
        selectedComponentId,
        selectedBottomSheetId,
        setSelectedComponent,
        setSelectedBottomSheet } = useBuilder();

    if (!screen) {
        return <div className={styles.loading}>Загрузка экрана...</div>;
    }



    return (
        <div className={styles.bottomsheet} onClick={(e)=> {e.stopPropagation();console.log("bottomshit click")}}>
            <div className={styles.backdrop} />
            <div className={styles.bottomsheet_content}>
                {findBottomSheetById(screen.bottomSheets, selectedBottomSheetId)?.children.map((component, index) => (
                    <ComponentFactory
                        key={component._id || `bottomSheet-${index}`}
                        component={component}
                        selectedId={selectedComponentId}
                        onSelect={setSelectedComponent}
                    />))}
            </div>
        </div>
    )
}

export default BottomSheetRenderer