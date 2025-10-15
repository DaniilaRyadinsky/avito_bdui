import React from "react";
import type { IconComponent as IconComponentType } from "../../../model/types";
import { calculateWidth, calculateHeight } from "../utils";

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
    size,
    padding,
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
    shadow
  } = modifier;

  const iconStyle: React.CSSProperties = {
    width:
      size?.width === "wrap_content"
        ? "auto"
        : size?.width === "match_parent"
          ? `${calculateWidth(padding)}`
          : `${size?.width}px`,
    height: size?.height === "wrap_content"
      ? "auto"
      : size?.height === "match_parent"
        ? `${calculateHeight(padding)}` : `${size?.height}px`,
    color: tint,
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding?.top || 0}px ${padding?.end || 0}px ${padding?.bottom || 0
      }px ${padding?.start || 0}px`,
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
