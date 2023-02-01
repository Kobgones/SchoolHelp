import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Home() {
  /* Toast */

  const notifyError = () => {
    toast("Vos informations de connexion sont incorrectes", {
      icon: "🚫",
    });
  };

  const notifySuccess = (firstname) => {
    toast(`Bonjour ${firstname}!`, {
      icon: "😁",
    });
  };

  const { setCurrentUser, setToken } = useCurrentUserContext();

  /* Import useNavigate to move after the login  */
  const navigate = useNavigate();

  /* set email and password */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    /* It's an object that will be sent in the body of request */
    const body = JSON.stringify({
      email,
      password,
    });

    /* function push user and token in the localstorage */
    fetch(`${VITE_BACKEND_URL}/login`, {
      method: "POST",
      redirect: "follow",
      body,
      headers: myHeaders,
    })
      /* then I get the response to json. If response == 401 console log error else .then result
       */
      .then((response) => {
        if (response.status !== 401) {
          /* eslint consistent-return: off */ return response.json();
        }
        notifyError();
        setPassword("");
      })
      .then((result) => {
        console.warn(result);
        if (result.token) {
          setCurrentUser(result.user);
          setToken(result.token);
          notifySuccess(result.user.firstname);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          notifyError();
        }
      })
      .catch((error) => console.warn(error));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder />
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-around mt-20 pb-20">
          <img
            src="src/assets/schoolPicture.png"
            alt="schoolPicture"
            width={250}
          />
        </div>
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-screen flex flex-col justify-center items-center"
          >
            <div className="flex flex-col justify-center w-9/12 md:w-1/3 pb-5">
              <img src="/src/assets/mail.png" alt="mailPicture" width={30} />
              <input
                type="mail"
                id="floating_standard"
                className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleChangeEmail}
              />
              <label
                htmlFor="floating_standard"
                className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <br />
              </label>
            </div>
            <div className="flex flex-col justify-center w-9/12 md:w-1/3">
              <img
                src="/src/assets/password.png"
                alt="mailPicture"
                width={30}
              />
              <input
                type="password"
                id="floating_standard"
                className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleChangePassword}
              />
              <label
                htmlFor="floating_standard"
                className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                <br />
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-mainBlue hover:bg-mainBlue  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-mainBlue dark:hover:bg-mainBlue focus:outline-none dark:focus:ring-mainBlue"
            >
              Connexion
            </button>
            <div className="mt-20">
              <p className="pb-3">Pas encore de compte ?</p>
              <button
                type="button"
                className="text-white bg-mainBlue hover:bg-mainBlue  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-mainBlue dark:hover:bg-mainBlue focus:outline-none dark:focus:ring-mainBlue"
              >
                <span>
                  Créer mon compte
                  <Link to="/register" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
