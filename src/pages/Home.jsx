import { Link } from "react-router";
import Banner from "../components/Banner";
import Card1 from "../ShareingPage/Card1";
import CommunityVoices from "../ShareingPage/CommunityVoices";
import HowItWorks from "../ShareingPage/HowWorkCard";
import JoinMission from "../ShareingPage/JoinMission";
import Footer from "./Footer";
import Product from "./Product";

const Home = () => {
  return (
    <>
      <Product></Product>
      {/* <Banner></Banner> */}
      <div className="bg-[#ecd5d580] py-[40px] ]  px-4">
        <div className=" mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Featured Foods</h1>
          <p className="text-center text-gray-600 mb-10">
            Freshly added and abundant meals waiting for you.
          </p>
          <Card1></Card1>
          <div className="mt-10 text-center">
            <Link to={'/available-food'} className=" cursor-pointer text-white px-6 py-3 rounded-lg bg-[#ad2d2b] hover:bg-[#D32F2F] transition">
              Show All Foods
            </Link>
          </div>
        </div>
      </div>


      <HowItWorks></HowItWorks>
      <CommunityVoices></CommunityVoices>
      <JoinMission></JoinMission>
    </>
  );
};

export default Home;
