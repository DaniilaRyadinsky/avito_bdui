import React from "react";
import type { ButtonComponent as ButtonComponentType } from "../../../model/types";
import { calculateWidth, calculateHeight } from "../utils";

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
  const { text, enabled = true, style = {}, modifier = {}, icon, } = component;

  const {
    background = "#007AFF",
    textColor = "#FFFFFF",
    fontSize = 16,
    fontWeight = "normal",
    fontStyle = "normal",
    shape = {},
    border = {},

  } = style;

  const { size } = modifier;

  const { padding = {}, clickable, alpha = 1.0 , shadow} = modifier;

  const buttonStyle: React.CSSProperties = {
    width:
      size?.width === "wrap_content"
        ? "fit-content"
        : size?.width === "match_parent"
          ? `${calculateWidth(padding)}`
          : `${size?.width}px`,
    height: size?.height === "wrap_content"
      ? "fit-content"
      : size?.height === "match_parent"
        ? `${calculateHeight(padding)}` : `${size?.height}px`,
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
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`,
    padding: `${padding.top || 12}px ${padding.end || 16}px ${padding.bottom || 12
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
