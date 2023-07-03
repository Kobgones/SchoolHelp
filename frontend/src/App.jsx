import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";

import "./App.css";
import "./index.css";
import { CurrentUserProvider } from "./contexts/userContext";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading && location.pathname === "/") {
    return <Loader />;
  }

  return (
    <div className="App">
      <CurrentUserProvider>
        <Navbar />
        <AllRoutes />
      </CurrentUserProvider>
    </div>
  );
}

export default App;
