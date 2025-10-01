// features/Builder/ui/ComponentAdder/ComponentAdder.tsx
import React from "react";
import type { UIComponent } from "../../../../shared/model/types";
import styles from "./ComponentAdder.module.css";
import { useBuilder } from "../../../Builder/lib/builderContext";

const componentTemplates: {
  type: UIComponent["type"];
  name: string;
  defaultProps: Partial<UIComponent>;
}[] = [
  {
    type: "text",
    name: "Текст",
    defaultProps: {
      text: "Новый текст",
      style: { fontSize: 16, color: "#000000" },
    },
  },
  {
    type: "button",
    name: "Кнопка",
    defaultProps: {
      text: "Новая кнопка",
      style: { background: "#007AFF", textColor: "#FFFFFF" },
    },
  },
  {
    type: "image",
    name: "Изображение",
    defaultProps: {
      url: "https://via.placeholder.com/150",
      contentDescription: "Placeholder image",
    },
  },
  {
    type: "card",
    name: "Карточка",
    defaultProps: {
      background: "#FFFFFF",
      children: [],
    },
  },
];

export const ComponentAdder: React.FC = () => {
  const { screen, updateScreen, selectedComponentId } = useBuilder();

  const handleAddComponent = (template: (typeof componentTemplates)[0]) => {
    if (!screen) return;

    const newComponent: UIComponent = {
      type: template.type,
      id: `new-${template.type}-${Date.now()}`,
      ...template.defaultProps,
    } as UIComponent;

    console.log("➕ Adding new component:", newComponent);

    // Если есть выделенный компонент, добавляем как ребенка
    if (selectedComponentId && screen) {
      updateScreen((currentScreen) => {
        const addToParent = (components: UIComponent[]): UIComponent[] => {
          return components.map((comp) => {
            if (comp.id === selectedComponentId && "children" in comp) {
              console.log("✅ Adding to parent:", comp.id);
              return {
                ...comp,
                children: [...comp.children, newComponent],
              };
            }

            if ("children" in comp && comp.children) {
              return {
                ...comp,
                children: addToParent(comp.children),
              };
            }

            return comp;
          });
        };

        return {
          ...currentScreen,
          content: addToParent(currentScreen.content),
          topBar: addToParent(currentScreen.topBar),
          bottomBar: addToParent(currentScreen.bottomBar),
        };
      });
    } else {
      // Иначе добавляем в корень content
      updateScreen((currentScreen) => ({
        ...currentScreen,
        content: [...currentScreen.content, newComponent],
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h3>Добавить компонент</h3>
      <div className={styles.templates}>
        {componentTemplates.map((template) => (
          <button
            key={template.type}
            className={styles.templateButton}
            onClick={() => handleAddComponent(template)}
          >
            {template.name}
          </button>
        ))}
      </div>
      <div className={styles.hint}>
        {selectedComponentId
          ? `Добавить в: ${selectedComponentId}`
          : "Добавить в корень"}
      </div>
    </div>
  );
};
