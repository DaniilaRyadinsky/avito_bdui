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
  bottom?: number
}

export type Margin = {
  start?: number,
  end?: number,
  top?: number,
  bottom?: number
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
  margin?: Margin;
  background?: string | null;
  clip?: Clip;
  border?: Border;
  clickable?: boolean;
  align?: Align;
  alpha?: number;
  shadow?: Shadow;
  scrollable?: boolean,
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
  event?: string;
  type?: string,
  payload: {
    targetId?: string;
  }
}

// Компоненты
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

export interface ComponentTemplate {
  type: UIComponentType;
  _id?: string;
  modifier?: Modifier;
  actions?: Action[];
}

export interface TextComponent extends ComponentTemplate{
  type: "text";
  text: string;
  format?: string;
  style?: TextStyle;
}

export interface ButtonComponent extends ComponentTemplate{
  type: "button";
  text: string;
  enabled?: boolean;
  style?: ButtonStyle;
  icon?: string | null;
}

export interface ImageComponent extends ComponentTemplate{
  type: "image";
  url: string;
  contentDescription?: string;
  contentScale?: ContentScale;
  placeholder?: string | null;
  error?: string | null;
  scaleType?: string | null;
}

export interface IconComponent extends ComponentTemplate{
  type: "icon";
  icon: string;
  contentDescription?: string;
  tint?: string;
}

export interface RowComponent extends ComponentTemplate{
  type: "row";
  verticalAlignment?: VerticalAlignment;
  horizontalArrangement?: HorizontalArrangement;
  children: UIComponent[];
}

export interface ColumnComponent extends ComponentTemplate{
  type: "column";
  verticalAlignment?: VerticalAlignment;
  horizontalArrangement?: HorizontalArrangement;
  children: UIComponent[];
}

export interface CheckboxComponent extends ComponentTemplate{
  type: "checkbox";
  isChecked: boolean;
  onCheckedChange?: string | null;
  enabled?: boolean;
  colors?: {
    checkedColor?: string;
    uncheckedColor?: string;
    disabledColor?: string;
  };
}

export interface SpacerComponent extends ComponentTemplate{
  type: "spacer";
}

export interface CardComponent extends ComponentTemplate{
  type: "card";
  elevation?: number;
  shape?: Shape;
  children: UIComponent[];
}

export interface SnackbarComponent extends ComponentTemplate{
  type: "snackbar";
  text: string;
  actionText?: string;
  duration?: number;
}

export interface BoxComponent extends ComponentTemplate{
  type: "box";
  children: UIComponent[];
}

export interface Position {
  x: number;
  y: number;
}


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

