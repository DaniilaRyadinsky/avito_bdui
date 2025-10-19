import type {
  ListComponent as ListComponentType,
  UIComponent,
} from "../../../model/componentTypes";
import { ComponentFactory } from "../ComponentFactory";
import { calculateSize } from "../utils";

interface ListComponentProps {
  component: ListComponentType;
  selectedId?: string | null;
  onSelect?: (componentId: string) => void;
  onAction?: (componentId: string, action: any) => void;
}

export const ListComponent: React.FC<ListComponentProps> = ({
  component,
  selectedId,
  onSelect,
  onAction,
}) => {
  const isSelected = selectedId == component._id;
  const { children = [], modifier = {} } = component;

  const {
    size,
    padding = {},
    margin = {},
    background,
    clip,
    border,
    clickable,
    alpha = 1.0,
  } = modifier;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (component._id && onSelect) {
      onSelect(e.currentTarget.id);
    }
  };

  const listStyle: React.CSSProperties = {
    width: calculateSize(size?.width, padding.start, padding.end),
    height: calculateSize(size?.height, padding.top, padding.bottom),
    display: "flex",
    flexDirection: "row",
    backgroundColor: background || "transparent",
    borderRadius: clip?.cornerRadius ? `${clip.cornerRadius}px` : "0",
    border:
      border?.width && border.color
        ? `${border.width}px solid ${border.color}`
        : "none",
    padding: `${padding.top || 0}px ${padding.end || 0}px ${
      padding.bottom || 0
    }px ${padding.start || 0}px`,
    margin: `${margin.top || 0}px ${margin.end || 0}px ${
      margin.bottom || 0
    }px ${margin.start || 0}px`,
    opacity: alpha,
    cursor: clickable ? "pointer" : "default",
    outline: isSelected ? "2px solid #007AFF" : "none",
    minHeight: "25px",
    minWidth: "10px",
  };

  return (
    <div style={listStyle} onClick={handleClick} id={component._id}>
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
