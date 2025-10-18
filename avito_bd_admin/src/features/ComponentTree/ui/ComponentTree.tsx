import { useMemo, useState } from "react";
import styles from "./ComponentTree.module.css";

import type { UIComponent } from "../../../entities/components/model/componentTypes";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";
import type { SnackbarComponent } from "../../../entities/screenAddons/model/screenAddonsTypes";
import { useBuilder } from "../../Builder/lib/builderContext";
import {
  isContainer,
  uiSectionKeys,
  type ContainerComponent,
} from "../lib/func";

export const ComponentTree = () => {
  const {
    screen,
    selectedComponentId,
    selectedSnackBarId,
    setSelectedComponent,

    setSelectedSnackBar,
  } = useBuilder();

  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (!screen) {
    return <div className={styles.empty}>Нет активного экрана</div>;
  }

  const uiSections = useMemo(
    () =>
      uiSectionKeys.map((key) => ({
        key,
        items: (screen as UIScreen)[key] as UIComponent[],
      })),
    [screen]
  );

  // --- Addons ---
  const snackbars: SnackbarComponent[] = (screen as any).snackbars ?? [];

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

  const renderSnackbar = (sb: SnackbarComponent) => {
    const id = sb._id;
    return (
      <div className={styles.node} key={id}>
        <div
          className={[
            styles.row,
            selectedSnackBarId === id ? styles.active : "",
          ].join(" ")}
        >
          <span className={styles.disclosurePlaceholder} />
          <div
            className={styles.title}
            onClick={() => setSelectedSnackBar(id)}
            title={id}
          >
            <span className={styles.type}>snackbar</span>
            <span className={styles.id}>{id}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tree} role="tree">
      {uiSections.map(({ key, items }) => (
        <div className={styles.section} key={key}>
          <div className={styles.sectionHeader}>{key}</div>
          <div className={styles.sectionBody}>
            {items?.length ? (
              items.map((c, idx) => renderUiNode(c, `${key}:${idx}`))
            ) : (
              <div className={styles.dim}>пусто</div>
            )}
          </div>
        </div>
      ))}

      {/* Snackbars */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>snackbars</div>
        <div className={styles.sectionBody}>
          {snackbars.length ? (
            snackbars.map(renderSnackbar)
          ) : (
            <div className={styles.dim}>пусто</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentTree;
