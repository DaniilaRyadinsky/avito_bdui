import React from "react";
import type { ImageComponent as ImageComponentType } from "../../../model/types";

interface ImageComponentProps {
  component: ImageComponentType;
  isSelected?: boolean;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  component,
  isSelected = false,
  onSelect,
  onAction,
}) => {
  const {
    url,
    contentDescription,
    contentScale = "Crop",
    modifier = {},
  } = component;

  const {
    size = {},
    padding = {},
    clip,
    background,
    border,
    clickable,
    alpha = 1.0,
  } = modifier;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id && onSelect) {
      onSelect(component.id);
    }
  };

  const imageStyle: React.CSSProperties = {
    width: size.width || "100%",
    height: size.height || "auto",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    backgroundColor: background || "transparent",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${
      padding.bottom || 0
    }px ${padding.start || 0}px`,
    opacity: alpha,
    cursor: clickable || onSelect ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    outlineOffset: "2px",
    objectFit: contentScale.toLowerCase() as any,
  };

  return (
    <img
      src={url}
      alt={contentDescription}
      style={imageStyle}
      onClick={handleClick}
      title={component.id}
    />
  );
};
