import * as React from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";

import "../styles/panel.css"
import { BoolSwitch } from "../../../shared/ui/BoolSwitch/BoolSwitch";
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import type { Padding } from "../../../shared/model/types";


export const PaddingGroup: React.FC<{ value?: Padding; onChange: (next: Padding) => void }> = ({ value, onChange }) => {
    const [linkAll, setLinkAll] = React.useState<boolean>(value?.all !== undefined);
    const setAll = (n: number) => onChange({ start: n, end: n, top: n, bottom: n, all: n });
    return (
        <Section title="Отступы">
                <Column label="">
                    <div className="flex">
                        <BoolSwitch checked={linkAll} onChange={(v) => { setLinkAll(v); if (v) setAll(value?.all ?? 0); else onChange({ ...value, all: undefined }); }} />
                        <span className="small">Все стороны</span>
                    </div>
                </Column>
                {linkAll ? (
                    <Column label="All"><NumberInput value={Number(value?.all ?? 0)} onChange={(n) => setAll(n)} /></Column>
                ) : (
                    <div className="grid-2">
                        <div className="section_container">
                            <Column label="Start"><NumberInput value={Number(value?.start)} onChange={(n) => onChange({ ...value, start: n })} /></Column>
                            <Column label="End"><NumberInput value={Number(value?.end)} onChange={(n) => onChange({ ...value, end: n })} /></Column>
                        </div>
                        <div className="section_container">
                            <Column label="Top"><NumberInput value={Number(value?.top)} onChange={(n) => onChange({ ...value, top: n })} /></Column>
                            <Column label="Bottom"><NumberInput value={Number(value?.bottom)} onChange={(n) => onChange({ ...value, bottom: n })} /></Column>
                        </div>
                    </div>
                )}
        </Section>
    );
};