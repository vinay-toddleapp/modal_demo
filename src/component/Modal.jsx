import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      style={{
        position: "relative",
        width: "300px",
        backgroundColor: "white",
        borderRadius: "9px",
        border: "2px solid rgba(0, 0, 0, 0.1)",
        padding: "20px",
        zIndex: 1001,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
