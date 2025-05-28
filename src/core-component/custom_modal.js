// components/CustomModal.js
import React from "react";
import Modal from "react-modal";

// Important for accessibility
//Modal.setAppElement("#root"); // Use your root element id

export default function CustomModal({ isOpen, onClose, title, children }) {

    const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
    style={customStyles}
    >
      {/* Close button */}
      <button
        onClick={onClose} style={{color:"#000",marginBottom:"20px"}}
        className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
      >
        ✕
      </button>

      {/* Title */}
      {title && <h2 className="text-xl font-semibold mb-4" style={{color:"black"}}>{title}</h2>}

      {/* Content */}
      {children}
    </Modal>
  );
}
