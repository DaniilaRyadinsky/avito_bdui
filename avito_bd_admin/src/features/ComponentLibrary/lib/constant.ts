import type { Padding, Border, Shape, Clip, Shadow, Modifier, TextStyle, ButtonStyle, UIComponent, Margin } from "../../../shared/model/types";

// ===== ГЛОБАЛЬНЫЕ ДЕФОЛТЫ =====
export const defaultPadding: Padding = { start: 0, end: 0, top: 0, bottom: 0 };
export const defaultMargin: Margin = { start: 0, end: 0, top: 0, bottom: 0 };
export const defaultBorder: Border = { width: 0, color: "#000000" };
export const defaultShape: Shape = { cornerRadius: 0, topStart: 0, topEnd: 0 };
export const defaultClip: Clip = { cornerRadius: 0 };
export const defaultShadow: Shadow = { elevation: 0, color: "#000000" };

// Базовый модификатор (нейтральный)
export const defaultModifier: Modifier = {
    size: { width: "wrap_content", height: "wrap_content" },
    fillMaxWidth: false,
    fillMaxHeight: false,
    weight: undefined,
    padding: defaultPadding,
    margin: defaultMargin,
    background: null,
    clip: defaultClip,
    border: defaultBorder,
    clickable: false,
    align: "start",
    alpha: 1,
    shadow: defaultShadow,
};

export const defaultTextStyle: TextStyle = {
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

export const defaultButtonStyle: ButtonStyle = {
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
export const componentDefaults: {
    [K in UIComponent["type"]]?: Partial<Extract<UIComponent, { type: K }>>
} = {
    text: {
        modifier: {
            ...defaultModifier,
            size: { width: "wrap_content", height: "wrap_content" },
            padding: defaultPadding, // обычно текст без внешних отступов
        },
        style: defaultTextStyle,
    },
    button: {
        modifier: {
            ...defaultModifier,
            size: { width: "wrap_content", height: "wrap_content" },
            padding: {start: 24, end: 24, top: 10, bottom: 10 }
        },
        style: defaultButtonStyle,
    },
    image: {
        modifier: {
            ...defaultModifier,
            size: { width: "64", height: "64" },
        },
    },
    icon: {
        modifier: {
            ...defaultModifier,
            size: { width: "24", height: "24" },
        },
    },
    row: {
        modifier: {
            ...defaultModifier,
            fillMaxWidth: true,
            size: { width: "match_parent", height: "20" }, // контейнер 20×20
        },
        verticalAlignment: "centerVertically",
        horizontalArrangement: "start",
    },
    column: {
        modifier: {
            ...defaultModifier,
            fillMaxHeight: true,
            size: { width: "20", height: "match_parent" }, // контейнер 20×20
        },
        verticalAlignment: "top",
        horizontalArrangement: "start",
    },
    box: {
        modifier: {
            ...defaultModifier,
            size: { width: "20", height: "20" }, // контейнер 20×20
        },
    },
    card: {
        modifier: {
            ...defaultModifier,
            size: { width: "20", height: "20" }, // контейнер 20×20
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
            size: { width: "20", height: "20" },
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


// Типы для шаблонов компонентов
export const componentTemplates: {
    type: UIComponent["type"];
    name: string;
}[] = [
        {
            type: "text",
            name: "Текст"
        },
        {
            type: "button",
            name: "Кнопка"
        },
        {
            type: "image",
            name: "Изображение"
        },
        {
            type: "card",
            name: "Карточка"
        },
        {
            type: "row",
            name: "Строка"
        },
        {
            type: "column",
            name: "Колонка"
        },
        {
            type: "checkbox",
            name: "Чекбокс"
        },
        {
            type: "spacer",
            name: "Спейсер"
        },
    ];