import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";
import AvailableFood from "../pages/AvailableFood";
import ManageMyFood from "../pages/ManageMyFood";
import MyFoodRequest from "../pages/MyFoodRequest";
import FoodDetails from "../ShareingPage/FoodDetails";
import axios from "axios";
import EditData from "../ShareingPage/EditData";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-food",
        element: <AvailableFood></AvailableFood>,
      },
      {
        path: "/manage-my-food",
        element: <ManageMyFood></ManageMyFood>,
      },
      {
        path: "/my-food-request",
        element: <MyFoodRequest></MyFoodRequest> ,
      },
      {
        path: "/add-food",
        element: <AddFood></AddFood>,
      },
      {
        path: "/edit",
        element: <EditData></EditData>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Register></Register>,
      },
      {
        path: '/food-details/:foodId',
        element: <FoodDetails></FoodDetails>,
        loader: async({params})=>{
        const {data} = await axios.get(`https://mission-scic-assignment.vercel.app/
food-details/${params.foodId}`)
        return data;
        }
      },
    ],
  },
]);

export default mainRoutes;
