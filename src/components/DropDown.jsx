import React from "react";
import { useState } from "react";


const DropDown = ({ isDependent, parentChoice, setSelectedTopic, programingLanguage }) => {
  const [isOpen, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedTopic(option);
    setOpen(false);
    console.log("Selected:", option);
  };

  const populateDropDown = () => {
    console.log("CLICk--->",isDependent, parentChoice)
    if (isDependent) {
      if (parentChoice){
          console.log(" Y parentChoice", parentChoice)

      }else{
        console.log(" N parentChoice", parentChoice)
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={populateDropDown}
        class="text-color-text-2 bg-color-button-1 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Select Topic{" "}
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
          isOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute mt-2`}
      >
        <ul
          class="py-2 text-sm text-gray-700 dark:text-gray-200 h-48 overflow-y-auto"
          aria-labelledby="dropdownDefaultButton"
        >
          {programingLanguage.map((i) => (
            <li key={i}>
              <a
                href="#"
                onClick={() => handleSelect(i)}
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
