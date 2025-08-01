import React from "react";

function CustomBtn({ label, onBtnClick, icon = null, btnType = null }) {
  return (
    <button
      type={btnType}
      onClick={onBtnClick}
      className="flex items-center px-5 py-2 rounded-full text-sm font-semibold cursor-pointer text-color-text-dark bg-color-btn hover:bg-color-btn-hover hover:text-color-text transition-colors duration-300 ease-in-out"
    >
      {label}
      {icon}
    </button>
  );
}

export default CustomBtn;
