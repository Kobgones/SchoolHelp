import { useContext } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/error.json";
import CurrentUserContext from "../contexts/userContext";

function Error() {
  const { currentUser } = useContext(CurrentUserContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="d-flex justify-center w-100">
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
      <div>
        {currentUser.id && (
          <button
            type="button"
            className="text-white mt-10 md:mt-0 bg-mainBlue hover:bg-mainBlue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-mainBlue dark:hover:bg-mainBlue focus:outline-none dark:focus:ring-mainBlue"
          >
            <span>
              <Link to="/home"> Retour à l'accueil</Link>
            </span>
          </button>
        )}
        {!currentUser.id && (
          <button
            type="button"
            className="text-white mt-10 md:mt-0 bg-mainBlue hover:bg-mainBlue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-mainBlue dark:hover:bg-mainBlue focus:outline-none dark:focus:ring-mainBlue"
          >
            <span>
              <Link to="/"> Retour à l'accueil</Link>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Error;
