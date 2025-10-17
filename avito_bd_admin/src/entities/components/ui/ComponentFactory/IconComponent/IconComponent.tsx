import React from "react";
import type { IconComponent as IconComponentType } from "../../../../../shared/model/types";
import {  calculateSize } from "../utils";

interface IconComponentProps {
  component: IconComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const IconComponent: React.FC<IconComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {
  const {
    icon,
    contentDescription,
    tint = "#000000",
    modifier = {},
  } = component;

  const isSelected = selectedId == component._id
  const {
    size = {},
    padding = {},
    margin = {},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
    shadow
  } = modifier;

  const iconStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end, margin.start, margin.end,true),
    height: calculateSize(size?.height, padding.top, padding.bottom,margin.top, margin.top, true),
    color: tint,
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding?.top || 0}px ${padding?.end || 0}px ${padding?.bottom || 0}px ${padding?.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: clickable || onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  return (
    <div
      style={iconStyle}
      onClick={handleClick}
      id={contentDescription || component._id}
    >
      {icon}
    </div>
  );
};
