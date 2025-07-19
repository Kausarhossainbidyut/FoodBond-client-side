import React from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

const FoodDetails = () => {

  const { user } = useContext(AuthContext);

  const data = useLoaderData()
  const { foodName,
    foodImage,
    quantity,
    expirationDate,
    location,
    notes,
    donorEmail,
    donorName,
    donorImage,
    status

  } = data;


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link to={'/available-food'}
          className="text-[24px] font-bold text-gray-500 flex items-center gap-1 mb-4 hover:text-green-600 transition"
        >
          <span className='text-4xl'> ←</span>Back to Available Foods
        </Link>

        {/* Food Item */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition hover:shadow-xl">
          {/* Food Image */}
          <div className="md:w-1/2">
            <img
              src={foodImage}
              alt="foodImage"
              className="w-full h-[300px] md:h-[400px] bg-cover"
            />
          </div>

          {/* Content */}
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
                User Email: <span className="font-semibold text-green-700">{user?.displayName}</span>
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
                <p className="text-sm text-gray-600 leading-relaxed">
                  <textarea className="textarea" defaultValue={notes}  placeholder="Bio"></textarea>
                  
                </p>
              </div>
            </div>

            <button className="mt-6 bg-green-600 hover:bg-green-700 transition text-white font-medium py-2 px-4 rounded-lg w-full md:w-auto">
              Request Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
