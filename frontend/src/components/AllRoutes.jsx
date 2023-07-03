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
import ClubPresentation from "../pages/ClubPresentation";
import CurrentUserContext from "../contexts/userContext";

function AllRoutes() {
  const { currentUser } = React.useContext(CurrentUserContext);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {currentUser.id && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/clubpresentation/:id" element={<ClubPresentation />} />
          {currentUser.admin && (
            <>
              <Route path="/creationclub" element={<CreationClub />} />
              <Route path="/clubmanagement" element={<ClubManagement />} />
              <Route path="/usermanagement" element={<UserManagement />} />
            </>
          )}
        </>
      )}
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default AllRoutes;
