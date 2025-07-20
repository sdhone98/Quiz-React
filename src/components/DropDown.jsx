import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTopics } from "../redux/topicSlice";

const DropDown = ({ label, onSelect, optionsList, isDisable }) => {
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);
  const [userSelection, setUserSelection] = useState(label);

  const getClass = () => {
    if (!isDisable && isOpen) {
      return "";
    } else {
      return "hidden";
    }
  };
  return (
    <div>
      <button
        onClick={() => !isDisable && setOpen(true)}
        className={`${
          isDisable && "cursor-not-allowed"
        } w-fit py-3 text-color-text-2 bg-color-button-1 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center`}
        type="button"
      >
        {userSelection}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 ${getClass()} divide-y divide-gray-100 rounded-lg shadow-sm w-fit bg-color-button-1  absolute mt-2 h-fit max-h-1/4 overflow-y-auto scrollbar-hide`}
      >
        <ul
          className="py-2 text-sm text-color-text-2 h-fit overflow-y-auto"
          aria-labelledby="dropdownDefaultButton"
        >
          {" "}
          {optionsList.map(({ id, name }) => (
            <li key={id}>
              <a
                href="#"
                onClick={() => (
                  onSelect({ id: id, name: name }),
                  setOpen(false),
                  setUserSelection(name)
                )}
                className="block px-4 py-2 hover:bg-color-button-2"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
