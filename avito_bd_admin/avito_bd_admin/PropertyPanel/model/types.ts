export type FontWeight = "normal" | "bold" | "medium"
export type FontStyle = "normal" | "italic"
export type TextDecoration = "none" | "underline" | "lineThrough"
export type TextAlign = "start" | "end" | "center" | "justify"

export type Size = {
    width: "wrap_content" | "match_parent"|  number,
    height: "wrap_content" |"match_parent"|  number
}

export type Overflow = "clip" | "ellipsis" | "visible"
export type Padding = {
    start: number,
    end: number,
    top: number,
    bottom: number,
    all?: number
}
export type Align = "start" | "center" | "end" | "top" | "bottom"
export type Border = {
    width: number,
    color: string
}
export type Shape = {
    cornerRadius: number,
    topStart: number,
    topEnd: number
}

export type CLip = {
    cornerRadius: number
}

export type ContentScale = "Fill" | "FillHeight" | "Crop" | "FillWidth" | "Inside" | "None" | "FillBounds"

export type VerticalAlignment = "Top" | "CenterVertically" | "Bottom"
export type HorizontalArrangement = "start" | "center" | "end" | "spaceBetween" | "spaceAround" | "spaceEvenly"

export type Shadow = {
    elevation: number,
    color: number
}

export type ButtonStyle = {
    background: string,
    textColor: string,
    fontSize: number,
    fontWeight: FontWeight,         // Толщина шрифта: normal, bold, medium и т.д.
    fontStyle: FontStyle,           // Наклон: normal, italic
    shape: Shape,
    border: Border
}

export type TextStyle = {
    fontSize: number,
    fontWeight: FontWeight,         // Толщина шрифта: normal, bold, medium и т.д.
    fontStyle: FontStyle,           // Наклон: normal, italic
    color: string,                  // Цвет текста
    lineHeight: number,             // Высота строки
    letterSpacing: number,          // Межбуквенный интервал
    textDecoration: TextDecoration, // underline, lineThrough
    textAlign: TextAlign,           // start, center, end, justify
    maxLines: number,               // Максимальное количество строк
    overflow: Overflow,
}

export type Modifier = {
    size: Size,
    weight: number,
    fillMaxWidth: boolean | number,                    // Растянуть по ширине
    fillMaxHeight: boolean | number,                   // Растянуть по высоте
    padding: Padding,                       // Отступы вокруг иконки
    align: Align,                           // Выравнивание в Row/Column: start, center, end, top, bottom
    clip: CLip,                             // Скругление (если нужно)
    background: string,                       // Цвет фона
    border: Border,                         // Рамка
    clickable: boolean,                       // Можно ли кликать
    alpha: number,                           // Прозрачность
    shadow: Shadow
}