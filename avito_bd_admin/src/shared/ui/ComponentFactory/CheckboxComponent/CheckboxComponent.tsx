import React from "react";
import type { CheckboxComponent as CheckboxComponentType } from "../../../model/types";

interface CheckboxComponentProps {
  component: CheckboxComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  component,
  selectedId,
  onSelect,
}) => {
  const {
    isChecked = false,
    enabled = true,
    colors = {},
    modifier = {},
  } = component;
  
  const isSelected = selectedId == component.id

  const { checkedColor = "#000000", uncheckedColor = "#CCCCCC" } = colors;

  const { size = {}, padding = {}, clickable, alpha = 1.0 } = modifier;

  const checkboxStyle: React.CSSProperties = {
    width: size.width || 24,
    height: size.height || 24,
    backgroundColor: isChecked ? checkedColor : uncheckedColor,
    opacity: enabled ? alpha : 0.6,
    cursor: clickable && enabled ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    border: "2px solid #ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${
      padding.bottom || 0
    }px ${padding.start || 0}px`,
  };

  const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (component.id && onSelect) {
        onSelect(e.currentTarget.id);
      }
    };

  return (
    <div style={checkboxStyle} onClick={handleClick} id={component.id}>
      {isChecked && (
        <span style={{ color: "#FFFFFF", fontSize: "14px" }}>✓</span>
      )}
    </div>
  );
};
