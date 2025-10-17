import React from "react";
import type {
  BoxComponent as BoxComponentType,
  Padding,
  Size,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";
import {  calculateSize} from "../utils";

interface BoxComponentProps {
  component: BoxComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const BoxComponent: React.FC<BoxComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {

  const isSelected = selectedId == component._id

  const { children = [], modifier = {} } = component;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  const {
    size = {},
    padding = {},
    margin={},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
    shadow
  } = modifier;



  const boxStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end, margin.start, margin.end),
    height: calculateSize(size?.height, padding.top, padding.bottom,margin.top, margin.top),
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0}px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    boxShadow: `0 0 ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`
  };

  return (
    <div style={boxStyle} onClick={handleClick} id={component._id}>
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
