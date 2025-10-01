// features/ComponentLibrary/ui/ComponentsWidget/ComponentsWidget.tsx
import React from "react";
import styles from "./ComponentWidget.module.css";
import arrow from "../../../../shared/assets/icons/arrow.svg";
import { useBuilder } from "../../../Builder/lib/builderContext";
import type { UIComponent } from "../../../../shared/model/types";
import Summary from "../../../../shared/ui/Summary/Summary";

// Типы для шаблонов компонентов
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
    {
      type: "row",
      name: "Строка",
      defaultProps: {
        children: [],
      },
    },
    {
      type: "column",
      name: "Колонка",
      defaultProps: {
        children: [],
      },
    },
  ];

// Компонент для элемента библиотеки
const LibraryItem: React.FC<{
  name: string;
  type: string;
  defaultProps: Partial<UIComponent>;
}> = ({ name, type, defaultProps }) => {
  const { screen, updateScreen, selectedComponentId } = useBuilder();

  const handleAddComponent = () => {
    if (!screen) return;

    const newComponent: UIComponent = {
      type: type as UIComponent["type"],
      id: `new-${type}-${Date.now()}`,
      ...defaultProps,
    } as UIComponent;

    console.log("➕ Adding new component:", newComponent);

    // Если есть выделенный компонент И он контейнерный, добавляем как ребенка
    if (selectedComponentId && screen) {
      updateScreen((currentScreen) => {
        const addToParent = (components: UIComponent[]): UIComponent[] => {
          return components.map((comp) => {
            // Если нашли выделенный компонент и он может содержать детей
            if (comp.id === selectedComponentId && "children" in comp) {
              console.log("✅ Adding to parent:", comp.id);
              return {
                ...comp,
                children: [...comp.children, newComponent],
              };
            }

            // Рекурсивно ищем в детях
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
      // Добавляем в корень content
      updateScreen((currentScreen) => ({
        ...currentScreen,
        content: [...currentScreen.content, newComponent],
      }));
    }
  };

  return (
    <div className={styles.libraryItem} onClick={handleAddComponent}>
      {name}
    </div>
  );
};

const ComponentsWidget = () => {
  return (
    <div className={styles.container}>
      <Summary title="Базовые компоненты">
        <div className={styles.componentsList}>
          {componentTemplates.map((template) => (
            <LibraryItem
              key={template.type}
              name={template.name}
              type={template.type}
              defaultProps={template.defaultProps}
            />
          ))}
        </div>
      </Summary>
      
    </div >
  );
};

export default ComponentsWidget;
