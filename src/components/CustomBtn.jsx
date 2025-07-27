import React from "react";

function CustomBtn({ label, onBtnClick, icon=null }) {
  return (
    <button 
    onClick={onBtnClick}
    className="flex items-center px-5 py-2 rounded-full text-sm font-semibold cursor-pointer text-color-text-dark bg-color-btn hover:bg-color-btn-hover hover:text-color-text">
      {label}
      {icon}
    </button>
  );
}

export default CustomBtn;
