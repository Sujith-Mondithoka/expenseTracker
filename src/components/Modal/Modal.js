import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, setIsOpen, children }) => {
  const handleClose = (e) => {
    if (e.target.className.includes(styles.modalOverlay)) {
      setIsOpen(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
