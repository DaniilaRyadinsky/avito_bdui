import React from "react";
import type { TextComponent as TextComponentType } from "../../../model/types";

interface TextComponentProps {
  component: TextComponentType;
  isSelected?: boolean;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const TextComponent: React.FC<TextComponentProps> = ({
  component,
  isSelected = false,
  onSelect,
  onAction,
}) => {
  const { text, format, style = {}, modifier = {} } = component;

  const {
    fontSize = 16,
    fontWeight = "normal",
    fontStyle = "normal",
    color = "#000000",
    lineHeight,
    letterSpacing,
    textDecoration = "none",
    textAlign = "start",
    maxLines,
    overflow = "ellipsis",
  } = style;

  const {
    padding = {},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
  } = modifier;

  const displayText = format ? format.replace("%s", text) : text;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component.id && onSelect) {
      onSelect(component.id);
    }
  };

  const textStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    fontWeight,
    fontStyle,
    color,
    lineHeight: lineHeight ? `${lineHeight}px` : "normal",
    letterSpacing: letterSpacing ? `${letterSpacing}px` : "normal",
    textDecoration,
    textAlign: textAlign as React.CSSProperties["textAlign"],
    overflow: overflow === "ellipsis" ? "hidden" : overflow,
    textOverflow: overflow === "ellipsis" ? "ellipsis" : "clip",
    whiteSpace: maxLines === 1 ? "nowrap" : "normal",
    WebkitLineClamp: maxLines,
    display: maxLines && maxLines > 1 ? "-webkit-box" : "block",
    WebkitBoxOrient: maxLines && maxLines > 1 ? "vertical" : "horizontal",
    opacity: alpha,
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${
      padding.bottom || 0
    }px ${padding.start || 0}px`,
    cursor: clickable || onSelect ? "pointer" : "default", // изменено
    outline: isSelected ? "2px solid #007AFF" : "none", // уже есть!
    outlineOffset: "2px",
  };

  return (
    <div
      style={textStyle}
      onClick={handleClick} // изменено
      title={component.id}
    >
      {displayText}
    </div>
  );
};
