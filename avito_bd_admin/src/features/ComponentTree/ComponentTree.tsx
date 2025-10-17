import React, { useMemo, useState } from "react";
import styles from "./ComponentTree.module.css";
import type { RowComponent, ColumnComponent, CardComponent, BoxComponent, UIComponent } from "../../entities/components/model/componentTypes";
import type { UIScreen } from "../../entities/screen/model/screenTypes";
import { useBuilder } from "../Builder/lib/builderContext";



type ContainerComponent = RowComponent | ColumnComponent | CardComponent | BoxComponent;

const isContainer = (c: UIComponent): c is ContainerComponent => {
  return (
    c.type === "row" ||
    c.type === "column" ||
    c.type === "card" ||
    c.type === "box"
  );
};

type SectionKey = "topBar" | "content" | "bottomBar" | "snackbars";

const SECTION_LABEL: Record<SectionKey, string> = {
  topBar: "topBar",
  content: "content",
  bottomBar: "bottomBar",
  snackbars: "snackbars",
};

export const ComponentTree: React.FC = () => {
  const ctx = useBuilder();
  if (!ctx) return null;

  const { screen, selectedComponentId, setSelectedComponent } = ctx;

  // set развёрнутых узлов по их path/id
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sections = useMemo(() => {
    if (!screen) return [] as Array<{ key: SectionKey; items: UIComponent[] }>;
    return (["topBar", "content", "bottomBar", "snackbars"] as SectionKey[]).map(
      key => ({ key, items: (screen as UIScreen)[key] as UIComponent[] })
    );
  }, [screen]);

  if (!screen) {
    return <div className={styles.empty}>Нет активного экрана</div>;
  }

  const renderNode = (node: UIComponent, path: string) => {
    const id = node._id ?? path; // fallback-ключ, если _id нет
    const selectableId = node._id ?? ""; // для setSelectedComponent
    const hasChildren = isContainer(node) && Array.isArray(node.children) && node.children.length > 0;
    const opened = open.has(id);

    return (
      <div className={styles.node} key={id}>
        <div
          className={[
            styles.row,
            selectableId && selectedComponentId === selectableId ? styles.active : "",
          ].join(" ")}
        >
          {hasChildren ? (
            <button
              className={styles.disclosure}
              onClick={() => toggle(id)}
              aria-label={opened ? "Collapse" : "Expand"}
            >
              {opened ? "▾" : "▸"}
            </button>
          ) : (
            <span className={styles.disclosurePlaceholder} />
          )}

          <button
            className={styles.title}
            onClick={() => setSelectedComponent(selectableId || null)}
            title={node._id || "(без id)"}
          >
            <span className={styles.type}>{node.type}</span>
            <span className={styles.id}>{node._id ?? "—"}</span>
          </button>
        </div>

        {hasChildren && opened && (
          <div className={styles.children}>
            {(node as ContainerComponent).children.map((child, idx) =>
              renderNode(child, `${path}/${node.type}:${idx}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.tree} role="tree">
      {sections.map(({ key, items }) => (
        <div className={styles.section} key={key}>
          <div className={styles.sectionHeader}>{SECTION_LABEL[key]}</div>
          <div className={styles.sectionBody}>
            {items?.length
              ? items.map((c, idx) => renderNode(c, `${key}:${idx}`))
              : <div className={styles.dim}>пусто</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentTree;
