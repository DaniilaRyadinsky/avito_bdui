import * as React from "react";

import "../styles/panel.css"
import Summary from "../../../shared/ui/Summary/Summary";


export const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="section">
        <Summary title={title}>
            <div className="section__body">{children}</div>
        </Summary>
    </div>
);