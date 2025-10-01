import * as React from "react";
import { Section } from "./Section";

import { Column } from "./FieldPrimitives";
import type { ButtonStyle, Shape, Border } from "../model/types";

import "../styles/panel.css"
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import { ColorInput } from "../../../shared/ui/ColorInput/ColorInput";
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";


const BorderEditor: React.FC<{ value: Border; onChange: (next: Partial<Border>) => void }> = ({ value, onChange }) => (
    <div className="grid grid-cols-2 gap-3">
        <Column label="Width"><NumberInput value={value.width} onChange={(n) => onChange({ width: n })} /></Column>
        <Column label="Color"><ColorInput value={value.color} onChange={(c) => onChange({ color: c })} /></Column>
    </div>
);


const ShapeEditor: React.FC<{ value: Shape; onChange: (next: Partial<Shape>) => void }> = ({ value, onChange }) => (
    <div className="grid grid-cols-2 gap-3">
        <Column label="Corner radius"><NumberInput value={value.cornerRadius} onChange={(n) => onChange({ cornerRadius: n })} /></Column>
        <Column label="Top start"><NumberInput value={value.topStart} onChange={(n) => onChange({ topStart: n })} /></Column>
        <Column label="Top end"><NumberInput value={value.topEnd} onChange={(n) => onChange({ topEnd: n })} /></Column>
    </div>
);


export const ButtonStyleGroup: React.FC<{
    value: ButtonStyle; onChange: (next: Partial<ButtonStyle>) => void
}> = ({ value, onChange }) => (
    <Section title="Свойство кнопки">
        <Column label="Фон"><ColorInput value={value.background} onChange={(c) => onChange({ background: c })} /></Column>
        <Column label="Цвет текста"><ColorInput value={value.textColor} onChange={(c) => onChange({ textColor: c })} /></Column>
        <Column label="Размер текста"><NumberInput value={value.fontSize} onChange={(n) => onChange({ fontSize: n })} /></Column>
        <Column label="Насыщенность">
            <SelectBox value={value.fontWeight} onChange={(v) => onChange({ fontWeight: v as any })} options={["normal", "bold", "medium"].map(x => ({ label: x, value: x }))} />
        </Column>
        <Column label="Стиль">
            <SelectBox value={value.fontStyle} onChange={(v) => onChange({ fontStyle: v as any })} options={["normal", "italic"].map(x => ({ label: x, value: x }))} />
        </Column>
        <Section title="Shape"><ShapeEditor value={value.shape} onChange={(p) => onChange({ shape: { ...value.shape, ...p } })} /></Section>
        <Section title="Граница"><BorderEditor value={value.border} onChange={(p) => onChange({ border: { ...value.border, ...p } })} /></Section>
    </Section>
);