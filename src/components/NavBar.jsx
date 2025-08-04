import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "../constants/configs";
import { ROUTES } from "../constants/routes";
import { resetToken } from "../redux/tokenSlice";
import { logout } from "../redux/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isUserPopUpOpen, setIsUserPopUpOpen] = useState(false);
  const [isOptionsMenuON, setIsOptionsMenuON] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Home");

  const handleLogout = () => {
    showToast("Success", "Info", "Logout sccessfully.!");
    navigate(ROUTES.LOGIN);
    dispatch(resetToken());
    dispatch(logout());
  };

  const navOptionClassCss =
    "block py-2 px-3 md:p-0 text-color-text cursor-pointer hover:text-color-btn transition-colors duration-300 ease-in-out";

  const UserIcon = () => (
    <div>
      <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          onClick={() => setIsUserPopUpOpen(!isUserPopUpOpen)}
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 cursor-pointer"
        >
          <span className="sr-only">Open user menu</span>
          <svg
            className="w-8 h-8 text-color-btn"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`${
            isUserPopUpOpen ? "" : "hidden"
          } absolute top-full mt-2 z-10 w-48 text-base list-none divide-y divide-color-btn rounded-lg shadow-sm bg-color-bg-2 select-none`}
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm font-semibold text-color-text">
              {user.name}
            </span>
            <span className="block text-sm text-color-sub truncate text-color-text-light">
              {user.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-color-text hover:bg-gray-100 dark:hover:bg-color-bg-1 cursor-pointer"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  function redirectUserOnHome() {
    if (user && user.role === CONSTANTS.TEACHER) {
      navigate(ROUTES.TEACHER_DASHBOARD);
    } else {
      navigate(ROUTES.STUDENT_DASHBOARD);
    }
  }

  return (
    <nav className="bg-color-bg-1 border-gray-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span
          onClick={() => {
            setSelectedOption("Home"),
              navigate(
                user.role === CONSTANTS.TEACHER
                  ? ROUTES.TEACHER_DASHBOARD
                  : ROUTES.STUDENT_DASHBOARD
              );
          }}
          className="self-center text-2xl font-semibold whitespace-nowrap text-color-btn hover:cursor-pointer"
        >
          Quiz
        </span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user && <UserIcon />}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border bg-color-bg-1 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li
              className={`${
                selectedOption === "Home" ? "border-b border-color-btn" : ""
              }`}
            >
              <a
                onClick={() => {
                  setSelectedOption("Home"), redirectUserOnHome();
                }}
                className={`${navOptionClassCss}`}
              >
                Home
              </a>
            </li>
            <li
              className={`${
                selectedOption === "Result" ? "border-b border-color-btn" : ""
              }`}
            >
              <a
                onClick={() => {
                  setSelectedOption("Result"), navigate(ROUTES.STUDENT_RESULT);
                }}
                className={`${navOptionClassCss}`}
              >
                Result
              </a>
            </li>
            <li
              className={`${
                selectedOption === "Leader Board"
                  ? "border-b border-color-btn"
                  : ""
              }`}
            >
              <a
                onClick={() => {
                  setSelectedOption("Leader Board"), navigate(ROUTES.LEADERBOARD);
                }}
                className={`${navOptionClassCss}`}
              >
                Leader Board
              </a>
            </li>
            {user && user.role === CONSTANTS.TEACHER && (
              <li>
                <div>
                  <button
                    onClick={() => setIsOptionsMenuON(!isOptionsMenuON)}
                    className="flex items-center justify-between w-full py-2 px-3 md:p-0 text-color-text cursor-pointer hover:text-color-btn transition-colors duration-300 ease-in-out"
                  >
                    Options{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
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
                    className={`${
                      isOptionsMenuON ? "" : "hidden"
                    } absolute z-10 font-normal divide-y divide-gray-100 rounded-lg shadow-sm w-fit bg-color-bg-2 mt-2`}
                  >
                    <ul
                      className="py-2 text-sm text-color-text"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <a
                          onClick={() => {
                            setIsOptionsMenuON(false),
                              navigate(ROUTES.STUDENT_DASHBOARD);
                          }}
                          className="block px-4 py-2 text-sm hover:bg-color-bg-1 hover:cursor-pointer"
                        >
                          Start Quiz
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setIsOptionsMenuON(false),
                              navigate(ROUTES.TEACHER_ALL_QUIZSETS);
                          }}
                          className="block px-4 py-2 text-sm hover:bg-color-bg-1 hover:cursor-pointer"
                        >
                          Quizze
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setIsOptionsMenuON(false),
                              navigate(ROUTES.TEACHER_QUESTIONS_ADD);
                          }}
                          className="block px-4 py-2 text-sm hover:bg-color-bg-1 hover:cursor-pointer"
                        >
                          Question
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setIsOptionsMenuON(false),
                              navigate(ROUTES.TEACHER_QUIZ_CREATE);
                          }}
                          className="block px-4 py-2 text-sm hover:bg-color-bg-1 hover:cursor-pointer"
                        >
                          Create Quiz
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            )}
            <li
              className={`${
                selectedOption === "Contact" ? "border-b border-color-btn" : ""
              }`}
            >
              <a
                onClick={() => {
                  setSelectedOption("Contact"), navigate(ROUTES.CONTACT);
                }}
                className={`${navOptionClassCss}`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
