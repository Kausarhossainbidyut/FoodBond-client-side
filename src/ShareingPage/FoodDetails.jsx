import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

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

  const [userNote, setUserNote] = useState(notes || '');

  const handleRequest = () => {
    axios
      .patch(
        `http://localhost:5000/
request/${_id}`,
        { userNotes: userNote }, 
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Request Sent!',
          text: 'Your food request has been successfully submitted.',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to={'/available-food'}
          className="text-[24px] font-bold text-gray-500 flex items-center gap-1 mb-4 hover:text-green-600 transition"
        >
          <span className="text-4xl">←</span>Back to Available Foods
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition hover:shadow-xl">
          <div className="md:w-1/2">
            <img
              src={foodImage}
              alt="foodImage"
              className="w-full h-[300px] md:h-[400px] bg-cover"
            />
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {foodName}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Donor Name: <span className="font-semibold text-green-700">{donorName}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Donor Email: <span className="font-semibold text-green-700">{donorEmail}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                User Email: <span className="font-semibold text-green-700">{user?.email}</span>
              </p>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  🥗 <span className="font-medium">Quantity:</span> {quantity}
                </div>
                <div className="flex items-center gap-2">
                  📍 <span className="font-medium">Pickup Location:</span> {location}
                </div>
                <div className="flex items-center gap-2">
                  ⏳ <span className="font-medium">Expires:</span> {expirationDate}
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </h2>
                <textarea
                  className="textarea w-full border rounded p-2"
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Write your own note (optional)..."
                />
              </div>
            </div>

            <button
              onClick={handleRequest}
              className="mt-6 bg-green-600 hover:bg-green-700 transition text-white font-medium py-2 px-4 rounded-lg w-full md:w-auto"
            >
              Request Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
