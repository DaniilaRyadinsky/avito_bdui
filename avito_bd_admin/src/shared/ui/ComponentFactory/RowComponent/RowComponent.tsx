import React from "react";
import type {
  RowComponent as RowComponentType,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";

interface RowComponentProps {
  component: RowComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const RowComponent: React.FC<RowComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {

  const isSelected = selectedId == component._id
  const {
    children = [],
    verticalAlignment = "centerVertically",
    horizontalArrangement = "start",
    modifier = {},
  } = component;

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

  const rowStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems:
      verticalAlignment === "centerVertically"
        ? "center"
        : verticalAlignment === "top"
        ? "flex-start"
        : "flex-end",
    justifyContent:
      horizontalArrangement === "start"
        ? "flex-start"
        : horizontalArrangement === "center"
        ? "center"
        : horizontalArrangement === "end"
        ? "flex-end"
        : horizontalArrangement === "spaceBetween"
        ? "space-between"
        : horizontalArrangement === "spaceAround"
        ? "space-around"
        : "space-evenly",
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
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    gap: "8px",
  };

  return (
    <div style={rowStyle} onClick={handleClick} id={component._id}>
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
