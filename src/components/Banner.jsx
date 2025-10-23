import animation from "../assets/cooking.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <section className="bg-contain bg-fixed">
      <div
        id="banner"
        className="flex min-h-screen bg-white bg-opacity-95 flex-col-reverse md:flex-row items-center justify-around"
      >
        <div className="text space-y-4 text-center md:text-start animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Share Surplus Food, <span className="text-green-600">Reduce Waste</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Join our community in fighting food waste by sharing excess food with those in need. 
            Make a difference one meal at a time.
          </p>
          <div className="buttons flex gap-3 justify-center md:justify-start">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Join Now
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              See How It Works
            </button>
          </div>
        </div>
        <div className="max-w-[400px] animate-fade-in-up">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;