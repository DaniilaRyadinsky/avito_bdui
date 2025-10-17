import * as React from "react";

import { PropertyPanel, type PropertyPanelValue } from "./PropertyPanel";

import "../styles/panel.css"

export const DemoPanel: React.FC = () => {
    const [state, setState] = React.useState<PropertyPanelValue>({
        modifier: {
            size: { width: "wrap_content", height: "wrap_content" },
            weight: 0,
            fillMaxWidth: false,
            fillMaxHeight: false,
            padding: { start: 8, end: 8, top: 8, bottom: 8 },
            align: "start",
            clip: { cornerRadius: 8 },
            background: "#ffffff",
            border: { width: 1, color: "#e5e7eb" },
            clickable: false,
            alpha: 1,
            shadow: { elevation: 0, color: 0 }
        },
        textStyle: {
            fontSize: 16,
            fontWeight: "normal",
            fontStyle: "normal",
            color: "#111827",
            lineHeight: 20,
            letterSpacing: 0,
            textDecoration: "none",
            textAlign: "start",
            maxLines: 0,
            overflow: "visible"
        },
        buttonStyle: {
            background: "#111827",
            textColor: "#ffffff",
            fontSize: 16,
            fontWeight: "bold",
            fontStyle: "normal",
            shape: { cornerRadius: 12, topStart: 12, topEnd: 12 },
            border: { width: 1, color: "#111827" }
        },
        contentScale: "None"
    });


    return (
        <PropertyPanel value={state} onChange={(e) => {setState(e); console.log(state)}} />

    );
};