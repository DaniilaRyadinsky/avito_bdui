import React from "react";
import styles from "./Button.module.css";

interface IButton {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ onClick, disabled, children }:IButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.saveButton}
    >
      {children}
    </button>
  );
};

export default Button;