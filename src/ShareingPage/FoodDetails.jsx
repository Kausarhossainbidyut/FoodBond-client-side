import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useRequestFood } from '../hooks/useFoods';
import { FaUtensils, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

const FoodDetails = () => {
  const data = useLoaderData();
  const {
    _id,
    foodName,
    foodImage,
    quantity,
    expirationDate,
    location,
    notes,
    donorEmail,
    donorName,
  } = data;

  const { user } = useContext(AuthContext);
  const requestFood = useRequestFood();

  const [userNote, setUserNote] = useState(notes || '');
  const [requestedQuantity, setRequestedQuantity] = useState(1);

  const handleRequest = () => {
    if (donorEmail === user?.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Request',
        text: 'You cannot request your own food!',
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'OK'
      });
      return;
    }

    const availableQty = parseInt(quantity);
    const requestQty = parseInt(requestedQuantity);

    if (requestQty <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Quantity',
        text: 'Please enter a valid quantity (greater than 0)',
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (requestQty > availableQty) {
      Swal.fire({
        icon: 'warning',
        title: 'Insufficient Quantity',
        text: `Only ${availableQty} portion(s) available. You requested ${requestQty} portion(s).`,
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (availableQty === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Available',
        text: 'This food is currently out of stock!',
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'OK'
      });
      return;
    }

    requestFood.mutate(
      { id: _id, userNotes: userNote, requestedQuantity: requestQty, token: user.accessToken },
      {
        onSuccess: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Request Sent!',
            text: response.message || `Successfully requested ${requestQty} portion(s)!`,
            confirmButtonColor: '#16a34a',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        },
        onError: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Request Failed',
            text: error.response?.data?.error || 'Failed to send request. Please try again.',
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to={'/available-food'}
          className="text-[24px] font-bold text-gray-500 flex items-center gap-1 mb-4 hover:text-green-600 transition-all duration-300"
        >
          <FaArrowLeft className="text-4xl" />Back to Available Foods
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl">
          <div className="md:w-1/2">
            <img
              src={foodImage}
              alt="foodImage"
              className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-green-600">
                {foodName}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Donor Name: <span className="font-semibold text-green-600">{donorName}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Donor Email: <span className="font-semibold text-green-600">{donorEmail}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                User Email: <span className="font-semibold text-green-600">{user?.email}</span>
              </p>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-green-600" />
                  <span className="font-medium">Available Quantity:</span> 
                  <span className={`font-bold ${parseInt(quantity) === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {quantity} portion(s)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span className="font-medium">Pickup Location:</span> {location}
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />
                  <span className="font-medium">Expires:</span> {expirationDate}
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-medium text-gray-700 mb-2">
                  How many portions do you need?
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRequestedQuantity(Math.max(1, requestedQuantity - 1))}
                    className="bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    type="button"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={quantity}
                    value={requestedQuantity}
                    onChange={(e) => setRequestedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input w-20 border border-green-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  />
                  <button
                    onClick={() => setRequestedQuantity(Math.min(parseInt(quantity), requestedQuantity + 1))}
                    className="bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    type="button"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">
                    (Max: {quantity})
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </h2>
                <textarea
                  className="textarea w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Write your own note (optional)..."
                />
              </div>
            </div>

            <button
              onClick={handleRequest}
              disabled={parseInt(quantity) === 0}
              className={`mt-6 font-medium py-3 px-6 rounded-lg w-full md:w-auto transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg ${
                parseInt(quantity) === 0
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {parseInt(quantity) === 0 ? 'Out of Stock' : `Request ${requestedQuantity} Portion(s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;