import React from "react";
import { useBuilder } from "../../../Builder/lib/builderContext";
import styles from "./ComponentControls.module.css";
import Button from "../../../../shared/ui/Button/Button";


export const ComponentControls: React.FC = () => {
  const {
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

  const handleDelete = () => {
    if (confirm("Удалить компонент?")) {
      deleteComponent(selectedComponentId);
    }
  };

  return (
    <div className={styles.container}>

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
      </div>
    </div>
  );
};
