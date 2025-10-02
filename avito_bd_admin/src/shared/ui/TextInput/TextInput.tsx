import styles from './TextInput.module.css'

export const TextInput: React.FC<{ 
    value: string; 
    onChange: (v: string) => void; 
    placeholder?: string }> = ({ value, onChange, placeholder }) => (
    <input className={styles.input} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
);