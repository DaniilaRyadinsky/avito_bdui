import { useBuilder } from "../../Builder/lib/builderContext";
import Button from "../../../shared/ui/Button/Button"
import type { BottomSheetComponent } from "../../../entities/screenAddons/model/screenAddonsTypes";
import styles from './ComponentTree.module.css'
import { createBottomSheet } from "../../../entities/screenAddons/lib/templates";
import type { BoxComponent, CardComponent, ColumnComponent, RowComponent, UIComponent } from "../../../entities/components/model/componentTypes";
import { isContainer } from "../lib/func";
import { useState } from "react";

type ContainerComponent = RowComponent | ColumnComponent | CardComponent | BoxComponent;

const BottomSheetTree = () => {
    const {
        screen,
        updateScreen,
        selectedComponentId,
        selectedBottomSheetId,
        setSelectedComponent,
        setSelectedBottomSheet
    } = useBuilder();

    const handleAddBottomSheet = () => {
        if (!screen) return;
        const newBottomSheet: BottomSheetComponent = createBottomSheet();
        updateScreen((current) => ({
            ...current,
            bottomSheets: [...(current.bottomSheets ?? []), newBottomSheet],
        }));
        setSelectedBottomSheet(newBottomSheet._id);
        setSelectedComponent(null);
    };

    const handleDeleteBottomSheet = (id?: string) => {
        if (!screen) return;

        updateScreen((current) => {
            const next = {
                ...current,
                bottomSheets: (current.bottomSheets ?? []).filter((bs) => bs._id !== selectedBottomSheetId),
            };
            return next;
        });

        if (!id || id === selectedBottomSheetId) {
            setSelectedBottomSheet(null);
            setSelectedComponent(null);
        }
    };
    const [open, setOpen] = useState<Set<string>>(new Set());
    const toggle = (id: string) =>
        setOpen(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });


    const renderUiNode = (node: UIComponent, path: string) => {
        const id = node._id ?? path;
        const hasChildren = isContainer(node) && node.children?.length > 0;
        const opened = open.has(id);

        return (
            <div className={styles.node} key={id}>
                <div
                    className={[
                        styles.row,
                        node._id && selectedComponentId === node._id ? styles.active : "",
                    ].join(" ")}
                >
                    {hasChildren ? (
                        <div className={styles.disclosure} onClick={() => toggle(id)}>
                            {opened ? "▾" : "▸"}
                        </div>
                    ) : (
                        <span className={styles.disclosurePlaceholder} />
                    )}

                    <div
                        className={styles.title}
                        onClick={() => setSelectedComponent(node._id ?? null)}
                        title={node._id || "(без id)"}
                    >
                        <span className={styles.type}>{node.type}</span>
                        <span className={styles.id}>{node._id ?? "—"}</span>
                    </div>
                </div>

                {hasChildren && opened && (
                    <div className={styles.children}>
                        {(node as ContainerComponent).children.map((child, idx) =>
                            renderUiNode(child, `${path}/${node.type}:${idx}`)
                        )}
                    </div>
                )}
            </div>
        );
    };


    const bottomSheets: BottomSheetComponent[] = (screen as any).bottomSheets ?? [];

    const renderBottomSheet = (sheet: BottomSheetComponent, idx: number) => {
        const id = sheet._id;
        const hasChildren = Array.isArray(sheet.children) && sheet.children.length > 0;
        const opened = open.has(id);

        return (
            <div className={styles.node} key={id}>
                <div
                    className={[
                        styles.row,
                        selectedBottomSheetId === id ? styles.active : "",
                    ].join(" ")}
                >
                    {hasChildren ? (
                        <div className={styles.disclosure} onClick={() => toggle(id)}>
                            {opened ? "▾" : "▸"}
                        </div>
                    ) : (
                        <span className={styles.disclosurePlaceholder} />
                    )}

                    <div
                        className={styles.title}
                        onClick={() => setSelectedBottomSheet(id)}
                        title={id}
                    >
                        <span className={styles.type}>bottomSheet</span>
                        <span className={styles.id}>{id}</span>
                    </div>
                </div>

                {hasChildren && opened && (
                    <div className={styles.children}>
                        {sheet.children.map((child, cIdx) =>
                            renderUiNode(child as UIComponent, `bottomSheets:${idx}/${child.type}:${cIdx}`)
                        )}
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className={styles.tree} role="tree">
            < div className={styles.section} >
                <div className={styles.sectionHeader}>bottomSheets</div>
                <div className={styles.sectionBody}>
                    {bottomSheets.length
                        ? bottomSheets.map((b, idx) => renderBottomSheet(b, idx))
                        : <div className={styles.dim}>пусто</div>}
                </div>
                <div className={styles.button_container}>
                    <Button onClick={handleAddBottomSheet}>Добавить</Button>
                    <Button style={{ background: "#e12323" }} onClick={handleDeleteBottomSheet}>Удалить</Button>
                </div>
            </div >
        </div>
    )
}

export default BottomSheetTree