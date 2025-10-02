// Базовые интерфейсы

export type FontWeight = "normal" | "bold" | "medium"
export type FontStyle = "normal" | "italic"
export type TextDecoration = "none" | "underline" | "lineThrough"
export type TextAlign = "start" | "end" | "center" | "justify"

export type Size = {
  width?: "wrap_content" | "match_parent" | string,
  height?: "wrap_content" | "match_parent" | string
}

export type Overflow = "clip" | "ellipsis" | "visible"
export type Padding = {
  start?: number,
  end?: number,
  top?: number,
  bottom?: number,
  all?: number
}
export type Align = "start" | "center" | "end" | "top" | "bottom"
export type Border = {
  width?: number,
  color?: string
}
export type Shape = {
  cornerRadius?: number,
  topStart?: number,
  topEnd?: number
}

export type Clip = {
  cornerRadius?: number
}

export type ContentScale = "Fill" | "FillHeight" | "Crop" | "FillWidth" | "Inside" | "None" | "FillBounds"

export type VerticalAlignment = "top" | "centerVertically" | "bottom"
export type HorizontalArrangement = "start" | "center" | "end" | "spaceBetween" | "spaceAround" | "spaceEvenly"

export type Shadow = {
  elevation?: number,
  color?: string
}


export interface Modifier {
  size?: Size;
  fillMaxWidth?: boolean;
  fillMaxHeight?: boolean;
  weight?: number;
  padding?: Padding;
  background?: string | null;
  clip?: Clip;
  border?: Border;
  clickable?: boolean;
  onClick?: string | null;
  align?: Align;
  alpha?: number;
  shadow?: Shadow;
}

export interface TextStyle {
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  color?: string;
  lineHeight?: number;
  letterSpacing?: number;
  textDecoration?: TextDecoration;
  textAlign?: TextAlign;
  maxLines?: number;
  overflow?: Overflow;
}

export type ButtonStyle = {
  background?: string,
  textColor?: string,
  fontSize?: number,
  fontWeight?: FontWeight,         // Толщина шрифта: normal, bold, medium и т.д.
  fontStyle?: FontStyle,           // Наклон: normal, italic
  shape?: Shape,
  border?: Border,
  elevation?: number
}

export interface Action {
  action?: string;
  targetId?: string;
}

// Компоненты
export interface TextComponent {
  type: "text";
  _id?: string;
  text: string;
  format?: string;
  style?: TextStyle;
  modifier?: Modifier;
}

export interface ButtonComponent {
  type: "button";
  _id?: string;
  text: string;
  enabled?: boolean;
  style?: ButtonStyle;
  modifier?: Modifier;
  icon?: string | null;
  actions?: Action[];
}

export interface ImageComponent {
  type: "image";
  _id?: string;
  url: string;
  contentDescription?: string;
  contentScale?: ContentScale;
  placeholder?: string | null;
  error?: string | null;
  modifier?: Modifier;
  scaleType?: string | null;
}

export interface IconComponent {
  type: "icon";
  _id?: string;
  icon: string;
  contentDescription?: string;
  tint?: string;
  modifier?: Modifier;
  actions?: Action[];
}

export interface RowComponent {
  type: "row";
  _id?: string;
  modifier?: Modifier;
  verticalAlignment?: VerticalAlignment;
  horizontalArrangement?: HorizontalArrangement;
  children: UIComponent[];
}

export interface ColumnComponent {
  type: "column";
  _id?: string;
  modifier?: Modifier;
  verticalAlignment?: VerticalAlignment;
  horizontalArrangement?: HorizontalArrangement;
  children: UIComponent[];
}

export interface CheckboxComponent {
  type: "checkbox";
  _id?: string;
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
  _id?: string;
  modifier?: Modifier;
}

export interface CardComponent {
  type: "card";
  _id?: string;
  modifier?: Modifier;
  elevation?: number;
  shape?: Shape;
  children: UIComponent[];
}

export interface SnackbarComponent {
  type: "snackbar";
  _id: string;
  text: string;
  actionText?: string;
  duration?: number;
  actions?: Action[];
  modifier?: Modifier;
}

export interface BoxComponent {
  type: "box";
  _id?: string;
  modifier?: Modifier;
  children: UIComponent[];
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



export type RawUIScreen = {
  type: string;
  _id: string;
  name: string;
  background: string;
  topBar: RawUIComponent[];
  content: RawUIComponent[];
  bottomBar: RawUIComponent[];
  snackbars: RawUIComponent[];
  [key: string]: any;
};

// Экран
export interface UIScreen {
  type: "screen";
  _id: string;
  name: string;
  background: string;
  topBar: UIComponent[];
  content: UIComponent[];
  bottomBar: UIComponent[];
  snackbars: SnackbarComponent[];
}
