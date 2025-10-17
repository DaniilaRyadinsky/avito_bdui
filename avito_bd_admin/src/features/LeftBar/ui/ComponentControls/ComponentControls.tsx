// features/Builder/ui/ComponentControls/ComponentControls.tsx
import React from "react";
import { useBuilder } from "../../../Builder/lib/builderContext";
import styles from "./ComponentControls.module.css";
import type { UIComponent } from "../../../../entities/components/model/componentTypes";
import Button from "../../../../shared/ui/Button/Button";


export const ComponentControls: React.FC = () => {
  const {
    screen,
    selectedComponentId,
    deleteComponent,
    moveComponent,
  } = useBuilder();

  const handleMoveUp = () => {
    if (selectedComponentId) {
      moveComponent(selectedComponentId, "up");
    }
  };

  const handleMoveDown = () => {
    if (selectedComponentId) {
      moveComponent(selectedComponentId, "down");
    }
  };

  if (!selectedComponentId) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          🎯 Выберите компонент для управления
        </div>
        <div className={styles.hint}>
          Кликните на любой компонент на экране чтобы выделить его
        </div>
      </div>
    );
  }

  // Функция для поиска компонента по всему дереву
  const findComponentInTree = (
    components: UIComponent[],
    targetId: string
  ): UIComponent | null => {
    for (const comp of components) {
      if (comp._id === targetId) return comp;

      if ("children" in comp && comp.children) {
        const found = findComponentInTree(comp.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };


  const handleDelete = () => {
    if (confirm("Удалить компонент?")) {
      deleteComponent(selectedComponentId);
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <h3>Управление компонентом</h3>
        <div className={styles.componentId}>ID: {selectedComponentId}</div>
        <div className={styles.componentType}>
          Тип: {selectedComponent?.type || "unknown"}
        </div>
      </div> */}

      <div className={styles.controls}>
        <div className={styles.section}>
          <h4>Действия</h4>
          <div className={styles.actions}>
            <Button onClick={handleDelete} style={{background:"#e12323"}}>
              🗑️ Удалить
            </Button>
            <Button onClick={handleMoveUp} >
              ↑ Вверх
            </Button>
            <Button onClick={handleMoveDown} >
              ↓ Вниз
            </Button>
          </div>
        </div>

        <div className={styles.section}>
          <h4>Информация</h4>
          <div className={styles.info}>
            <p>• Клик - выделение компонента</p>
            <p>• Используйте стрелки для перемещения</p>
            <p>• Удаление - кнопка выше</p>
          </div>
        </div>

        {/* {selectedComponent?.type === "text" && (
          <div className={styles.section}>
            <h4>Текст</h4>
            <div className={styles.textContent}>
              {(selectedComponent as any).text}
            </div>
          </div>
        )}

        {selectedComponent?.type === "button" && (
          <div className={styles.section}>
            <h4>Кнопка</h4>
            <div className={styles.textContent}>
              Текст: {(selectedComponent as any).text}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
