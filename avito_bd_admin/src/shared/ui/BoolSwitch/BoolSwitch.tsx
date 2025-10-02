import styles from './BoolSwitch.module.css'

import clsx from 'clsx';

export const BoolSwitch: React.FC<{ checked?: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
    <button type="button" className={clsx([styles.switch], {
        [styles.switch__on]: (checked)
    })}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}>
        <span className={styles.switch__thumb} />
    </button >
);

