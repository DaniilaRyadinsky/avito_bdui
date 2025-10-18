import React, { useState } from "react";
import styles from "./TemplateManager.module.css";
import { useBuilder } from "../../../Builder/lib/builderContext";
import type { UIComponent } from "../../../../entities/components/model/componentTypes";
import Summary from "../../../../shared/ui/Summary/Summary";
import Button from "../../../../shared/ui/Button/Button";
import { TextInput } from "../../../../shared/ui/TextInput/TextInput";
import { findComponentById } from "../../../../shared/lib/searchHelpers";

export const TemplateManager: React.FC = () => {
  const { selectedComponentId, screen, customTemplates, addCustomTemplate } =
    useBuilder();

  const [isCreating, setIsCreating] = useState(false);
  const [templateName, setTemplateName] = useState("");

  const selectedComponent = findComponentById(screen, selectedComponentId);

  const handleCreateTemplate = () => {
    if (!templateName.trim()) return;

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


  return (
    <div className={styles.container}>
      <Summary title="Создание шаблонов">
        <div className={styles.managementSection}>
          <div className={styles.header}>
            <Button
              onClick={() => setIsCreating(true)}
              disabled={!selectedComponent}
              style={{ width: "100%" }}
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
