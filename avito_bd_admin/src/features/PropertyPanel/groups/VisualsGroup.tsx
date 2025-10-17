import * as React from "react";
import { Section } from "./Section";
import { ColorInput } from '../../../shared/ui/ColorInput/ColorInput'
import { NumberInput } from '../../../shared/ui/NumberInput/NumberInput'
import { Column } from "./FieldPrimitives";

import "../styles/panel.css"
import type { Modifier, Shadow } from "../../../entities/components/model/componentTypes";



const ShadowEditor: React.FC<{ value?: Shadow; onChange: (next: Partial<Shadow>) => void }> = ({ value, onChange }) => {
    if (!value) return;
    return (<div className="grid grid-cols-2 gap-3">
        <Column label="Elevation"><NumberInput min={0} value={Number(value.elevation)} onChange={(n) => onChange({ elevation: n })} /></Column>
        <Column label="Цвет"><ColorInput value={value.color} onChange={(n) => onChange({ color: n })} /></Column>
    </div>)
};


export const VisualsGroup: React.FC<{ value?: Modifier; onChange: (next: Partial<Modifier>) => void }> = ({ value, onChange }) => (
    <Section title="Visuals"> 
        <Column label="Фон"><ColorInput value={value?.background} onChange={(c) => onChange({ background: c })} /></Column>
        <Section title="Граница">
            <div className="grid grid-cols-2 gap-3">
                <Column label="Ширина"><NumberInput min={0} value={Number(value?.border?.width)} onChange={(n) => onChange({ border: { ...value?.border, width: n } })} /></Column>
                <Column label="Цвет"><ColorInput value={value?.border?.color} onChange={(c) => onChange({ border: { ...value?.border, color: c } })} /></Column>
            </div>
        </Section>
        <Column label="Закругления"><NumberInput min={0} value={Number(value?.clip?.cornerRadius)} onChange={(n) => onChange({ clip: { cornerRadius: n } })} /></Column>
        <Section title="Тень"><ShadowEditor value={value?.shadow} onChange={(p) => onChange({ shadow: { ...value?.shadow, ...p } })} /></Section>
        <Column label="Прозрачность"><NumberInput min={0} value={Number(value?.alpha)} step={0.05} onChange={(n) => onChange({ alpha: n })} /></Column>
    </Section>
);