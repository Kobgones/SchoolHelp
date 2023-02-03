import React, { useState } from "react";
import Lottie from "react-lottie";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import animationData from "../lotties/schoolBoy.json";

const { VITE_BACKEND_URL } = import.meta.env;

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.status !== 401) {
          return response.json();
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
            navigate("/home");
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
      <div className="flex flex-col justify-center items-center my-10">
        <div className="flex flex-col justify-center items-center rounded-full border-[1px] border-mainBlue shadow-lg overflow-hidden">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="w-screen flex flex-col justify-center items-center"
          >
            <div className="flex flex-col justify-center w-9/12 md:w-1/3 py-5">
              <img src="/src/assets/mail.png" alt="mailPicture" width={30} />
              <input
                type="mail"
                id="floating_standard"
                className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleChangeEmail}
                placeholder="E-mail"
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
                placeholder="Mot de passe"
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
              className="text-white mt-10 md:mt-0 bg-mainBlue hover:bg-mainBlue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-mainBlue dark:hover:bg-mainBlue focus:outline-none dark:focus:ring-mainBlue"
            >
              Connexion
            </button>
            <div className="md:mt-6 mt-20">
              <span className="block text-sm text-center underline text-gray-500 hover:text-black">
                <Link to="/register">
                  {" "}
                  Pas encore de compte ? <br />
                  Je le crée de suite !
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
