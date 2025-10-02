import type {
    Padding, Border, Shape, Clip, Shadow, Modifier, TextStyle, ButtonStyle,
    TextComponent, ButtonComponent, ImageComponent, IconComponent, RowComponent,
    ColumnComponent, CheckboxComponent, SpacerComponent, CardComponent,
    SnackbarComponent, BoxComponent, UIScreen, UIComponent
} from "../../../shared/model/types";

// ===== ВСПОМОГАТЕЛЬНОЕ =====
const genId = (prefix: string = "id") =>
    `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

function deepMerge<T>(base: T, patch: Partial<T>): T {
    const out: any = Array.isArray(base) ? [...(base as any)] : { ...base };
    for (const [k, v] of Object.entries(patch as any)) {
        if (
            v && typeof v === "object" && !Array.isArray(v) &&
            typeof (out as any)[k] === "object" && (out as any)[k] !== null &&
            !Array.isArray((out as any)[k])
        ) {
            (out as any)[k] = deepMerge((out as any)[k], v);
        } else {
            (out as any)[k] = v as any;
        }
    }
    return out;
}
// Удобный мерж для фабрик: base -> per-type defaults -> overrides
const withDefaults = <T>(base: T, typeDefaults: Partial<T> | undefined, overrides: Partial<T>) =>
    deepMerge(deepMerge(base, typeDefaults ?? {} as Partial<T>), overrides);

// ===== ГЛОБАЛЬНЫЕ ДЕФОЛТЫ =====
const defaultPadding: Padding = { all: 5, start: 10, end: 10, top: 10, bottom: 10 };
const defaultBorder: Border = { width: 0, color: "#000000" };
const defaultShape: Shape = { cornerRadius: 0, topStart: 0, topEnd: 0 };
const defaultClip: Clip = { cornerRadius: 0 };
const defaultShadow: Shadow = { elevation: 0, color: 0x000000 };

// Базовый модификатор (нейтральный)
const defaultModifier: Modifier = {
    size: { width: "wrap_content", height: "wrap_content" },
    fillMaxWidth: false,
    fillMaxHeight: false,
    weight: undefined,
    padding: defaultPadding,
    background: null,
    clip: defaultClip,
    border: defaultBorder,
    clickable: false,
    onClick: null,
    align: "start",
    alpha: 1,
    shadow: defaultShadow,
};

const defaultTextStyle: TextStyle = {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#000000",
    lineHeight: 18,
    letterSpacing: 0,
    textDecoration: "none",
    textAlign: "start",
    maxLines: undefined,
    overflow: "visible",
};

const defaultButtonStyle: ButtonStyle = {
    background: "#1976d2",
    textColor: "#ffffff",
    fontSize: 14,
    fontWeight: "medium",
    fontStyle: "normal",
    shape: { cornerRadius: 8 },
    border: { width: 0, color: "#1976d2" },
};

// ===== ДЕФОЛТЫ ПО ТИПУ КОМПОНЕНТА =====
// Здесь задаём именно «компонентные» настройки.
// Контейнеры — 20×20, текст/кнопка — по контенту, картинка — 64×64, и т.п.
const componentDefaults: {
    [K in UIComponent["type"]]?: Partial<Extract<UIComponent, { type: K }>>
} = {
    text: {
        modifier: {
            ...defaultModifier,
            size: { width: "wrap_content", height: "wrap_content" },
            padding: { ...defaultPadding, all: 0 }, // обычно текст без внешних отступов
        },
        style: { ...defaultTextStyle },
    },
    button: {
        modifier: {
            ...defaultModifier,
            size: { width: "wrap_content", height: "wrap_content" },
        },
        style: { ...defaultButtonStyle },
    },
    image: {
        modifier: {
            ...defaultModifier,
            size: { width: 64, height: 64 },
        },
    },
    icon: {
        modifier: {
            ...defaultModifier,
            size: { width: 24, height: 24 },
        },
    },
    row: {
        modifier: {
            ...defaultModifier,
            size: { width: 20, height: 20 }, // контейнер 20×20
        },
        verticalAlignment: "centerVertically",
        horizontalArrangement: "start",
    },
    column: {
        modifier: {
            ...defaultModifier,
            size: { width: 20, height: 20 }, // контейнер 20×20
        },
        verticalArrangement: "top",
        horizontalAlignment: "start",
    },
    box: {
        modifier: {
            ...defaultModifier,
            size: { width: 20, height: 20 }, // контейнер 20×20
        },
    },
    card: {
        modifier: {
            ...defaultModifier,
            size: { width: 20, height: 20 }, // контейнер 20×20
        },
        elevation: 1,
        shape: { cornerRadius: 12 },
    },
    checkbox: {
        modifier: { ...defaultModifier }, // размер задаётся содержимым/темой
        colors: {
            checkedColor: "#1976d2",
            uncheckedColor: "#9e9e9e",
            disabledColor: "#bdbdbd",
        },
    },
    spacer: {
        modifier: {
            ...defaultModifier,
            size: { width: 8, height: 8 },
        },
    },
    snackbar: {
        modifier: {
            ...defaultModifier,
            background: "#323232",
        },
        duration: 3000,
    },
};

// ===== ФАБРИКИ (base -> per-type defaults -> overrides) =====

// Text
export const createText = (overrides: Partial<TextComponent> = {}): TextComponent => {
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

// Button
export const createButton = (overrides: Partial<ButtonComponent> = {}): ButtonComponent => {
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

// Image
export const createImage = (overrides: Partial<ImageComponent> = {}): ImageComponent => {
    const base: ImageComponent = {
        type: "image",
        _id: genId("image"),
        url: "",
        contentDescription: "",
        contentScale: "Inside",
        placeholder: null,
        error: null,
        modifier: defaultModifier,
        scaleType: null,
    };
    return withDefaults(base, componentDefaults["image"], overrides);
};

// Icon
export const createIcon = (overrides: Partial<IconComponent> = {}): IconComponent => {
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

// Row
export const createRow = (overrides: Partial<RowComponent> = {}): RowComponent => {
    const base: RowComponent = {
        type: "row",
        _id: genId("row"),
        modifier: {
            ...defaultModifier,
            size: { width: 20, height: 20 },
        },
        verticalAlignment: "centerVertically",
        horizontalArrangement: "start",
        children: [],
    };
    return withDefaults(base, componentDefaults["row"], overrides);
    // return base;
};

// Column
export const createColumn = (overrides: Partial<ColumnComponent> = {}): ColumnComponent => {
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

// Checkbox
export const createCheckbox = (overrides: Partial<CheckboxComponent> = {}): CheckboxComponent => {
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

// Spacer
export const createSpacer = (overrides: Partial<SpacerComponent> = {}): SpacerComponent => {
    const base: SpacerComponent = {
        type: "spacer",
        _id: genId("spacer"),
        modifier: {
            ...defaultModifier,
            size: { width: 8, height: 8 },
        },
    };
    return withDefaults(base, componentDefaults["spacer"], overrides);
};

// Card
export const createCard = (overrides: Partial<CardComponent> = {}): CardComponent => {
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

// Snackbar
export const createSnackbar = (overrides: Partial<SnackbarComponent> = {}): SnackbarComponent => {
    const base: SnackbarComponent = {
        type: "snackbar",
        _id: genId("snackbar"),
        text: "Message sent",
        actionText: undefined,
        duration: 3000,
        actions: [],
        modifier: {
            ...defaultModifier,
            background: "#323232",
        },
    };
    return withDefaults(base, componentDefaults["snackbar"], overrides);
};

// Box
export const createBox = (overrides: Partial<BoxComponent> = {}): BoxComponent => {
    const base: BoxComponent = {
        type: "box",
        _id: genId("box"),
        modifier: defaultModifier,
        children: [],
    };
    return withDefaults(base, componentDefaults["box"], overrides);
};

// ===== ЭКРАН =====
export const createScreen = (overrides: Partial<UIScreen> = {}): UIScreen => {
    const base: UIScreen = {
        type: "screen",
        _id: genId("screen"),
        name: "Screen",
        background: "#ffffff",
        topBar: [],
        content: [],
        bottomBar: [],
        snackbars: [],
    };
    return deepMerge(base, overrides);
};

// ===== Экспорт базовых дефолтов =====
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

// ===== (Опционально) Переопределение темой на лету =====
// Можно прокинуть снаружи объект и поверх заменить componentDefaults через deepMerge.
// Например, чтобы в тёмной теме увеличить Icon до 32px:
/*
const themeComponentDefaults = {
  icon: { modifier: { size: { width: 32, height: 32 } } }
};
const createIconThemed = (overrides: Partial<IconComponent> = {}) =>
  withDefaults(
    { ...база... },
    deepMerge(componentDefaults["icon"] ?? {}, themeComponentDefaults["icon"] ?? {}),
    overrides
  );
*/


// ===== УТИЛИТЫ ДЛЯ БЫСТРОГО СОЗДАНИЯ ШАБЛОНОВ =====
// export const createFilledRow = (
//   children: UIComponent[] = [],
//   overrides: Partial<RowComponent> = {}
// ): RowComponent =>
//   createRow(
//     deepMerge(
//       {
//         modifier: { ...defaultModifier, fillMaxWidth: true },
//         horizontalArrangement: "spaceBetween",
//         verticalAlignment: "centerVertically",
//         children,
//       },
//       overrides
//     )
//   );

// export const createPaddedColumn = (
//   children: UIComponent[] = [],
//   overrides: Partial<ColumnComponent> = {}
// ): ColumnComponent =>
//   createColumn(
//     deepMerge(
//       {
//         modifier: {
//           ...defaultModifier,
//           padding: { all: 16, start: 16, end: 16, top: 16, bottom: 16 },
//           fillMaxWidth: true,
//         },
//         children,
//       },
//       overrides
//     )
//   );

