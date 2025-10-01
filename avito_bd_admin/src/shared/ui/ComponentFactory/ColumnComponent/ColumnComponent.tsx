import React from "react";
import type {
  ColumnComponent as ColumnComponentType,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";

interface ColumnComponentProps {
  component: ColumnComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const ColumnComponent: React.FC<ColumnComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {
  const {
    children = [],
    verticalArrangement = "top",
    horizontalAlignment = "start",
    modifier = {},
  } = component;

  const isSelected = selectedId == component._id

  const {
    padding = {},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
  } = modifier;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  const columnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent:
      verticalArrangement === "top"
        ? "flex-start"
        : verticalArrangement === "centerVertically"
        ? "center"
        : verticalArrangement === "bottom"
        ? "flex-end"
        : verticalArrangement === "spaceBetween"
        ? "space-between"
        : verticalArrangement === "spaceAround"
        ? "space-around"
        : "flex-start",
    alignItems:
      horizontalAlignment === "start"
        ? "flex-start"
        : horizontalAlignment === "centerHorizontally"
        ? "center"
        : "flex-end",
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${
      padding.bottom || 0
    }px ${padding.start || 0}px`,
    opacity: alpha,
    cursor: onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    gap: "8px",
  };

  return (
    <div style={columnStyle} onClick={handleClick} id={component._id}>
      {children.map((child: UIComponent, index: number) => (
        <ComponentFactory
          key={child._id || index}
          component={child}
          selectedId={selectedId}
          onSelect={onSelect}
          onAction={onAction}
        />
      ))}
    </div>
  );
};
