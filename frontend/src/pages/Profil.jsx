import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import PreviousButton from "../components/PreviousButton";
import { useCurrentUserContext } from "../contexts/userContext";
import SettingsParameters from "./SettingsParameters";

const { VITE_BACKEND_URL } = import.meta.env;

function Profil() {
  const { currentUser, setCurrentUser, token } = useCurrentUserContext();

  const navigate = useNavigate();

  const [userValues, setUserValues] = useState({
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserValues({
      ...userValues,
      [name]: value,
    });
  };

  const handleOnClickValue = (e) => {
    const { name } = e.target;
    setUserValues({
      ...userValues,
      [name]: "",
    });
  };

  // Submit usersInformations
  const submitSettingModify = (e) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const userraw = JSON.stringify({
      firstname: userValues.firstname,
      lastname: userValues.lastname,
      email: userValues.email,
      currentUser_id: currentUser.id,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: userraw,
      redirect: "follow",
    };

    e.preventDefault();
    toast
      .promise(
        fetch(`${VITE_BACKEND_URL}/api/user/${currentUser.id}`, requestOptions),
        {
          loading: "En cours de modification ...",
          success: `Votre profil est mis à jour  ${userValues.firstname} 😁 `,
          error: "Attention aux erreurs ! ",
        }
      )
      // toaster management
      .then((response) => {
        response.text();
        if (response.status === 204) {
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      })

      // user realtime update
      .then(
        setCurrentUser({
          ...currentUser,
          firstname: userValues.firstname,
          lastname: userValues.lastname,
          email: userValues.email,
        })
      );
  };
  return (
    <div className=" relative flex flex-col my-6">
      <Toaster position="top-center" reverseOrder />
      <div className="pb-10">
        <PreviousButton />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={submitSettingModify} className="md:p-8 py-8 md:mx-8">
        <ul className="p-8 md:mx-[10vw] ">
          <h1 className="flex justify-center items-center font-bold text-xl md:text-2xl text-mainBlue my-3 h-10 text-center md:h-14 md:text-center ">
            Modifier mes informations
          </h1>

          <SettingsParameters
            text="Prénom"
            textValue="firstname"
            userVal={userValues.firstname}
            handleOnClickValue={handleOnClickValue}
            handleInputChange={handleInputChange}
          />

          <SettingsParameters
            text="Nom"
            textValue="lastname"
            userVal={userValues.lastname}
            handleOnClickValue={handleOnClickValue}
            handleInputChange={handleInputChange}
          />

          <SettingsParameters
            text="email"
            textValue="email"
            userVal={userValues.email}
            handleOnClickValue={handleOnClickValue}
            handleInputChange={handleInputChange}
          />
        </ul>
        <div className="w-full flex justify-center items-center relative">
          <button
            type="submit"
            className="bg-white from-main-yellow to-second-yellow text-mainBlue font-semibold m-3 py-1 px-4 rounded-lg shadow md:h-10 md:w-44 md:text-lg hover:shadow  hover:bg-mainBlue hover:text-white"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profil;
