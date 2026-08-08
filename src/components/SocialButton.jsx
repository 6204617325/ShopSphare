import React from "react";
function SocialButton({ text, icon, onClick }) {
  return (
    <div className="mb-2">
      <button
        type="button"
        className="btn btn-outline-light w-100"
        onClick={onClick}
      >
        {icon}
        <span style={{ marginLeft: "10px" }}>{text}</span>
      </button>
    </div>
  );
}

export default SocialButton;