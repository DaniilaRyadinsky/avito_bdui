import React, { useState } from "react";
import styles from "./TemplateManager.module.css";
import { useBuilder } from "../../../Builder/lib/builderContext";
import type { UIComponent } from "../../../../entities/components/model/componentTypes";
import Summary from "../../../../shared/ui/Summary/Summary";
import Button from "../../../../shared/ui/Button/Button";
import { TextInput } from "../../../../shared/ui/TextInput/TextInput";

export const TemplateManager: React.FC = () => {
  const { selectedComponentId, screen, customTemplates, addCustomTemplate } =
    useBuilder();

  const [isCreating, setIsCreating] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const findSelectedComponent = (): UIComponent | null => {
    if (!screen || !selectedComponentId) return null;

    const findInTree = (components: UIComponent[]): UIComponent | null => {
      for (const comp of components) {
        if (comp._id === selectedComponentId) {
          return comp;
        }
        if ("children" in comp && comp.children) {
          const found = findInTree(comp.children);
          if (found) return found;
        }
      }
      return null;
    };

    return (
      findInTree(screen.content) ||
      findInTree(screen.topBar || []) ||
      findInTree(screen.bottomBar || []) ||
      (screen.bottomSheets || []).reduce<UIComponent | null>((found, bs) => {
        return found || findInTree(bs.children || []);
      }, null)
    );
  };

  const handleCreateTemplate = () => {
    if (!templateName.trim()) return;

    const selectedComponent = findSelectedComponent();
    if (!selectedComponent) {
      return;
    }

    const regenerateIds = (comp: UIComponent): UIComponent => {
      const newId = `comp_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const newComp: UIComponent = {
        ...comp,
        _id: newId,
      };

      if ("children" in newComp && Array.isArray(newComp.children)) {
        (newComp as any).children = newComp.children.map((child) =>
          regenerateIds(child)
        );
      }

      return newComp;
    };

    const templateWithNewIds = regenerateIds(selectedComponent);
    addCustomTemplate(templateWithNewIds, templateName.trim());
    setTemplateName("");
    setIsCreating(false);
  };

  const selectedComponent = findSelectedComponent();

  return (
    <div className={styles.container}>
      <Summary title="Создание шаблонов">
        <div className={styles.managementSection}>
          <div className={styles.header}>
            <Button
              onClick={() => setIsCreating(true)}
              disabled={!selectedComponent}
            >
              💾 Сохранить выделенный компонент
            </Button>
          </div>

          {isCreating && selectedComponent && (
            <div className={styles.creationForm}>
              <TextInput
                placeholder="Название шаблона"
                value={templateName}
                onChange={(value) => setTemplateName(value)}
              />
              <div className={styles.formActions}>
                <Button
                  onClick={handleCreateTemplate}
                  disabled={!templateName.trim()}
                >
                  Сохранить
                </Button>
                <Button onClick={() => setIsCreating(false)}>Отмена</Button>
              </div>
            </div>
          )}

          {customTemplates.length === 0 && (
            <div className={styles.emptyState}>
              Нет сохраненных компонентов. Выделите компонент и нажмите
              "Сохранить выделенный"
            </div>
          )}
        </div>
      </Summary>
    </div>
  );
};
