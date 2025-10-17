import React, { useEffect } from "react";
import type {
  RowComponent as RowComponentType,
  UIComponent,
} from "../../../model/types";
import { ComponentFactory } from "../ComponentFactory";
import { calculateSize} from "../utils";

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
    size,
    fillMaxWidth,
    fillMaxHeight,
    scrollable,
    padding = {},
    margin={},
    background,
    clip,
    border,
    clickable,
    align,
    alpha = 1.0,
    shadow,

  } = modifier;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
      if (modifier) {
        // console.log(calculateWidth(padding), padding.top)
        // console.log(modifier.size)
      }
    }
  };


  const rowStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end, margin.start, margin.end),
    height: calculateSize(size?.height, padding.top, padding.bottom,margin.top, margin.top),
    display: "flex",
    flexDirection: "row",
    alignItems:
      verticalAlignment === "centerVertically"
        ? "center"
        : verticalAlignment === "top"
          ? "start"
          : "end",
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
    padding: `${padding.top ||0}px ${padding.end || 0}px ${padding.bottom || 0}px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`,
    overflow: "hidden",
    overflowX: scrollable? "scroll" : "hidden"
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
