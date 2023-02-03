import React from "react";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className="relative flex items-center justify-between px-2 py-3 bg-mainBlue">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a href="/" className="flex items-center">
            <img
              src="src/assets/wcs.png"
              className="h-10 mr-3 sm:h-16"
              alt="Flowbite Logo"
            />
          </a>

          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border-2 border-solid border-transparent rounded bg-transparent block lg:hidden outline-solid focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars" />
            <i className="fas fa-bars" />
            <i className="fas fa-bars" />
          </button>
        </div>
        <div
          className={`lg:flex flex-grow items-center${
            navbarOpen ? " flex" : " hidden"
          }`}
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/profil"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                <span className="ml-2">Mon Profil</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/contact"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" />
                <span className="ml-2">Contact</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/clubmanagement"
              >
                <i className="text-lg leading-lg text-white opacity-75" />
                <span className="ml-2">Gestion des clubs</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/creationclub"
              >
                <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75" />
                <span className="ml-2">Création d'un club</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/usermanagement"
              >
                <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75" />
                <span className="ml-2">Gestion des utilisateurs</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
