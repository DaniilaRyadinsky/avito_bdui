import React from "react";
import type {
  CardComponent as CardComponentType,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";

interface CardComponentProps {
  component: CardComponentType;
  isSelected?: boolean;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  component,
  isSelected = false,
  onSelect,
  onAction,
}) => {
  const {
    children = [],
    elevation = 4,
    shape = {},
    background = "#FFFFFF",
    shadow = {},
    modifier = {},
  } = component;

  const handleClick = () => {
    if (component.id && onSelect) {
      onSelect(component.id);
    }
    if (component.id && onAction) {
      onAction(component.id, { type: "click" });
    }
  };

  const { padding = {}, clip, border, clickable, alpha = 1.0 } = modifier;

  const cardStyle: React.CSSProperties = {
    backgroundColor: background,
    borderRadius: shape.cornerRadius
      ? `${shape.cornerRadius}px`
      : clip?.cornerRadius
      ? `${clip.cornerRadius}px`
      : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    boxShadow: shadow.elevation
      ? `0 ${shadow.elevation}px ${shadow.elevation * 2}px ${
          shadow.color || "rgba(0,0,0,0.1)"
        }`
      : `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.1)`,
    padding: `${padding.top || 16}px ${padding.end || 16}px ${
      padding.bottom || 16
    }px ${padding.start || 16}px`,
    opacity: alpha,
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
  };

  return (
    <div style={cardStyle} onClick={handleClick} title={component.id}>
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
