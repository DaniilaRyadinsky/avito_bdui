import styles from "./TextArea.module.css";

export const TextArea: React.FC<{
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <textarea
    className={styles.input}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);
