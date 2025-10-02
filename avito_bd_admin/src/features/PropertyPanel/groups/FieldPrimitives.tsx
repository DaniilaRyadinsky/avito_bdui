import * as React from "react";
import "../styles/panel.css"

export const Column: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="column">
        {label ? <label>{label}</label> : <span />}
        <div>{children}</div>
    </div>
);
