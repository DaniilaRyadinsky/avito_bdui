import styles from './NumberInput.module.css'

export const NumberInput: React.FC<{ value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; placeholder?: string }> = ({ value, onChange, min, max, step = 1, placeholder }) => (
    <input className={styles.number} type="number" value={Number.isFinite(value) ? value : 0} min={min} max={max} step={step} placeholder={placeholder} onChange={(e) => onChange(Number(e.target.value))} />
);