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
import PrivateRoute from "./PrivateRoute";

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
        element: <PrivateRoute><ManageMyFood></ManageMyFood></PrivateRoute>,
      },
      {
        path: "/my-food-request",
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute> ,
      },
      {
        path: "/add-food",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: "/edit",
        element: <PrivateRoute><EditData></EditData></PrivateRoute>,
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
        element: <PrivateRoute><FoodDetails></FoodDetails></PrivateRoute>,
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
