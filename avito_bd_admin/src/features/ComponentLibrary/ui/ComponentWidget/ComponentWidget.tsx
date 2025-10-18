import React from "react";
import styles from "./ComponentWidget.module.css";
import { useBuilder } from "../../../Builder/lib/builderContext";

import Summary from "../../../../shared/ui/Summary/Summary";
import { componentTemplates } from "../../lib/constant";
import { createComponent } from "../../lib/templates";
import type { UIComponent } from "../../../../entities/components/model/componentTypes";
import { TemplateManager } from "../TemplateManager/TemplateManager";
import Button from "../../../../shared/ui/Button/Button";

const LibraryItem: React.FC<{
  name: string;
  type: string;
}> = ({ name, type }) => {
  const {
    screen,
    updateScreen,
    selectedComponentId,
    setSelectedComponent,
    selectedBottomSheetId,
  } = useBuilder();

  const handleAddComponent = () => {
    if (!screen) return;

    const newComponent: UIComponent = createComponent(
      type as UIComponent["type"]
    );

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
          bottomSheets: (screen.bottomSheets ?? []).map((bs) =>
            bs._id === selectedBottomSheetId
              ? { ...bs, children: addToParent(bs.children ?? []) }
              : bs
          ),
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

const CustomTemplateItem: React.FC<{
  template: UIComponent;
}> = ({ template }) => {
  const {
    screen,
    updateScreen,
    selectedComponentId,
    selectedBottomSheetId,
    removeCustomTemplate,
  } = useBuilder();

  const regenerateIds = (comp: UIComponent): UIComponent => {
    const newId = `comp_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const newComp: UIComponent = {
      ...comp,
      _id: newId,
    };

    delete (newComp as any).templateName;

    if ("children" in newComp && Array.isArray(newComp.children)) {
      (newComp as any).children = newComp.children.map((child) =>
        regenerateIds(child)
      );
    }

    return newComp;
  };

  const handleUseTemplate = () => {
    if (!screen) return;

    const newComponent = regenerateIds(template);

    console.log("➕ Adding custom template:", newComponent);

    if (selectedComponentId && screen) {
      updateScreen((currentScreen) => {
        const addToParent = (components: UIComponent[]): UIComponent[] => {
          return components.map((comp) => {
            if (comp._id === selectedComponentId && "children" in comp) {
              console.log("✅ Adding to parent:", comp._id);
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
          bottomSheets: (screen.bottomSheets ?? []).map((bs) =>
            bs._id === selectedBottomSheetId
              ? { ...bs, children: addToParent(bs.children ?? []) }
              : bs
          ),
        };
      });
    } else {
      updateScreen((currentScreen) => ({
        ...currentScreen,
        content: [...currentScreen.content, newComponent],
      }));
    }
  };

  const handleDeleteTemplate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем срабатывание onClick родителя
    removeCustomTemplate(template._id!);
  };

  return (
    <div className={styles.customLibraryItem} onClick={handleUseTemplate}>
      <div className={styles.templateInfo}>
        {(template as any).templateName}
      </div>
      <button
        className={styles.buttonTemplateDelete}
        onClick={handleDeleteTemplate}
        title="Удалить шаблон"
      >
        ×
      </button>
    </div>
  );
};

const ComponentsWidget = () => {
  const { customTemplates } = useBuilder();

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

      {/* Отображение кастомных компонентов в Summary */}
      {customTemplates.length > 0 && (
        <Summary title="Мои компоненты">
          <div className={styles.componentsList}>
            {customTemplates.map((template) => (
              <CustomTemplateItem key={template._id} template={template} />
            ))}
          </div>
        </Summary>
      )}

      {/* Менеджер шаблонов (только создание) */}
      <TemplateManager />
    </div>
  );
};

export default ComponentsWidget;
