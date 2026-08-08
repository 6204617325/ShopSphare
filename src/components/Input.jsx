import React from 'react'
import { MdEmail } from "react-icons/md";

function Input ({value,onChange,error}) {
  return (<>
    <div className="input-group">
    <MdEmail className="icon" />
  <input
    type="email"
    placeholder="Enter Email"
    className="form-input"
    value={value}
     onChange={onChange}
  />
</div>
{error && <p className="error">{error}</p>}
</>
  );
}
export default Input;