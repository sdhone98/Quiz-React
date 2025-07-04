import { useState } from "react";

const DropDown = ({ label, onSelect, optionsList, isDisable }) => {
  const [isOpen, setOpen] = useState(false);
  const [userSelection, setUserSelection] = useState(label);

  const getClass  = () => {
    console.log("==>", label, isDisable, isOpen, " : ", (!isDisable && isOpen))
    // return ""
    if (!isDisable && isOpen) {
      return ""
    }
    else{

      return "hidden"
    }
  }
  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={() => !isDisable && setOpen(true)}
        class={`${isDisable && "cursor-not-allowed"} py-3 text-color-text-2 bg-color-button-1 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 text-center inline-flex items-center`}
        type="button"
      >
        {userSelection}
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${
          getClass()
        } divide-y divide-gray-100 rounded-lg shadow-sm w-fit bg-color-button-1  absolute mt-2`}
      >
        <ul
          class="py-2 text-sm text-color-text-2 h-fit overflow-y-auto"
          aria-labelledby="dropdownDefaultButton"
        >
          {optionsList.map((i) => (
            <li key={i}>
              <a
                href="#"
                onClick={() => (onSelect(i), setOpen(false), setUserSelection(i))}
                class="block px-4 py-2 hover:bg-color-button-2"
              >
                {i}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
