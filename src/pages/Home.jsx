import { Link } from "react-router";
import Banner from "../components/Banner";
import Card1 from "../ShareingPage/Card1";
import CommunityVoices from "../ShareingPage/CommunityVoices";
import HowItWorks from "../ShareingPage/HowWorkCard";
import JoinMission from "../ShareingPage/JoinMission";
import Footer from "./Footer";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import SalesPromotion from "../ShareingPage/SalesPromotion";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/featured-foods")
      .then(res => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }

  return (
    <>
      <Product />
      {/* <Banner /> */}
      <div className="bg-[#ecd5d580] py-[40px] px-4">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Featured Foods</h1>
          <p className="text-center text-gray-600 mb-10">
            Freshly added and abundant meals waiting for you.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foods.map(food => <Card1 food={food} key={food._id} />)}
          </div>
          <div className="mt-10 text-center">
            <Link
              to={'/available-food'}
              className="cursor-pointer text-white px-6 py-3 rounded-lg bg-[#ad2d2b] hover:bg-[#D32F2F] transition"
            >
              Show All Foods
            </Link>
          </div>
        </div>
      </div>

      <HowItWorks />
      <SalesPromotion />
      <CommunityVoices />
      <JoinMission />
    </>
  );
};

export default Home;
