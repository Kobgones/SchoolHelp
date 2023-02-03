import Lottie from "react-lottie";
import animationData from "../lotties/loader.json";

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="vw-screen flex justify-center items-center">
      <div className="d-flex justify-center w-100">
        <Lottie options={defaultOptions} height={600} width={600} />
        <div className="text-mainBlue font-bold text-xl w- md:text-3xl">
          {" "}
          <p className="text-center">Sport pour tous, clubs pour chacun !</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
