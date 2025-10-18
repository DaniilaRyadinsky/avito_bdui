import { useBuilder } from '../../../../features/Builder/lib/builderContext';
import { findSnackbarById } from '../../lib/findAddon';
import styles from './SnackBarsRenderer.module.css'

const SnackBarsRenderer = () => {
    const { screen,
        selectedSnackBarId
    } = useBuilder();

    if (!screen) {
        return <div className={styles.loading}>Загрузка экрана...</div>;
    }

    const snackbar = findSnackbarById(screen.snackbars, selectedSnackBarId  )

    return (
        <div className={styles.snackbar} >
            <div className={styles.snackbar_content}>
                <div className={styles.snackbar_text}>{snackbar?.text}</div>
                {snackbar?.actionText && <div className={styles.snackbar_actionText}>{snackbar?.actionText}</div>}
            </div>
        </div>
    )
}

export default SnackBarsRenderer