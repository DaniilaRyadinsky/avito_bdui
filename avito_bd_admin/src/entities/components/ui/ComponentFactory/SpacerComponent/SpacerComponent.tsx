import React, { use, useEffect, useLayoutEffect } from "react";
import type { SpacerComponent as SpacerComponentType } from "../../../../../shared/model/types";
import { calculateSize } from "../utils";

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

  const { modifier } = component;

  // useEffect(() => {
  //   if(modifier) {
  //   console.log(modifier)
  //   console.log(modifier.size)
  //   }
  // }, [])

  // const { size, weight, padding, background, alpha = 1.0 } = modifier ?? {};

  const { size = {} , weight, background, alpha, padding = {} } = modifier || {}

  const spacerStyle: React.CSSProperties = {
    width: calculateSize(size.width, padding.start, padding.end),
    height: calculateSize(size.height, padding.top, padding.bottom),
    flex: weight ? Number(weight) : '',
    backgroundColor: background || "transparent",
    opacity: alpha,
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
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
