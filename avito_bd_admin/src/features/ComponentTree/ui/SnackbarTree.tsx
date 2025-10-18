import { createSnackbar } from '../../../entities/screenAddons/lib/templates';
import type { SnackbarComponent } from '../../../entities/screenAddons/model/screenAddonsTypes';
import Button from '../../../shared/ui/Button/Button';
import { useBuilder } from '../../Builder/lib/builderContext';
import styles from './ComponentTree.module.css'

const SnackbarTree = () => {
    const {
        screen,
        updateScreen,
        selectedSnackBarId,
        setSelectedComponent,
        setSelectedSnackBar,
    } = useBuilder();

    const snackbars: SnackbarComponent[] = (screen as any).snackbars ?? [];

    const handleAddSnackBar = () => {
        if (!screen) return
        const newSnackbar: SnackbarComponent = createSnackbar();
        updateScreen((current) => ({
            ...current,
            snackbars: [...(current.snackbars ?? []), newSnackbar],
        }));
        setSelectedSnackBar(newSnackbar._id);
        setSelectedComponent(null);
    }

    const handleDeleteSnackbar = (id?: string) => {
        if (!screen) return;

        updateScreen((current) => {
            const next = {
                ...current,
                snackbars: (current.snackbars ?? []).filter((sn) => sn._id !== selectedSnackBarId),
            };
            return next;
        });

        if (!id || id === selectedSnackBarId) {
            setSelectedSnackBar(null);
            setSelectedComponent(null);
        }
    };

    return (
        <div className={styles.tree} role="tree">
            <div className={styles.section}>
                <div className={styles.sectionHeader}>snackbars</div>
                <div className={styles.sectionBody}>
                    {snackbars.length ? (
                        snackbars.map((snackbar) =>
                            <div
                                className={[
                                    styles.row,
                                    selectedSnackBarId === snackbar._id ? styles.active : "",
                                ].join(" ")}
                            >
                                <div
                                    className={styles.title}
                                    onClick={() => setSelectedSnackBar(snackbar._id)}
                                    title={snackbar._id}
                                >
                                    <span className={styles.type}>snackbar</span>
                                    <span className={styles.id}>{snackbar._id}</span>
                                </div></div>)
                    ) : (
                        <div className={styles.dim}>пусто</div>
                    )}
                </div>
                <div className={styles.button_container}>
                    <Button onClick={handleAddSnackBar}>Добавить</Button>
                    <Button style={{ background: "#e12323" }} onClick={handleDeleteSnackbar}>Удалить</Button>
                </div>
            </div>
        </div>
    )
}

export default SnackbarTree