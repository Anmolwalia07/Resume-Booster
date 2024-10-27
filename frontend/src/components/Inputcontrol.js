import React from 'react'
import style from "./Inputcontrol.module.css"
function Inputcontrol({label,...props}) {
    return (
    <div className={style.container}>
      {label && <label>{label}</label>}
      <input type="text" {...props} />
    </div>
  );
} 
export default Inputcontrol;
