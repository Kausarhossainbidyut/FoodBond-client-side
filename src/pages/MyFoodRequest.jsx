import React, { useContext } from "react";
import Card3 from "../ShareingPage/Card3";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useMyFoodRequests, useCancelRequest } from '../hooks/useFoods';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaShoppingCart } from 'react-icons/fa';

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const { data: foods = [], isLoading } = useMyFoodRequests(user?.accessToken);
  const cancelRequest = useCancelRequest();

  const handleCancelRequest = (id) => {
    Swal.fire({
      title: 'Cancel Request?',
      text: "This will make the food available again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelRequest.mutate(
          { id, userNotes: "", token: user.accessToken },
          {
            onSuccess: () => {
              Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
            },
            onError: (err) => {
              console.error(err);
              Swal.fire("Error!", "Could not cancel your request.", "error");
            }
          }
        );
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading your requests..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-3 transition-colors duration-300 hover:text-green-600">
            🛍️ My Food Requests
          </h1>
          <p className="text-gray-600 text-lg">
            Track the status of food you've requested from the community
          </p>
        </div>
        
        {foods.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center transition-all duration-300 hover:shadow-2xl">
            <div className="mb-6">
              <div className="inline-block p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                <FaShoppingCart className="text-green-600 text-6xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No requests yet</h2>
            <p className="text-gray-600 text-lg mb-6">
              Start browsing available food items to make your first request!
            </p>
            <Link to="/available-food">
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-8 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                🔍 Browse Available Food
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
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