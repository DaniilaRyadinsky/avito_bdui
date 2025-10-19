import type {
  RowComponent,
  ColumnComponent,
  CardComponent,
  BoxComponent,
  UIComponent,
} from "../../../entities/components/model/componentTypes";

export type ContainerComponent =
  | RowComponent
  | ColumnComponent
  | CardComponent
  | BoxComponent;
export const isContainer = (c: UIComponent): c is ContainerComponent =>
  c.type === "row" ||
  c.type === "column" ||
  c.type === "card" ||
  c.type === "box" ||
  c.type === "list";

export const uiSectionKeys = ["topBar", "content", "bottomBar"] as const;
export type UISectionKey = (typeof uiSectionKeys)[number];
