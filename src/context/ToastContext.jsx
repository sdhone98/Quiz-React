import { createContext, useContext, useState } from "react";
import ErrorPopUp from "../components/ErrorPopUp";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (msgType, mainMsg, detailMsg) => {
    setToast({ msgType, mainMsg, detailMsg });
  };

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ErrorPopUp
          msgType={toast.msgType}
          mainMsg={toast.mainMsg}
          detailMsg={toast.detailMsg}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};
