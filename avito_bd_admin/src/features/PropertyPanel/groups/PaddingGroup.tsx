import * as React from "react";
import { Section } from "./Section";
import { Column } from "./FieldPrimitives";

import "../styles/panel.css"
import { NumberInput } from "../../../shared/ui/NumberInput/NumberInput";
import type { Padding, Margin } from "../../../entities/components/model/componentTypes";


export const PaddingGroup: React.FC<{ 
    padding?: Padding; 
    margin?: Margin; 
    onChangePadding: (next: Padding) => void, 
    onChangeMargin: (next: Margin) => void }> = ({ padding, margin, onChangePadding, onChangeMargin }) => {
    return (
        <Section title="Отступы">
            <Section title="Padding">
                <div className="section_container">
                    <Column label="Start"><NumberInput min={0} value={Number(padding?.start)} onChange={(n) => onChangePadding({ ...padding, start: n })} /></Column>
                    <Column label="End"><NumberInput min={0} value={Number(padding?.end)} onChange={(n) => onChangePadding({ ...padding, end: n })} /></Column>
                </div>
                <div className="section_container">
                    <Column label="Top"><NumberInput min={0} value={Number(padding?.top)} onChange={(n) => onChangePadding({ ...padding, top: n })} /></Column>
                    <Column label="Bottom"><NumberInput min={0} value={Number(padding?.bottom)} onChange={(n) => onChangePadding({ ...padding, bottom: n })} /></Column>
                </div>
            </Section>
            <Section title="Margin">
                <div className="section_container">
                    <Column label="Start"><NumberInput min={0} value={Number(margin?.start)} onChange={(n) => onChangeMargin({ ...margin, start: n })} /></Column>
                    <Column label="End"><NumberInput min={0} value={Number(margin?.end)} onChange={(n) => onChangeMargin({ ...margin, end: n })} /></Column>
                </div>
                <div className="section_container">
                    <Column label="Top"><NumberInput min={0} value={Number(margin?.top)} onChange={(n) => onChangeMargin({ ...margin, top: n })} /></Column>
                    <Column label="Bottom"><NumberInput min={0} value={Number(margin?.bottom)} onChange={(n) => onChangeMargin({ ...margin, bottom: n })} /></Column>
                </div>
            </Section>

        </Section>
    );
};