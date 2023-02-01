import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Home from "./pages/Home";

import "./App.css";
import "./index.css";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
  return loader ? (
    <Loader />
  ) : (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
