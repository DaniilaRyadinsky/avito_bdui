import React from "react";
import type { SpacerComponent as SpacerComponentType } from "../../../model/types";

interface SpacerComponentProps {
  component: SpacerComponentType;
  isSelected?: boolean;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const SpacerComponent: React.FC<SpacerComponentProps> = ({
  component,
  isSelected = false,
  onSelect,
  onAction,
}) => {
  const { width, height = "20", weight, modifier = {} } = component;

  const { padding = {}, background, alpha = 1.0 } = modifier;

  const spacerStyle: React.CSSProperties = {
    width: width || "auto",
    height: height || "auto",
    flex: weight ? Number(weight) : undefined,
    backgroundColor: background || "transparent",
    opacity: alpha,
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${
      padding.bottom || 0
    }px ${padding.start || 0}px`,
    minHeight: "1px",
    minWidth: "1px",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id && onSelect) {
      onSelect(component.id);
    }
  };

  return <div style={spacerStyle} onClick={handleClick} title={component.id} />;
};
