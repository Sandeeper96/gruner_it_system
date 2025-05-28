// components/Button.js
import React from "react";

const CustomButton = ({ children, onClick, type = "button", className = "", disabled = false,style }) => {
  return (
    <button

      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
