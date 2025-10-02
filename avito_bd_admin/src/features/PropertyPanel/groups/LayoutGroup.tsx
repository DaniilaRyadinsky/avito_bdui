import * as React from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";

import "../styles/panel.css"
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import type { Modifier, Size } from "../../../shared/model/types";


const pctOrBoolOptions = [
    { label: "Off", value: "false" },
    { label: "100%", value: "true" },
    { label: "25%", value: "0.25" },
    { label: "33%", value: "0.33" },
    { label: "50%", value: "0.5" },
    { label: "66%", value: "0.66" },
    { label: "75%", value: "0.75" },
    { label: "90%", value: "0.9" },
];

export const LayoutGroup: React.FC<{ value?: Modifier; onChange: (next: Partial<Modifier>) => void }> = ({ value, onChange }) => {
    const setSize = (patch: Partial<Size>) => {
        console.log(patch)
        onChange({ size: { ...value?.size, ...patch } as Size });
    }

    const onWidthChange = (v: string) => {
        console.log(v)
        if (v === "wrap_content") {
            onChange({
                size: { ...value?.size, width: "wrap_content" },
                fillMaxWidth: false,
            });
        }
        else if (v === "px") {
            onChange({
                size: { ...value?.size, width: "100" },
                fillMaxWidth: false,
            });
        }
        else if (v === "match_parent") {
            onChange({
                size: { ...value?.size, width: "match_parent" },
                fillMaxWidth: true,
            });
        }
    }

    const onHeightChange = (v: string) => {
        console.log(v)
        if (v === "wrap_content") {
            onChange({
                size: { ...value?.size, height: "wrap_content" },
                fillMaxHeight: false,
            });
        }
        else if (v === "px") {
            onChange({
                size: { ...value?.size, height: "100" },
                fillMaxHeight: false,
            });
        }
        else if (v === "match_parent") {
            onChange({
                size: { ...value?.size, height: "match_parent" },
                fillMaxHeight: true,
            });
        }
    }

    return (
        <Section title="Разметка">
            <div className="section_container">
                <Column label="Ширина">
                    <div className="grid-2">
                        <SelectBox
                            value={(value?.size?.width !== "wrap_content" && value?.size?.width !== "match_parent") ? "px" : value?.fillMaxWidth === true ? "match_parent" : "wrap_content"}
                            onChange={(v) => onWidthChange(v)}
                            options={[{ label: "Содержимое", value: "wrap_content" }, { label: "Растянуть", value: "match_parent" }, { label: "Фиксированная", value: "px" }]}
                        />
                        {(value?.size?.width !== "wrap_content" && value?.size?.width !== "match_parent") ? (
                            <NumberInput value={Number(value?.size?.width)} onChange={(n) => setSize({ width: String(n) })} />
                        ) : (
                            <button className="button" onClick={() => setSize({ width: "100" })}>px</button>
                        )}
                    </div>
                </Column>


                <Column label="Высота">
                    <div className="grid-2">
                        <SelectBox
                            value={(value?.size?.height !== "wrap_content" && value?.size?.height !== "match_parent") ? "px" : value?.fillMaxHeight === true ? "match_parent" : "wrap_content"}
                            onChange={(v) => onHeightChange(v)}
                            options={[{ label: "Содержимое", value: "wrap_content" }, { label: "Растянуть", value: "match_parent" }, { label: "Фиксированная", value: "px" }]}
                        />
                        {(value?.size?.height !== "wrap_content" && value?.size?.height !== "match_parent") ? (
                            <NumberInput value={Number(value?.size?.height)} onChange={(n) => setSize({ height: String(n) })} />
                        ) : (
                            <button className="button" onClick={() => setSize({ height: "100" })}>px</button>
                        )}
                    </div>
                </Column>
            </div>

            <Column label="Weight"><NumberInput value={Number(value?.weight)} onChange={(n) => onChange({ weight: n })} step={0.1} /></Column>
            {/* <Column label="Fill max width">
                <SelectBox value={String(value.fillMaxWidth)} onChange={(v) => onChange({ fillMaxWidth: v === "true" ? true : v === "false" ? false : Number(v) })} options={pctOrBoolOptions} />
            </Column>
            <Column label="Fill max height">
                <SelectBox value={String(value.fillMaxHeight)} onChange={(v) => onChange({ fillMaxHeight: v === "true" ? true : v === "false" ? false : Number(v) })} options={pctOrBoolOptions} />
            </Column> */}

            <Column label="Выравнивание">
                <SelectBox value={value?.align} onChange={(v) => onChange({ align: v as any })} options={["start", "center", "end", "top", "bottom"].map(x => ({ label: x, value: x }))} />
            </Column>
        </Section>
    );
};