import { Outlet } from "react-router";
import Header from "../components/Header";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className=" min-h-screen mx-auto ">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
