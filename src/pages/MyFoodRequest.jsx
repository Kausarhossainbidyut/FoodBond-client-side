import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card3 from "../ShareingPage/Card3";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyFoodRequest = () => {
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.accessToken) return;

    axios
      .get("https://mission-scic-assignment.vercel.app/my-food-request", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleCancelRequest = (id) => {
    axios
      .patch(
        `https://mission-scic-assignment.vercel.app/cancel-request/${id}`,
        { userNotes: "" },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
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
        
        {foods.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No food requests found. <br />
            <Link to={"/available-food"} className="text-green-600 font-semibold">Make a request now!</Link >
          </div>
        ) : (
          <div>
            {foods.map((food) => (
              <Card3 key={food._id} food={food} handleRequest={handleCancelRequest} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequest;
