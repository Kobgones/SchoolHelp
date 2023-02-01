import Lottie from "react-lottie";
import animationData from "../assets/error.json";

function Error() {
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
      </div>
    </div>
  );
}

export default Error;
