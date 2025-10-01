import React from "react";
import type { UIComponent } from "../../model/types";
import { TextComponent } from "./TextComponent/TextComponent";
import { ButtonComponent } from "./ButtonComponent/ButtonComponent";
import { ImageComponent } from "./ImageComponent/ImageComponent";
import { IconComponent } from "./IconComponent/IconComponent";
import { RowComponent } from "./RowComponent/RowComponent";
import { ColumnComponent } from "./ColumnComponent/ColumnComponent";
import { CheckboxComponent } from "./CheckboxComponent/CheckboxComponent";
import { SpacerComponent } from "./SpacerComponent/SpacerComponent";
import { CardComponent } from "./CardComponent/CardComponent";
import { BoxComponent } from "./BoxComponent/BoxComponent";

interface ComponentFactoryProps {
  component: UIComponent;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const ComponentFactory: React.FC<ComponentFactoryProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {
  
  const isSelected = selectedId === component.id

  const handleSelect = (v: string) => {
      onSelect?.(v);
  };

  const handleAction = (action: any) => {
    if (component.id) {
      onAction?.(component.id, action);
    }
  };

  // Передаем пропсы в КАЖДЫЙ компонент
  const commonProps = {
    selectedId,
    onSelect: handleSelect,
    onAction: handleAction,
  };

  switch (component.type) {
    case "text":
      return <TextComponent component={component} {...commonProps} />;

    case "button":
      return <ButtonComponent component={component} {...commonProps} />;

    case "image":
      return <ImageComponent component={component} {...commonProps} />;

    case "icon":
      return <IconComponent component={component} {...commonProps} />;

    case "row":
      return <RowComponent component={component} {...commonProps} />;

    case "column":
      return <ColumnComponent component={component} {...commonProps} />;

    case "checkbox":
      return <CheckboxComponent component={component} {...commonProps} />;

    case "spacer":
      return <SpacerComponent component={component} {...commonProps} />;

    case "card":
      return <CardComponent component={component} {...commonProps} />;

    case "box":
      return <BoxComponent component={component} {...commonProps} />;

    default:
      return (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            border: "2px dashed #f44336",
            color: "#c62828",
            fontSize: "12px",
          }}
        >
          Unknown: {component.type}
        </div>
      );
  }
};
