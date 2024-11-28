import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <App />
      <ToastContainer
        position="top-center"
        autoClose="3000"
        draggable
        pauseOnHover
        theme="colored"
      />
    </UserContextProvider>
  </StrictMode>
);
