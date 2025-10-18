import React from "react";
import { useBuilder } from "../../Builder/lib/builderContext";
import { ButtonStyleGroup } from "../groups/ButtonStyleGroup";
import { LayoutGroup } from "../groups/LayoutGroup";
import { PaddingGroup } from "../groups/PaddingGroup";
import { TextStyleGroup } from "../groups/TextStyleGroup";
import { VisualsGroup } from "../groups/VisualsGroup";
import { ActionGroup } from "../groups/ActionGroup";
import { applyDefaultsToComponent } from "../lib/constants";
import { updateComponentById } from "../lib/utils";
import { ImageStyleGroup } from "../groups/ImageStyleGroup";
import { AligmentStyleGroup } from "../groups/AligmentStyleGroup";
import type {
  UIComponent,
  ImageComponent,
  RowComponent,
  ColumnComponent,
} from "../../../entities/components/model/componentTypes";
import { findComponentById } from "../../../shared/lib/searchHelpers";
import SnackbarGroup from "../groups/SnackbarGroup";

export const PropertyPanel = () => {
  const { screen, updateScreen, selectedComponentId, selectedSnackBarId } = useBuilder();


  const isImage = (c: UIComponent): c is ImageComponent => c.type === "image";
  const isRow = (c: UIComponent): c is RowComponent => c.type === "row";
  const isColumn = (c: UIComponent): c is ColumnComponent =>
    c.type === "column";

  const targetComponent = React.useMemo(
    () =>
      applyDefaultsToComponent(findComponentById(screen, selectedComponentId))
    ,
    [screen, selectedComponentId]
  );

  const updateSelected = React.useCallback(
    (mutator: (c: UIComponent) => UIComponent) => {
      if (!selectedComponentId) return;
      updateScreen((prev) => {
        if (!prev) return prev;
        return updateComponentById(prev, selectedComponentId, mutator);
      });
    },
    [selectedComponentId, updateScreen]
  );

  if (selectedSnackBarId) return <SnackbarGroup />

  if (!targetComponent) {
    return (
      <div className={`panel-card`}>Выберите элемент</div>
    );
  }



  return (
    <div className={`panel-card`}>
      <div className="panel-card__header">Свойства</div>
      <div className="panel-card__content">
        <LayoutGroup
          value={targetComponent.modifier}
          onChange={(partialModifier) =>
            updateSelected((c) => ({
              ...c,
              modifier: { ...c.modifier, ...partialModifier },
            }))
          }
        />

        {(targetComponent.type === "row" ||
          targetComponent.type === "column") && (
            <AligmentStyleGroup
              value={targetComponent}
              onChange={(
                patch: Partial<RowComponent> | Partial<ColumnComponent>
              ) =>
                updateSelected((c) => {
                  if (isRow(c)) {
                    return { ...c, ...(patch as Partial<RowComponent>) };
                  }
                  if (isColumn(c)) {
                    return { ...c, ...(patch as Partial<ColumnComponent>) };
                  }
                  return c;
                })
              }
            />
          )}

        {targetComponent.type !== "spacer" && (
          <PaddingGroup
            padding={targetComponent.modifier?.padding}
            onChangePadding={(partialPadding) =>
              updateSelected((c) => ({
                ...c,
                modifier: {
                  ...c.modifier,
                  padding: { ...c.modifier?.padding, ...partialPadding },
                },
              }))
            }
            margin={targetComponent.modifier?.margin}
            onChangeMargin={(partialMargin) =>
              updateSelected((c) => ({
                ...c,
                modifier: {
                  ...c.modifier,
                  margin: { ...c.modifier?.padding, ...partialMargin },
                },
              }))
            }
          />
        )}

        {targetComponent.type === "image" && (
          <ImageStyleGroup
            value={targetComponent}
            onChange={(patch: Partial<ImageComponent>) =>
              updateSelected((c) => (isImage(c) ? { ...c, ...patch } : c))
            }
          />
        )}
        {targetComponent.type === "text" && (
          <TextStyleGroup
            text={targetComponent.text}
            value={(targetComponent as any).style}
            onChange={(partialStyle) =>
              updateSelected((c) => ({
                ...c,
                style: { ...(c as any).style, ...partialStyle } as any,
              }))
            }
            onTextChange={(newText) =>
              updateSelected((c) => ({
                ...c,
                text: newText,
              }))
            }
          />
        )}
        {targetComponent.type === "button" && (
          <ButtonStyleGroup
            text={targetComponent.text}
            value={(targetComponent as any).style}
            onChange={(partialStyle) =>
              updateSelected((c) => ({
                ...c,
                style: { ...(c as any).style, ...partialStyle } as any,
              }))
            }
            onTextChange={(newText) =>
              updateSelected((c) => ({
                ...c,
                text: newText,
              }))
            }
          />
        )}
        <VisualsGroup
          value={targetComponent.modifier}
          onChange={(partialModifier) =>
            updateSelected((c) => ({
              ...c,
              modifier: { ...c.modifier, ...partialModifier },
            }))
          }
        />
        <ActionGroup
          actions={targetComponent.actions || []}
          modifier={targetComponent.modifier}
          onChange={(newActions) => {
            console.log("Setting new actions:", newActions);
            updateSelected((c) => ({
              ...c,
              actions: newActions,
            }));
          }}
          onModifierChange={(partialModifier) => {
            console.log("Setting modifier:", partialModifier);
            updateSelected((c) => ({
              ...c,
              modifier: { ...c.modifier, ...partialModifier },
            }));
          }}
        />
      </div>
    </div>
  );
};
