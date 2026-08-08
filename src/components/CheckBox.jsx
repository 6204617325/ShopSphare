import React from 'react'

function CheckBox({ checked, onChange, label }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label">
        {label}
      </label>
    </div>
  );
}

export default CheckBox;