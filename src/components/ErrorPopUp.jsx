import { useEffect, useState } from "react";

const ErrorPopUp = ({ msgType, mainMsg, detailMsg, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getColorClass = () => {
    if (msgType === "Error")
      return "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400";
    if (msgType === "Warning")
      return "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300";
    if (msgType === "Success")
      return "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400";
    return "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`${getColorClass()} flex items-center p-4 text-sm rounded-lg shadow-lg min-w-[300px]`}
        role="alert"
      >
        <svg
          className="shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div>
          <span className="font-medium">{mainMsg}</span> {detailMsg}
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
