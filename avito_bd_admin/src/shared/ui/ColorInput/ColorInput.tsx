import styles from './ColorInput.module.css'

export const ColorInput: React.FC<{ value?: string | null; onChange: (v: string) => void }> = ({ value, onChange }) => {
    if (value == null) {
        onChange("#000000")
        return
    }
    return (
        <div className="flex">
            <input type="color" className={styles.color} value={value} onChange={(e) => onChange(e.target.value)} />
            <input className={styles.input} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};