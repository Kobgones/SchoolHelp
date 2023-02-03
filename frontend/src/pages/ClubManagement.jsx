import React, { useEffect, useState, useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import CurrentUserContext from "../contexts/userContext";
import PreviousButton from "../components/PreviousButton";
import DeleteModal from "../components/DeleteModal";
import trash from "../assets/trash.svg";

const { VITE_BACKEND_URL } = import.meta.env;

function ClubManagement() {
  const notify = () => toast.success("Le club a bien été supprimé");

  const { token } = useContext(CurrentUserContext);

  /* Fetch all the clubs */
  const [clubs, setClubs] = useState([]);

  const [confirmDeleteModale, setConfirmDeleteModale] = useState(false);
  const [id, setId] = useState();

  const [search, setSearch] = useState("");
  const normalizeSearch = search
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f+.]/g, "");

  const filtredClubs = clubs?.filter((club) =>
    club.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(normalizeSearch)
  );

  const fetchClubs = () => {
    fetch(`${VITE_BACKEND_URL}/api/clubs`)
      .then((response) => response.json())
      .then((data) => setClubs(data));
  };
  useEffect(() => {
    fetchClubs();
  }, []);

  const handleDeleteTutorial = async () => {
    await fetch(`${VITE_BACKEND_URL}/api/clubmembers/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          fetch(`${VITE_BACKEND_URL}/api/members/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.text())
            .then((data2) => {
              if (data2.error) {
                toast.error(data.error);
              }
            });
        } else {
          toast.error(data.error);
        }
      });

    await fetch(`${VITE_BACKEND_URL}/api/club/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
      });

    setConfirmDeleteModale(false);
    fetchClubs();
    setTimeout(() => {
      notify();
    }, 500);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder />
      <div className="pb-2">
        <PreviousButton />
      </div>
      <h2 className="m-6 font-bold text-main-blue text-xl md:text-3xl  text-center ">
        {" "}
        Gestion des clubs
      </h2>
      <form className="w-full flex flex-col justify-center items-center ">
        <input
          type="text"
          id="tutoriels"
          name="tutoriels"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Recherchez un club"
          className=" border-gray-400 rounded-lg mb-5 p-4 w-4/6 md:w-2/6 h-10  bg-gray-200"
        />

        <section className="antialiased bg-gray-100 text-gray-600 w-screen px-4">
          <div className="flex flex-col justify-center bg-gray-200 py-3 w-full h-full">
            <div className="w-5/6  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-main-blue">Clubs</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Titre</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Gestion
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Sport</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {filtredClubs.length === 0 ? (
                        <th className="mx-0 text-1xl">
                          Aucun tutoriel n'a été trouvé
                        </th>
                      ) : (
                        filtredClubs?.map((club) => (
                          <tr key={club.id} className="hover:bg-gray-100">
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">
                                  {club.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="font-medium text-gray-800">
                                  {club.sport}
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-lg text-center">
                                {" "}
                                <button
                                  onClick={() => {
                                    setId(club.id);
                                    setConfirmDeleteModale(!false);
                                  }}
                                  type="button"
                                  className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                  <img src={trash} alt="trash for users" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DeleteModal
          handleDeleteTutorial={handleDeleteTutorial}
          setConfirmDeleteModale={setConfirmDeleteModale}
          confirmDeleteModale={confirmDeleteModale}
        />
      </form>
    </>
  );
}

export default ClubManagement;
