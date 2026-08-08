import React from 'react'

function Button ({text,onClick,disabled}) {
  return (
    <div>
        <button type="button" className={`btn btn-primary '`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    </div>
  )
}
export default Button;