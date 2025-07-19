import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card3 from "../ShareingPage/Card3";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyFoodRequest = () => {
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/my-food-request", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleCancelRequest = (id) => {
    axios
      .patch(
        `http://localhost:5000/cancel-request/${id}`,
        { userNotes: "" }, // চাইলে নোট পাঠাতে পারো
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
          // Remove canceled food from UI list
          setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Could not cancel your request.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          My Food Requests
        </h1>
        <p className="text-gray-600 mb-6">
          Track the status of food you've requested from the community.
        </p>
        <div>
          {foods.map((food) => (
            <Card3 key={food._id} food={food} handleRequest={handleCancelRequest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFoodRequest;
