import { Link } from "react-router";
import Banner from "../components/Banner";
import Card1 from "../ShareingPage/Card1";
import HowItWorks from "../ShareingPage/HowWorkCard";
import Footer from "./Footer";
import Product from "./Product";
import { useFeaturedFoods } from '../hooks/useFoods';
import LoadingSpinner from '../components/LoadingSpinner';
import Statistics from '../components/Statistics';
import WhyChooseUs from '../components/WhyChooseUs';
import LiveStats from '../components/LiveStats';
import ImpactMap from '../components/ImpactMap';
import CommunityEngagement from '../components/CommunityEngagement';

const Home = () => {
  const { data: foods = [], isLoading } = useFeaturedFoods();

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading featured foods..." />;
  }

  return (
    <>
      <Product />
      {/* Featured Foods Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 text-green-600 animate-fade-in">
            Available Food Near You
          </h1>
          <p className="text-center text-gray-600 text-lg mb-12 animate-fade-in">
            Fresh meals shared by your neighbors
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foods.map(food => <Card1 food={food} key={food._id} />)}
          </div>
          <div className="mt-12 text-center animate-fade-in">
            <Link
              to={'/available-food'}
              className="inline-block text-white px-8 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Browse All Food
            </Link>
          </div>
        </div>
      </div>

      {/* Essential Food Sharing Sections */}
      <LiveStats />
      <HowItWorks />
      <ImpactMap />
      <CommunityEngagement />
      <Statistics />
      <WhyChooseUs />
    </>
  );
};

export default Home;