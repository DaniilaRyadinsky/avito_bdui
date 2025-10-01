import styles from './SelectBox.module.css'

type Opt = { label: string; value: string };

export const SelectBox: React.FC<{ value: string; onChange: (v: string) => void; options: Opt[] }> = ({ value, onChange, options }) => (
    <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
);