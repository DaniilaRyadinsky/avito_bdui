import styles from './ColorInput.module.css'

export const ColorInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
    <div className="flex">
        <input type="color" className={styles.color} value={value} onChange={(e) => onChange(e.target.value)} />
        <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
);