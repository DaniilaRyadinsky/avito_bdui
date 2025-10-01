import React from "react";
import type { ButtonComponent as ButtonComponentType } from "../../../model/types";

interface ButtonComponentProps {
  component: ButtonComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {

  const isSelected = selectedId == component._id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (component._id && onSelect) {
       onSelect(e.currentTarget.id);
    }
    if (component._id && onAction && component.actions) {
      onAction(component._id, { type: "click" });
    }
  };
  const { text, enabled = true, style = {}, modifier = {}, icon } = component;

  const {
    background = "#007AFF",
    textColor = "#FFFFFF",
    fontSize = 16,
    fontWeight = "normal",
    fontStyle = "normal",
    shape = {},
    border = {},
    elevation = 0,
  } = style;

  const { padding = {}, clickable, alpha = 1.0 } = modifier;

  const buttonStyle: React.CSSProperties = {
    backgroundColor: background,
    color: textColor,
    fontSize: `${fontSize}px`,
    fontWeight,
    fontStyle,
    borderRadius: shape.cornerRadius ? `${shape.cornerRadius}px` : "0",
    border:
      border.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    boxShadow: elevation
      ? `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.3)`
      : "none",
    padding: `${padding.top || 12}px ${padding.end || 16}px ${
      padding.bottom || 12
    }px ${padding.start || 16}px`,
    opacity: alpha,
    cursor: clickable || onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      disabled={!enabled}
      id={component._id}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};
