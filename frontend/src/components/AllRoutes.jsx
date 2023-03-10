import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreationClub from "../pages/CreationClub";
import Error from "../pages/Error";
import ClubManagement from "../pages/ClubManagement";
import UserManagement from "../pages/UserManagement";
import Profil from "../pages/Profil";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/creationclub" element={<CreationClub />} />
      <Route path="/clubmanagement" element={<ClubManagement />} />
      <Route path="/usermanagement" element={<UserManagement />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AllRoutes;
