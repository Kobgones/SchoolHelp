import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreationClub from "../pages/CreationClub";
import Error from "../pages/Error";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/creationclub" element={<CreationClub />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AllRoutes;
