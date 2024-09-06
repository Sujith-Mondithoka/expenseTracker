import React from "react";
import styles from "./Button.module.css";

const Button = ({ handleClick, style, children }) => {
  const buttonClass =
    style === "primary"
      ? styles.buttonPrimary
      : style === "secondary"
      ? styles.buttonSecondary
      : style === "success"
      ? styles.buttonSuccess
      : style === "failure"
      ? styles.buttonFailure
      : "";

  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
