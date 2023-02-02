import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";

import "./App.css";
import "./index.css";
import { CurrentUserProvider } from "./contexts/userContext";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1800);
  }, []);
  return loader ? (
    <Loader />
  ) : (
    <div className="App">
      <Router>
        <CurrentUserProvider>
          <Navbar />
          <AllRoutes />
        </CurrentUserProvider>
      </Router>
    </div>
  );
}

export default App;
