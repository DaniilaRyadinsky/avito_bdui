import React from "react";
import type {
  ColumnComponent as ColumnComponentType,
  UIComponent,
} from "../../../model/componentTypes";
import { ComponentFactory } from "../ComponentFactory";
import { calculateSize, getColHorizontalArrangement, getColVerticalAlignment } from "../utils";

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
    margin = {},
    background,
    scrollable,
    clip,
    border,
    clickable,
    alpha = 1.0,
    size,
    shadow
  } = modifier;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  const columnStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end, margin.start, margin.end),
    height: calculateSize(size?.height, padding.top, padding.bottom, margin.top, margin.top),
    display: "flex",
    flexDirection: "column",
    justifyContent: getColVerticalAlignment(verticalArrangement),
    alignItems: getColHorizontalArrangement(horizontalAlignment),
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0}px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`,
    overflow: "hidden",
    overflowY: scrollable ? "scroll" : "hidden"
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
