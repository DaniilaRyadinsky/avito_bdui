import * as React from "react";
import { VisualsGroup } from "../groups/VisualsGroup";
import { TextStyleGroup } from "../groups/TextStyleGroup";
import { ButtonStyleGroup } from "../groups/ButtonStyleGroup";
import { LayoutGroup } from "../groups/LayoutGroup";
import { PaddingGroup } from "../groups/PaddingGroup";

import "../styles/panel.css"
import type { Modifier, TextStyle, ButtonStyle, ContentScale, UIScreen, UIComponent } from "../../../shared/model/types";
import { useBuilder } from "../../Builder/lib/builderContext";
import { useEffect } from "react";
import { deepMerge } from "../../ComponentLibrary/lib/templates";
import { componentDefaults } from "../../ComponentLibrary/lib/constant";
import { applyDefaultsToComponent, applyDefaultsToScreen } from "../lib/constants";


export type PropertyPanelValue = {
  modifier: Modifier;
  textStyle?: TextStyle;
  buttonStyle?: ButtonStyle;
  contentScale?: ContentScale;
};


export const PropertyPanel: React.FC<{

  className?: string;
}> = ({ className }) => {

  const { screen, updateScreen, selectedComponentId } = useBuilder();

  // Глубокий поиск по списку
function findInList(list: UIComponent[] | undefined, id: string): UIComponent | null {
  if (!list) return null;
  for (const comp of list) {
    if (comp._id === id) return comp;
    if ("children" in comp && comp.children?.length) {
      const found = findInList(comp.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Поиск по всему экрану
function findComponentById(screen: UIScreen | null | undefined, id: string|null): UIComponent|null{
  if (!screen) return null;
  if (!id) return null;
  return (
    findInList(screen.topBar, id) ||
    findInList(screen.content, id) ||
    findInList(screen.bottomBar, id) ||
    null
  );
}



const targetComponent = applyDefaultsToComponent(findComponentById(screen, selectedComponentId))

useEffect(()=> {
  console.log(targetComponent)
})
  
if (!targetComponent) return <div className={`panel-card ${className ?? ""}`}>Выберите элемент</div>

  // const [state, setState] = React.useState<PropertyPanelValue>({
  //   modifier: {
  //     size: { width: "wrap_content", height: "wrap_content" },
  //     weight: 0,
  //     fillMaxWidth: false,
  //     fillMaxHeight: false,
  //     padding: { start: 8, end: 8, top: 8, bottom: 8 },
  //     align: "start",
  //     clip: { cornerRadius: 8 },
  //     background: "#ffffff",
  //     border: { width: 1, color: "#e5e7eb" },
  //     clickable: false,
  //     alpha: 1,
  //     shadow: { elevation: 0, color: 0 }
  //   },
  //   textStyle: {
  //     fontSize: 16,
  //     fontWeight: "normal",
  //     fontStyle: "normal",
  //     color: "#111827",
  //     lineHeight: 20,
  //     letterSpacing: 0,
  //     textDecoration: "none",
  //     textAlign: "start",
  //     maxLines: 0,
  //     overflow: "visible"
  //   },
  //   buttonStyle: {
  //     background: "#111827",
  //     textColor: "#ffffff",
  //     fontSize: 16,
  //     fontWeight: "bold",
  //     fontStyle: "normal",
  //     shape: { cornerRadius: 12, topStart: 12, topEnd: 12 },
  //     border: { width: 1, color: "#111827" }
  //   },
  //   contentScale: "None"
  // });

  // const patch = React.useCallback(<K extends keyof PropertyPanelValue>(key: K, part: Partial<NonNullable<PropertyPanelValue[K]>>) => {
  //   setState({ ...state, [key]: { ...(state[key] as any), ...part } as any });
  // }, [state, setState]);

  

  return (
    <div className={`panel-card ${className ?? ""}`}>
      <div className="panel-card__header">Свойства</div>
      <div className="panel-card__content">
        <LayoutGroup
         value={targetComponent.modifier} 
        //  onChange={(m) => patch("modifier", m)} 
         onChange={() => {}}
         />
        <PaddingGroup 
        value={targetComponent.modifier?.padding} 
        // onChange={(p) => setState({ ...state, modifier: { ...state.modifier, padding: p } })} 
        onChange={() => {}}
        />
        {targetComponent.type=="text" && (<TextStyleGroup 
        value={targetComponent.style} 
        // onChange={(t) => patch("textStyle", t)} 
        onChange={() => {}}
        />)}
        {targetComponent.type=="button" && (<ButtonStyleGroup 
        value={targetComponent.style} 
        // onChange={(b) => patch("buttonStyle", b)} 
        onChange={() => {}}
        />)}
        <VisualsGroup 
        value={targetComponent.modifier} 
        // onChange={(m) => patch("modifier", m)} 
        onChange={() => {}}
        />
        {/* <AdvancedGroup modifier={value.modifier} onChange={(m) => patch("modifier", m)} contentScale={value.contentScale} onContentScaleChange={(v) => onChange({ ...value, contentScale: v })} /> */}
      </div>
    </div>
  );
};