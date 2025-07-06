import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastProvider } from "./context/ToastContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LoadingProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LoadingProvider>
    </Provider>
  </StrictMode>
);
