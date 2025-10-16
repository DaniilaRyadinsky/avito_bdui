import React from "react";
import type { CheckboxComponent as CheckboxComponentType } from "../../../model/types";
import { calculateSize } from "../utils";

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

  const isSelected = selectedId == component._id

  const { checkedColor = "#000000", uncheckedColor = "#CCCCCC" } = colors;

  const { size = {}, padding = {}, margin={}, clickable, alpha = 1.0, shadow } = modifier;

  const checkboxStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end),
    height: calculateSize(size?.height, padding.top, padding.bottom),
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
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0}px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  return (
    <div style={checkboxStyle} onClick={handleClick} id={component._id}>
      {isChecked && (
        <span style={{ color: "#FFFFFF", fontSize: "14px" }}>✓</span>
      )}
    </div>
  );
};
