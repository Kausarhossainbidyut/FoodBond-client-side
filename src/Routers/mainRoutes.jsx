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
import MyReceivedRequests from "../pages/MyReceivedRequests";
import FoodDetails from "../ShareingPage/FoodDetails";
import axios from "axios";
import EditData from "../ShareingPage/EditData";
import EditFood from "../pages/EditFood";
import PrivateRoute from "./PrivateRoute";
import Notifications from "../pages/Notifications";
import Analytics from "../pages/Analytics";
import ConnectionTest from "../pages/ConnectionTest";
import DebugAnalytics from "../pages/DebugAnalytics";
import Dashboard from "../pages/Dashboard";
import DashboardHome from "../pages/DashboardHome";
import Profile from "../pages/Profile";
import { API_URL } from "../config/api";

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
        path: "/notifications",
        element: <PrivateRoute><Notifications /></PrivateRoute>,
      },
      {
        path: "/analytics",
        element: <PrivateRoute><Analytics /></PrivateRoute>,
      },
      {
        path: "/connection-test",
        element: <ConnectionTest />,
      },
      {
        path: "/debug-analytics",
        element: <DebugAnalytics />,
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
        path: "/edit-food/:foodId",
        element: <PrivateRoute><EditFood /></PrivateRoute>,
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
        const {data} = await axios.get(`${API_URL}/food-details/${params.foodId}`)
        return data;
        }
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "add-food",
        element: <AddFood />
      },
      {
        path: "manage-foods",
        element: <ManageMyFood />
      },
      {
        path: "my-requests",
        element: <MyFoodRequest />
      },
      {
        path: "received-requests",
        element: <MyReceivedRequests />
      },
      {
        path: "notifications",
        element: <Notifications />
      },
      {
        path: "analytics",
        element: <Analytics />
      },
      {
        path: "profile",
        element: <Profile />
      },
    ]
  },
]);

export default mainRoutes;