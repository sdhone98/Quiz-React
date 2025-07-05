import { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/routes";

function App() {

      const user = {
      userName:"sdhone98",
      name: "Sagar Dhone",
      firstName: "Sagar",
      lastName: "Dhone",
    }

  localStorage.setItem("user", JSON.stringify(user));
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
