import * as React from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";

import "../styles/panel.css"
import { BoolSwitch } from "../../../shared/ui/BoolSwitch/BoolSwitch";
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import type { Modifier, ContentScale } from "../../../shared/model/types";


export const AdvancedGroup: React.FC<{
    modifier: Modifier;
    onChange: (next: Partial<Modifier>) => void;
    contentScale?: ContentScale;
    onContentScaleChange?: (v: ContentScale) => void;
}> = ({ modifier, onChange, contentScale, onContentScaleChange }) => (
    <Section title="Advanced">
        <Column label="Clickable"><BoolSwitch checked={modifier.clickable} onChange={(v) => onChange({ clickable: v })} /></Column>
        {onContentScaleChange && (
            <Column label="Content scale">
                <SelectBox value={String(contentScale ?? "None")} onChange={(v) => onContentScaleChange(v as ContentScale)}
                    options={["Fill", "FillHeight", "Crop", "FillWidth", "Inside", "None", "FillBounds"].map(x => ({ label: x, value: x }))}
                />
            </Column>
        )}
    </Section>
);