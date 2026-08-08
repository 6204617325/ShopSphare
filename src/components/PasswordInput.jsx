
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group">
      <FaLock className="left-icon" />
  
     <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter Password"
      className="form-input"
      value={value}
        onChange={onChange}
     />

      <span className="right-icon"
       onClick={() => setShowPassword(!showPassword)}>
       {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
}

export default PasswordInput;