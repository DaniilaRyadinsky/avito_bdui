import React from "react";
import type { IconComponent as IconComponentType } from "../../../model/types";

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

  const isSelected = selectedId == component.id
  const {
    size = {},
    padding = {},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
  } = modifier;

  const iconStyle: React.CSSProperties = {
    width: size.width || 24,
    height: size.height || 24,
    color: tint,
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0
      }px ${padding.start || 0}px`,
    opacity: alpha,
    cursor: clickable || onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  return (
    <div
      style={iconStyle}
      onClick={handleClick}
      id={contentDescription || component.id}
    >
      {icon}
    </div>
  );
};
