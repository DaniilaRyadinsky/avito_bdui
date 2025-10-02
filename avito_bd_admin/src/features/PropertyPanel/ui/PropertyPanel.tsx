import React from "react";
import type { ContentScale, ImageComponent, UIComponent, UIScreen } from "../../../shared/model/types";
import { useBuilder } from "../../Builder/lib/builderContext";
import { ButtonStyleGroup } from "../groups/ButtonStyleGroup";
import { LayoutGroup } from "../groups/LayoutGroup";
import { PaddingGroup } from "../groups/PaddingGroup";
import { TextStyleGroup } from "../groups/TextStyleGroup";
import { VisualsGroup } from "../groups/VisualsGroup";
import { applyDefaultsToComponent } from "../lib/constants";
import { updateComponentById } from "../lib/utils";
import { ImageStyleGroup } from "../groups/ImageStyleGroup";

export const PropertyPanel: React.FC<{ className?: string }> = ({ className }) => {
  const { screen, updateScreen, selectedComponentId } = useBuilder();

  const isImage = (c: UIComponent): c is ImageComponent => c.type === "image";

  // Поисковые хелперы можно вынести вне компонента, но оставлю тут для краткости
  const findInList = (list: UIComponent[] | undefined, id: string): UIComponent | null => {
    if (!list) return null;
    for (const comp of list) {
      if (comp._id === id) return comp;
      if ("children" in comp && comp.children?.length) {
        const found = findInList(comp.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findComponentById = (screen: UIScreen | null | undefined, id: string | null): UIComponent | null => {
    if (!screen || !id) return null;
    return findInList(screen.topBar, id) || findInList(screen.content, id) || findInList(screen.bottomBar, id) || null;
  };

  // Важно: хук вызывается всегда
  const targetComponent = React.useMemo(
    () => applyDefaultsToComponent(findComponentById(screen, selectedComponentId)),
    [screen, selectedComponentId]
  );

  // Тоже хук — вызывать всегда, до раннего return
  const updateSelected = React.useCallback(
    (mutator: (c: UIComponent) => UIComponent) => {
      if (!selectedComponentId) return;
      updateScreen(prev => {
        if (!prev) return prev;
        return updateComponentById(prev, selectedComponentId, mutator);
      });
    },
    [selectedComponentId, updateScreen]
  );

  // Теперь можно делать ранний return — порядок хуков уже зафиксирован
  if (!targetComponent) {
    return <div className={`panel-card ${className ?? ""}`}>Выберите элемент</div>;
  }

  return (
    <div className={`panel-card ${className ?? ""}`}>
      <div className="panel-card__header">Свойства</div>
      <div className="panel-card__content">
        <LayoutGroup
          value={targetComponent.modifier}
          onChange={(partialModifier) =>
            updateSelected(c => ({ ...c, modifier: { ...c.modifier, ...partialModifier } }))
          }
        />
        <PaddingGroup
          value={targetComponent.modifier?.padding}
          onChange={(partialPadding) =>
            updateSelected(c => ({
              ...c,
              modifier: { ...c.modifier, padding: { ...c.modifier?.padding, ...partialPadding } }
            }))
          }
        />

        {targetComponent.type === "image" && (
          <ImageStyleGroup
            // если вдруг где-то пролезает null — превращаем в undefined
            value={targetComponent}
            onChange={(patch: Partial<ImageComponent>) =>
              updateSelected(c =>
                isImage(c) ? { ...c, ...patch } : c
              )
            }
          />
        )}
        {targetComponent.type === "text" && (
          <TextStyleGroup
            text={targetComponent.text}
            value={(targetComponent as any).style}
            onChange={(partialStyle) =>
              updateSelected(c => ({ ...c, style: { ...(c as any).style, ...partialStyle } as any }))
            }
            onTextChange={(newText) =>
              updateSelected(c => ({
                ...c,
                text: newText, // просто обновляем поле text
              }))}
          />
        )}
        {targetComponent.type === "button" && (
          <ButtonStyleGroup
            value={(targetComponent as any).style}
            onChange={(partialStyle) =>
              updateSelected(c => ({ ...c, style: { ...(c as any).style, ...partialStyle } as any }))
            }
          />
        )}
        <VisualsGroup
          value={targetComponent.modifier}
          onChange={(partialModifier) =>
            updateSelected(c => ({ ...c, modifier: { ...c.modifier, ...partialModifier } }))
          }
        />

      </div>
    </div>
  );
};