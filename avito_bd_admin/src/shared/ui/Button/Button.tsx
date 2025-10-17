import React from "react";
import styles from "./Button.module.css";

interface IButton {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties
}

const Button = ({ onClick, disabled, children, style }:IButton) => {
  return (
    <button
    style={style}
      onClick={onClick}
      disabled={disabled}
      className={styles.saveButton}
    >
      {children}
    </button>
  );
};

export default Button;