import { useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import animationData from "../lotties/register.json";
import PreviousButton from "../components/PreviousButton";

const { VITE_BACKEND_URL } = import.meta.env;

function Register() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // we create states to save the value of the input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* registerInformations will save all the data of the user  */
  const [registerInformations, setRegisterInformations] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  console.warn(registerInformations);

  const navigate = useNavigate();

  const notifySuccess = () => {
    toast(`Félicitations votre compte est créé !`, {
      icon: "🎉",
    });
  };

  const notifyError = () => {
    toast(
      "Les informations transmises ne vous permettent pas de créer un compte",
      {
        icon: "🚫",
      }
    );
  };

  // we create functions to handle the change of the input and the submit of the form
  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      firstname: e.target.value,
    });
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      lastname: e.target.value,
    });
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      email: e.target.value,
    });
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      password: e.target.value,
    });
  };

  const submitRegisterInformations = (e) => {
    /* if one of the value of the object registerInformations is null, return a message */
    if (
      registerInformations.firstname === "" ||
      registerInformations.lastname === "" ||
      registerInformations.email === "" ||
      registerInformations.password === ""
    )
      return;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({ ...registerInformations });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow",
    };

    e.preventDefault();

    fetch(`${VITE_BACKEND_URL}/register`, requestOptions)
      .then((response) => {
        if (response.status !== 201) {
          notifyError();
        }
        response.text();
      })
      .then((response) => {
        console.warn(response);
        notifySuccess(registerInformations.firstname);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch(console.error);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder />
      <PreviousButton />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="pb-10">
          <div className="flex flex-col justify-center items-center rounded-full border-2 border-mainBlue bg-mainBlue overflow-hidden">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        </div>
        <form
          onSubmit={submitRegisterInformations}
          className="w-screen flex flex-col justify-center items-center"
        >
          <div className="flex flex-col justify-center w-9/12 md:w-1/3 pb-5">
            <input
              type="firstname"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={firstname}
              onChange={handleChangeFirstname}
              placeholder="Prénom"
            />
            <label
              htmlFor="floating_standard"
              className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <br />
            </label>
          </div>
          <div className="flex flex-col justify-center w-9/12 md:w-1/3">
            <input
              type="lastname"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={lastname}
              onChange={handleChangeLastname}
              placeholder="Nom"
            />
            <label
              htmlFor="floating_standard"
              className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <br />
            </label>
          </div>
          <div className="flex flex-col justify-center w-9/12 md:w-1/3 pb-5">
            <input
              type="email"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={email}
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
            <input
              type="password"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={password}
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
            className="text-white bg-mainBlue hover:bg-mainBlue  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-mainBlue dark:hover:bg-mainBlue focus:outline-none dark:focus:ring-mainBlue"
          >
            Créer mon compte
          </button>
        </form>
      </div>
    </>
  );
}
export default Register;
