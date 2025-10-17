import React from "react";
import type { ImageComponent as ImageComponentType } from "../../../model/componentTypes";
import { calculateSize } from "../utils";

interface ImageComponentProps {
  component: ImageComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {
  const {
    url,
    contentDescription,
    contentScale = "Crop",
    modifier = {},
  } = component;

  const isSelected = selectedId == component._id

  const {
    size,
    padding = {},
    margin={},
    clip,
    background,
    border,
    clickable,
    alpha = 1.0,
    shadow
  } = modifier;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      // console.log("img")
      onSelect(e.currentTarget.id);
    }
  };



  const imageStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end, margin.start, margin.end, true),
    height: calculateSize(size?.height, padding.top, padding.bottom,margin.top, margin.top, true),
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    backgroundColor: background || "transparent",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding?.top || 0}px ${padding?.end || 0}px ${padding?.bottom || 0}px ${padding?.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: clickable || onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    objectFit: contentScale.toLowerCase() as any,
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`
  };

  return (
    <img
      src={url}
      alt={contentDescription}
      style={imageStyle}
      onClick={handleClick}
      id={component._id}
    />
  );
};
