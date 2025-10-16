import React from "react";
import type { TextComponent as TextComponentType } from "../../../model/types";
import { calculateSize } from "../utils";

interface TextComponentProps {
  component: TextComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const TextComponent: React.FC<TextComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {

  const isSelected = selectedId == component._id

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
    margin={},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
    size,
    shadow
  } = modifier;

  const displayText = format ? format.replace("%s", text) : text;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      // console.log(e.currentTarget.id)
      onSelect(e.currentTarget.id);
    }
  };

  const textStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end),
    height: calculateSize(size?.height, padding.top, padding.bottom),
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
    padding: `${padding.top || 0}px ${padding.end || 0}px ${padding.bottom || 0}px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${margin.bottom || 0}px ${margin.start || 0}px`,
    cursor: clickable || onSelect ? "pointer" : "default", // изменено
    outline: isSelected ? "2px solid #007AFF" : "none", // уже есть!
    outlineOffset: "2px",
    boxShadow: `0 ${0}px ${shadow?.elevation}px ${shadow?.elevation}px ${shadow?.color}`
  };

  return (
    <div
      style={textStyle}
      onClick={handleClick} // изменено
      id={component._id}
    >
      {displayText}
    </div>
  );
};
