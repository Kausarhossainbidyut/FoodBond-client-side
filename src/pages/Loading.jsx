import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <h2 className="text-6xl text-green-600 font-bold mb-4">Loading</h2>
      <div className="max-w-[250px]">
        <Lottie animationData={loading}></Lottie>
      </div>
      <h2 className="text-6xl text-green-600">...........</h2>
    </div>
  );
};

export default Loading;