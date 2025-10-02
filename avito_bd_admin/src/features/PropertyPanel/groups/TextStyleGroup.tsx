import * as React from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";

import "../styles/panel.css"
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import { ColorInput } from "../../../shared/ui/ColorInput/ColorInput";
import type { TextStyle } from "../../../shared/model/types";


export const TextStyleGroup: React.FC<{
    value: TextStyle; onChange: (next: Partial<TextStyle>) => void
}> = ({ value, onChange }) => (
    <Section title="Свойства текста">
        <Column label="Размер текста"><NumberInput value={value.fontSize} onChange={(n) => onChange({ fontSize: n })} /></Column>
        <Column label="Насыщенность">
            <SelectBox value={value.fontWeight} onChange={(v) => onChange({ fontWeight: v as any })} options={["normal", "bold", "medium"].map(x => ({ label: x, value: x }))} />
        </Column>
        <Column label="Стилизация">
            <SelectBox value={value.fontStyle} onChange={(v) => onChange({ fontStyle: v as any })} options={["normal", "italic"].map(x => ({ label: x, value: x }))} />
        </Column>
        <Column label="Цвет"><ColorInput value={value.color} onChange={(c) => onChange({ color: c })} /></Column>
        <Column label="Высота линии"><NumberInput value={value.lineHeight} onChange={(n) => onChange({ lineHeight: n })} /></Column>
        <Column label="Интервал"><NumberInput value={value.letterSpacing} onChange={(n) => onChange({ letterSpacing: n })} /></Column>
        <Column label="Decoration">
            <SelectBox value={value.textDecoration} onChange={(v) => onChange({ textDecoration: v as any })} options={[{ label: "Нормальный", value: "none" }, { label: "Подчеркнутый", value: "underline" }, { label: "Зачеркнутый", value: "lineThrough" }]} />
        </Column>
        <Column label="Выравнивание">
            <SelectBox value={value.textAlign} onChange={(v) => onChange({ textAlign: v as any })} options={["start", "end", "center", "justify"].map(x => ({ label: x, value: x }))} />
        </Column>
        <Column label="Количество строк"><NumberInput value={value.maxLines} onChange={(n) => onChange({ maxLines: n })} /></Column>
        <Column label="Скролл">
            <SelectBox value={value.overflow} onChange={(v) => onChange({ overflow: v as any })} options={["clip", "ellipsis", "visible"].map(x => ({ label: x, value: x }))} />
        </Column>
    </Section>
);