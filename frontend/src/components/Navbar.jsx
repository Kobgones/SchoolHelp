import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
import CurrentUserContext from "../contexts/userContext";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser({});
    setNavbarOpen(!navbarOpen);
    navigate("/");
  };

  return (
    <nav className="relative flex items-center justify-center px-2 py-3 bg-mainBlue">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {currentUser.id && (
            <a href="/home" className="flex items-center">
              <img
                src="src/assets/wcs.png"
                className="h-10 mr-3 sm:h-16"
                alt="Logo"
              />
            </a>
          )}
          {!currentUser.id && (
            <a href="/" className="flex items-center">
              <img
                src="src/assets/wcs.png"
                className="h-10 mr-3 sm:h-16"
                alt="Logo"
              />
            </a>
          )}
          <button
            className={`text-white cursor-pointer text-xl leading-none px-3 py-1 border-2 border-solid border-transparent rounded bg-transparent block lg:hidden outline-solid focus:outline-none ${
              navbarOpen ? "open" : ""
            }`}
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span
              className={`block h-1 w-6 my-1 rounded bg-white transition-transform duration-300 ${
                navbarOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-1 w-6 my-1 rounded bg-white transition-opacity duration-300 ${
                navbarOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-6 my-1 rounded bg-white transition-transform duration-300 ${
                navbarOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`lg:flex flex-grow items-center${
            navbarOpen ? " flex" : " hidden"
          }`}
        >
          {currentUser.id && (
            <ul className="flex flex-col md:justify-center md:items-center md:flex-row list-none md:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/profil"
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                  <span className="ml-2">
                    Profil de {currentUser.firstname}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="/contact"
                >
                  <span className="ml-2">Contact</span>
                </a>
              </li>
              {currentUser.admin === 1 && (
                <>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/clubmanagement"
                    >
                      <span className="ml-2">Gestion des clubs</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/creationclub"
                    >
                      <span className="ml-2">Création d'un club</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/usermanagement"
                    >
                      <span className="ml-2">Gestion des utilisateurs</span>
                    </a>
                  </li>
                </>
              )}
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="m-6 flex items-center justify-end"
                >
                  <img src={logout} alt="Disconnect" className="w-8" />
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
