import type {
  TextComponent,
  ButtonComponent,
  ImageComponent,
  IconComponent,
  RowComponent,
  ColumnComponent,
  CheckboxComponent,
  SpacerComponent,
  CardComponent,
  BoxComponent,
  UIComponent,
  ListComponent,
} from "../../../entities/components/model/componentTypes";
import type { UIScreen } from "../../../entities/screen/model/screenTypes";
import { genId, withDefaults, deepMerge } from "../../../shared/lib/merge";
import {
  defaultTextStyle,
  defaultModifier,
  componentDefaults,
  defaultButtonStyle,
  defaultPadding,
  defaultBorder,
  defaultShape,
  defaultClip,
  defaultShadow,
} from "./constant";

export const createText = (
  overrides: Partial<TextComponent> = {}
): TextComponent => {
  const base: TextComponent = {
    type: "text",
    _id: genId("text"),
    text: "Text",
    format: undefined,
    style: defaultTextStyle,
    modifier: defaultModifier,
  };
  return withDefaults(base, componentDefaults["text"], overrides);
};

export const createButton = (
  overrides: Partial<ButtonComponent> = {}
): ButtonComponent => {
  const base: ButtonComponent = {
    type: "button",
    _id: genId("button"),
    text: "Button",
    enabled: true,
    style: defaultButtonStyle,
    modifier: defaultModifier,
    icon: null,
    actions: [],
  };
  return withDefaults(base, componentDefaults["button"], overrides);
};

export const createImage = (
  overrides: Partial<ImageComponent> = {}
): ImageComponent => {
  const base: ImageComponent = {
    type: "image",
    _id: genId("image"),
    url: "",
    contentDescription: "",
    contentScale: "Fill",
    placeholder: null,
    error: null,
    modifier: defaultModifier,
    scaleType: null,
  };
  return withDefaults(base, componentDefaults["image"], overrides);
};

export const createIcon = (
  overrides: Partial<IconComponent> = {}
): IconComponent => {
  const base: IconComponent = {
    type: "icon",
    _id: genId("icon"),
    icon: "star",
    contentDescription: "",
    tint: "#000000",
    modifier: defaultModifier,
    actions: [],
  };
  return withDefaults(base, componentDefaults["icon"], overrides);
};

export const createRow = (
  overrides: Partial<RowComponent> = {}
): RowComponent => {
  const base: RowComponent = {
    type: "row",
    _id: genId("row"),
    modifier: defaultModifier,
    verticalAlignment: "center",
    horizontalArrangement: "start",
    children: [],
  };
  return withDefaults(base, componentDefaults["row"], overrides);
};

export const createList = (
  overrides: Partial<ListComponent> = {}
): ListComponent => {
  const base: ListComponent = {
    type: "list",
    _id: genId("list"),
    modifier: defaultModifier,
    children: [],
  };
  return withDefaults(base, componentDefaults["list"], overrides);
};

export const createColumn = (
  overrides: Partial<ColumnComponent> = {}
): ColumnComponent => {
  const base: ColumnComponent = {
    type: "column",
    _id: genId("column"),
    modifier: defaultModifier,
    verticalArrangement: "top",
    horizontalAlignment: "start",
    children: [],
  };
  return withDefaults(base, componentDefaults["column"], overrides);
};

export const createCheckbox = (
  overrides: Partial<CheckboxComponent> = {}
): CheckboxComponent => {
  const base: CheckboxComponent = {
    type: "checkbox",
    _id: genId("checkbox"),
    isChecked: false,
    onCheckedChange: null,
    enabled: true,
    colors: {
      checkedColor: "#1976d2",
      uncheckedColor: "#9e9e9e",
      disabledColor: "#bdbdbd",
    },
    modifier: defaultModifier,
  };
  return withDefaults(base, componentDefaults["checkbox"], overrides);
};

export const createSpacer = (
  overrides: Partial<SpacerComponent> = {}
): SpacerComponent => {
  const base: SpacerComponent = {
    type: "spacer",
    _id: genId("spacer"),
    modifier: defaultModifier,
  };
  return withDefaults(base, componentDefaults["spacer"], overrides);
};

export const createCard = (
  overrides: Partial<CardComponent> = {}
): CardComponent => {
  const base: CardComponent = {
    type: "card",
    _id: genId("card"),
    modifier: defaultModifier,
    elevation: 1,
    shape: { cornerRadius: 12 },
    children: [],
  };
  return withDefaults(base, componentDefaults["card"], overrides);
};

export const createBox = (
  overrides: Partial<BoxComponent> = {}
): BoxComponent => {
  const base: BoxComponent = {
    type: "box",
    _id: genId("box"),
    modifier: defaultModifier,
    children: [],
  };
  return withDefaults(base, componentDefaults["box"], overrides);
};

export const createScreen = (overrides: Partial<UIScreen> = {}): UIScreen => {
  const base: UIScreen = {
    type: "screen",
    _id: genId("screen"),
    title: "Screen",
    width: 420,
    height: 800,
    background: "#ffffff",
    topBar: [],
    content: [],
    bottomBar: [],
    snackbars: [],
    bottomSheets: [],
  };
  return deepMerge(base, overrides);
};

export const Defaults = {
  modifier: defaultModifier,
  textStyle: defaultTextStyle,
  buttonStyle: defaultButtonStyle,
  padding: defaultPadding,
  border: defaultBorder,
  shape: defaultShape,
  clip: defaultClip,
  shadow: defaultShadow,
};

export const createComponent = (type: UIComponent["type"]) => {
  switch (type) {
    case "text":
      return createText();
    case "button":
      return createButton();
    case "image":
      return createImage();
    case "icon":
      return createIcon();
    case "row":
      return createRow();
    case "column":
      return createColumn();
    case "checkbox":
      return createCheckbox();
    case "spacer":
      return createSpacer();
    case "card":
      return createCard();
    case "box":
      return createBox();
    case "list":
      return createList();
  }
};
