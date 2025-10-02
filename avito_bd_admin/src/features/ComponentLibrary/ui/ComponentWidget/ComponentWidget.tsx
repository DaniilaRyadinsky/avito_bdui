// features/ComponentLibrary/ui/ComponentsWidget/ComponentsWidget.tsx
import React from "react";
import styles from "./ComponentWidget.module.css";
import arrow from "../../../../shared/assets/icons/arrow.svg";
import { useBuilder } from "../../../Builder/lib/builderContext";
import type { UIComponent } from "../../../../shared/model/types";
import Summary from "../../../../shared/ui/Summary/Summary";
import { createText, createButton, createImage, createIcon, createRow, createColumn, createCheckbox, createSpacer, createCard, createBox, createSnackbar } from "../../lib/constant";

// Типы для шаблонов компонентов
const componentTemplates: {
  type: UIComponent["type"];
  name: string;
}[] = [
    {
      type: "text",
      name: "Текст"
    },
    {
      type: "button",
      name: "Кнопка"
    },
    {
      type: "image",
      name: "Изображение"
    },
    {
      type: "card",
      name: "Карточка"
    },
    {
      type: "row",
      name: "Строка"
    },
  ];

const createComponent = (type: UIComponent["type"]) => {
  switch (type) {
    case ("text"):
      return createText()
    case ("button"):
      return createButton()
    case ("image"):
      return createImage()
    case ("icon"):
      return createIcon()
    case ("row"):
      return createRow()
    case ("column"):
      return createColumn()
    case ("checkbox"):
      return createCheckbox()
    case ("spacer"):
      return createSpacer()
    case ("card"):
      return createCard()
    case ("box"):
      return createBox()
    case ("snackbar"):
      return createSnackbar()
  }

}

// Компонент для элемента библиотеки
const LibraryItem: React.FC<{
  name: string;
  type: string;
}> = ({ name, type, }) => {
  const { screen, updateScreen, selectedComponentId } = useBuilder();

  const handleAddComponent = () => {
    if (!screen) return;

    const newComponent: UIComponent = createComponent(type as UIComponent["type"]);

    console.log("➕ Adding new component:", newComponent);

    // Если есть выделенный компонент И он контейнерный, добавляем как ребенка
    if (selectedComponentId && screen) {
      updateScreen((currentScreen) => {
        const addToParent = (components: UIComponent[]): UIComponent[] => {
          return components.map((comp) => {
            // Если нашли выделенный компонент и он может содержать детей
            if (comp._id === selectedComponentId && "children" in comp) {
              console.log("✅ Adding to parent:", comp._id);
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
            />
          ))}
        </div>
      </Summary>

    </div >
  );
};

export default ComponentsWidget;
