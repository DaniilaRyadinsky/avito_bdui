import React from "react";
import type { SpacerComponent as SpacerComponentType } from "../../../model/types";

interface SpacerComponentProps {
  component: SpacerComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const SpacerComponent: React.FC<SpacerComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {

  const isSelected = selectedId == component._id

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
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  return <div style={spacerStyle} onClick={handleClick} id={component._id} />;
};
