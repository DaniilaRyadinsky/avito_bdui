import React from "react";
import type { ImageComponent as ImageComponentType } from "../../../model/types";

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

  const isSelected = selectedId == component.id

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
      // console.log("img")
      onSelect(e.currentTarget.id);
    }
  };

  const imageStyle: React.CSSProperties = {
    width: size.width ? `${size.width}px` : "100%",

    height: size.height ? `${size.height}px` : "auto",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    backgroundColor: background || "transparent",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0
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
      id={component.id}
    />
  );
};
