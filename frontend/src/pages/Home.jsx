import React, { useEffect, useState, useContext } from "react";

import CurrentUserContext from "../contexts/userContext";

const { VITE_BACKEND_URL } = import.meta.env;

function Home() {
  const { currentUser, token } = useContext(CurrentUserContext);

  // create states to stock the data from the backend
  const [clubs, setClubs] = useState([]);

  // fetch all my club data from the backend with a fetch request to /api/clubs
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const getClubs = () => {
      fetch(`${VITE_BACKEND_URL}/api/clubs`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setClubs(data);
          console.warn(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    getClubs();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-mainBlue font-bold text-xl py-4">
          Bonjour {currentUser.firstname} ! 😁
        </h1>
      </div>
      <div>
        <div className="md:grid md:grid-cols-2 md:grid-rows-3">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="flex flex-col box justify-center items-center border-2 shadow-md w-1/3 py-10 my-10 hover:scale-110 hover:duration-100"
            >
              <h3 className="text-mainBlue pb-10 underline">{club.name}</h3>
              <h3 className="text-mainBlue pb-10">{club.sport}</h3>
              <img src={club.picture} alt={club.name} />
              <h4 className="text-mainBlue pb-10">
                Coach / Responsable:{" "}
                <span className="font-bold">{club.trainer}</span>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
