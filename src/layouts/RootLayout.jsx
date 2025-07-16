import { Outlet } from "react-router";
import Header from "../components/Header";
import Navbar from "../pages/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className=" mx-auto ">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
