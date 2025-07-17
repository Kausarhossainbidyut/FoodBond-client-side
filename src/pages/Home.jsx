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
      {/* <Banner></Banner> */}
      <Product></Product>
      <Card1></Card1>
      <HowItWorks></HowItWorks>
      <CommunityVoices></CommunityVoices>
      <JoinMission></JoinMission>
      <Footer></Footer>
    </>
  );
};

export default Home;
