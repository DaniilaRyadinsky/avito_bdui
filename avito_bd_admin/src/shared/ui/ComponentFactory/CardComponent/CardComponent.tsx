import React from "react";
import type {
  CardComponent as CardComponentType,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";
import {  calculateSize } from "../utils";

interface CardComponentProps {
  component: CardComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {
  const {
    children = [],
    elevation = 4,
    shape = {},
    modifier = {},
  } = component;

  const isSelected = selectedId == component._id

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (component._id && onSelect) {
      console.log(e.currentTarget.id)
      onSelect(e.currentTarget.id);
    }
    if (component._id && onAction) {
      onAction(component._id, { type: "click" });
    }
  };

  const { size = {}, padding = {}, margin={}, clip, border = {}, clickable, background = "#FFFFFF", shadow = {}, alpha = 1.0 } = modifier;

  const cardStyle: React.CSSProperties = {
    width: calculateSize(size.width, padding.start, padding.end),
    height: calculateSize(size.height, padding.top, padding.bottom),
    backgroundColor: background ? background : "none",
    borderRadius: shape.cornerRadius
      ? `${shape.cornerRadius}px`
      : clip?.cornerRadius
        ? `${clip.cornerRadius}px`
        : "0",
    border:
      border.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    // boxShadow: shadow.elevation
    //   ? `0 0 calc(${shadow.elevation} * 0.9) ${shadow.color},
    // 0 calc(${shadow.elevation} * 0.5) calc(${shadow.elevation} * 0.6) ${shadow.color}` : '',

    boxShadow: '0 0 8px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.24)',
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0}px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
  };

  return (
    <div style={cardStyle} onClick={handleClick} id={component._id}>
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
