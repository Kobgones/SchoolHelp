import { useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import PreviousButton from "../components/PreviousButton";
import animationData from "../lotties/create.json";

const { VITE_BACKEND_URL } = import.meta.env;

function CreationClub() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // we create states to save the value of the input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("");
  const [trainer, setTrainer] = useState("");

  /* registerInformations will save all the data of the user  */
  const [registerInformations, setRegisterInformations] = useState({
    name: "",
    description: "",
    sport: "",
    trainer: "",
  });
  console.warn(registerInformations);

  const navigate = useNavigate();

  const notifySuccess = () => {
    toast(`Le club a bien été créé !`, {
      icon: "👍🏽",
    });
  };

  const notifyError = () => {
    toast("Erreur dans la création du club", {
      icon: "😕",
    });
  };

  // we create functions to handle the change of the input and the submit of the form
  const handleChangeName = (e) => {
    setName(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      name: e.target.value,
    });
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      description: e.target.value,
    });
  };

  const handleChangeSport = (e) => {
    setSport(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      sport: e.target.value,
    });
  };

  const handleChangeTrainer = (e) => {
    setTrainer(e.target.value);
    setRegisterInformations({
      ...registerInformations,
      trainer: e.target.value,
    });
  };

  const submitRegisterInformations = (e) => {
    /* if one of the value of the object registerInformations is null, return a message */
    if (
      registerInformations.name === "" ||
      registerInformations.description === "" ||
      registerInformations.sport === "" ||
      registerInformations.trainer === ""
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

    fetch(`${VITE_BACKEND_URL}/api/club`, requestOptions)
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
          navigate("/home");
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
              type="nomDuClub"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={name}
              onChange={handleChangeName}
              placeholder="Nom du club"
            />
            <label
              htmlFor="floating_standard"
              className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <br />
            </label>
          </div>
          <div className="flex flex-col justify-center w-9/12 md:w-1/3">
            <textarea
              type="textarea"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={description}
              onChange={handleChangeDescription}
              placeholder="Description du club"
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
              type="sport"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={sport}
              onChange={handleChangeSport}
              placeholder="Sport ou activité pratiqué(e)"
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
              type="trainer"
              id="floating_standard"
              className="block text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={trainer}
              onChange={handleChangeTrainer}
              placeholder="Nom du coach / reponsable du club"
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
            Créer mon club
          </button>
        </form>
      </div>
    </>
  );
}
export default CreationClub;
