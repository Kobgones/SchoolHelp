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
        <div className="md:grid h-full md:grid-cols-4 md:gap-2 flex flex-col justify-center items-center w-full">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="bg-white h-96 flex justify-center items-center border rounded-2xl shadow-lg m-3 p-3 flex-col hover:scale-110 hover:duration-100 hover:bg-[#c0c0c0]"
            >
              <h3 className="text-mainBlue pb-10 underline font-serif text-xl">
                {club.name}
              </h3>
              <h3 className="text-mainBlue pb-10">{club.sport}</h3>
              <img
                src={club.picture}
                alt={club.name}
                className="rounded-full flex justify-center items-center w-28 h-fit "
              />
              <h4 className="text-mainBlue pb-10">
                Coach / Responsable: <br />
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
