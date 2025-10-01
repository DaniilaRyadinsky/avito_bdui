import React from "react";
import type {
  BoxComponent as BoxComponentType,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";

interface BoxComponentProps {
  component: BoxComponentType;
  isSelected?: boolean;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const BoxComponent: React.FC<BoxComponentProps> = ({
  component,
  isSelected = false,
  onSelect,
  onAction,
}) => {
  const { children = [], modifier = {} } = component;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id && onSelect) {
      onSelect(component.id);
    }
  };

  const {
    padding = {},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
  } = modifier;

  const boxStyle: React.CSSProperties = {
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 12}px ${padding.end || 12}px ${
      padding.bottom || 12
    }px ${padding.start || 12}px`,
    opacity: alpha,
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
  };

  return (
    <div style={boxStyle} onClick={handleClick} title={component.id}>
      {children.map((child: UIComponent, index: number) => (
        <ComponentFactory
          key={child.id || index}
          component={child}
          isSelected={isSelected}
          onSelect={onSelect}
          onAction={onAction}
        />
      ))}
    </div>
  );
};
