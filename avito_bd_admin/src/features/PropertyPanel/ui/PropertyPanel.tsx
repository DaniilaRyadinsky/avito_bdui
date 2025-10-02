import * as React from "react";
import { VisualsGroup } from "../groups/VisualsGroup";
import { TextStyleGroup } from "../groups/TextStyleGroup";
import { ButtonStyleGroup } from "../groups/ButtonStyleGroup";
import { LayoutGroup } from "../groups/LayoutGroup";
import { PaddingGroup } from "../groups/PaddingGroup";

import "../styles/panel.css"
import type { Modifier, TextStyle, ButtonStyle, ContentScale } from "../../../shared/model/types";


export type PropertyPanelValue = {
  modifier: Modifier;
  textStyle?: TextStyle;
  buttonStyle?: ButtonStyle;
  contentScale?: ContentScale;
};


export const PropertyPanel: React.FC<{
  value: PropertyPanelValue;
  onChange: (next: PropertyPanelValue) => void;
  className?: string;
}> = ({ value, onChange, className }) => {
  
  const patch = React.useCallback(<K extends keyof PropertyPanelValue>(key: K, part: Partial<NonNullable<PropertyPanelValue[K]>>) => {
    onChange({ ...value, [key]: { ...(value[key] as any), ...part } as any });
  }, [value, onChange]);


  return (
    <div className={`panel-card ${className ?? ""}`}>
      <div className="panel-card__header">Свойства</div>
      <div className="panel-card__content">
        <LayoutGroup value={value.modifier} onChange={(m) => patch("modifier", m)} />
        <PaddingGroup value={value.modifier.padding} onChange={(p) => onChange({ ...value, modifier: { ...value.modifier, padding: p } })} />
        <VisualsGroup value={value.modifier} onChange={(m) => patch("modifier", m)} />
        {value.textStyle && (<TextStyleGroup value={value.textStyle} onChange={(t) => patch("textStyle", t)} />)}
        {value.buttonStyle && (<ButtonStyleGroup value={value.buttonStyle} onChange={(b) => patch("buttonStyle", b)} />)}
        {/* <AdvancedGroup modifier={value.modifier} onChange={(m) => patch("modifier", m)} contentScale={value.contentScale} onContentScaleChange={(v) => onChange({ ...value, contentScale: v })} /> */}
      </div>
    </div>
  );
};