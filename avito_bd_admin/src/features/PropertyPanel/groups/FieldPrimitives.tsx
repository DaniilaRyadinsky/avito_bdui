import * as React from "react";
import "../styles/panel.css"

type Opt = { label: string; value: string };


export const Column: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="column">
        {label ? <label>{label}</label> : <span />}
        <div>{children}</div>
    </div>
);


export const NumberInput: React.FC<{ value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; placeholder?: string }> = ({ value, onChange, min, max, step = 1, placeholder }) => (
    <input className="number" type="number" value={Number.isFinite(value) ? value : 0} min={min} max={max} step={step} placeholder={placeholder} onChange={(e) => onChange(Number(e.target.value))} />
);


export const TextInput: React.FC<{ value: string; onChange: (v: string) => void; placeholder?: string }> = ({ value, onChange, placeholder }) => (
    <input className="input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
);


export const SelectBox: React.FC<{ value: string; onChange: (v: string) => void; options: Opt[] }> = ({ value, onChange, options }) => (
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
);


export const BoolSwitch: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
    <button type="button" className={`switch ${checked ? "switch--on" : ""}`} onClick={() => onChange(!checked)} aria-pressed={checked}>
        <span className="switch__thumb" />
    </button>
);


export const ColorInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
    <div className="flex">
        <input type="color" className="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
);