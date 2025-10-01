// Базовые интерфейсы
export interface Modifier {
  size?: {
    width?: string | number;
    height?: string | number;
  };
  fillMaxWidth?: boolean;
  fillMaxHeight?: boolean;
  weight?: number | string | null;
  padding?: {
    start?: number;
    end?: number;
    top?: number;
    bottom?: number;
    all?: number | null;
  };
  background?: string | null;
  clip?: {
    cornerRadius?: number;
  };
  border?: {
    width?: number | string;
    color?: string | null;
  };
  clickable?: boolean;
  onClick?: string | null;
  align?: string | null;
  alpha?: number;
}

export interface TextStyle {
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "medium" | "light";
  fontStyle?: "normal" | "italic";
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textDecoration?: "none" | "underline" | "lineThrough";
  textAlign?: "start" | "center" | "end" | "justify";
  maxLines?: number;
  overflow?: "clip" | "ellipsis" | "visible";
}

export interface Action {
  action: string;
  targetId: string;
}

// Компоненты
export interface TextComponent {
  type: "text";
  id?: string;
  text: string;
  format?: string;
  style?: TextStyle;
  modifier?: Modifier;
}

export interface ButtonComponent {
  type: "button";
  id?: string;
  text: string;
  enabled?: boolean;
  style?: {
    background?: string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: string;
    shape?: {
      cornerRadius?: number;
    };
    border?: {
      width?: number;
      color?: string | null;
    };
    elevation?: number;
  };
  modifier?: Modifier;
  icon?: string | null;
  actions?: Action[];
}

export interface ImageComponent {
  type: "image";
  id?: string;
  url: string;
  contentDescription?: string;
  contentScale?:
    | "Fill"
    | "FillHeight"
    | "Crop"
    | "FillWidth"
    | "Inside"
    | "None"
    | "FillBounds";
  placeholder?: string | null;
  error?: string | null;
  modifier?: Modifier;
  scaleType?: string | null;
}

export interface IconComponent {
  type: "icon";
  id?: string;
  icon: string;
  contentDescription?: string;
  tint?: string;
  modifier?: Modifier;
  actions?: Action[];
}

export interface RowComponent {
  type: "row";
  id?: string;
  modifier?: Modifier;
  verticalAlignment?: "top" | "centerVertically" | "bottom";
  horizontalArrangement?:
    | "start"
    | "center"
    | "end"
    | "spaceBetween"
    | "spaceAround"
    | "spaceEvenly";
  children: UIComponent[];
}

export interface ColumnComponent {
  type: "column";
  id?: string;
  modifier?: Modifier;
  verticalArrangement?:
    | "top"
    | "centerVertically"
    | "bottom"
    | "spaceBetween"
    | "spaceAround";
  horizontalAlignment?: "start" | "centerHorizontally" | "end";
  children: UIComponent[];
}

export interface CheckboxComponent {
  type: "checkbox";
  id?: string;
  isChecked: boolean;
  onCheckedChange?: string | null;
  enabled?: boolean;
  colors?: {
    checkedColor?: string;
    uncheckedColor?: string;
    disabledColor?: string;
  };
  modifier?: Modifier;
}

export interface SpacerComponent {
  type: "spacer";
  id?: string;
  width?: string | number;
  height?: string | number;
  weight?: string | number;
  modifier?: Modifier;
}

export interface CardComponent {
  type: "card";
  id?: string;
  modifier?: Modifier;
  elevation?: number;
  shape?: {
    cornerRadius?: number;
  };
  background?: string;
  shadow?: {
    elevation?: number;
    color?: string;
  };
  children: UIComponent[];
}

export interface SnackbarComponent {
  type: "snackbar";
  id: string;
  text: string;
  actionText?: string;
  duration?: number;
  actions?: Action[];
  modifier?: Modifier;
}

export interface BoxComponent {
  type: "box";
  id?: string;
  modifier?: Modifier;
  children: UIComponent[];
}

// Объединенный тип компонента
export type UIComponent =
  | TextComponent
  | ButtonComponent
  | ImageComponent
  | IconComponent
  | RowComponent
  | ColumnComponent
  | CheckboxComponent
  | SpacerComponent
  | CardComponent
  | SnackbarComponent
  | BoxComponent;

// Экран
export interface UIScreen {
  type: "screen";
  id: string;
  name: string;
  background: string;
  topBar: UIComponent[];
  content: UIComponent[];
  bottomBar: UIComponent[];
  snackbars: SnackbarComponent[];
}

export interface Position {
  x: number;
  y: number;
}

export interface ComponentTemplate {
  type: UIComponent["type"];
  name: string;
  icon: string;
  defaultProps: Partial<UIComponent>;
}

export type UIComponentType =
  | "text"
  | "button"
  | "image"
  | "icon"
  | "row"
  | "column"
  | "checkbox"
  | "spacer"
  | "card"
  | "box"
  | "snackbar";

// Для парсинга JSON, где поля могут быть любыми
export type RawUIComponent = Omit<UIComponent, "type"> & {
  type: string;
  [key: string]: any;
};

export type RawUIScreen = {
  type: string;
  id: string;
  name: string;
  background: string;
  topBar: RawUIComponent[];
  content: RawUIComponent[];
  bottomBar: RawUIComponent[];
  snackbars: RawUIComponent[];
  [key: string]: any;
};
