import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { Link } from "react-router";

const Card1 = ({ food = {} }) => {
  const {
    _id,
    foodName,
    foodImage,
    quantity,
    expirationDate,
    location,
    notes,
    donorName,
    donorImage,
    status,
  } = food;

  const fallbackFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"; 
  const fallbackDonorImage = "https://ui-avatars.com/api/?name=User&background=random";

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-white border border-gray-300 rounded overflow-hidden">
      {/* Food Image */}
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img
          src={foodImage || fallbackFoodImage}
          alt={foodName || "Food"}
          onLoad={() => setLoaded(true)}
          onError={(e) => (e.target.src = fallbackFoodImage)}
          className={`w-full h-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Card Content */}
      <div className="p-3">
        {/* Badges */}
        <div className="flex justify-between items-start mb-2">
          <span className={`text-white text-xs font-medium px-2 py-1 rounded ${
            parseInt(quantity) === 0 ? 'bg-gray-500' :
            status === 'available' ? 'bg-gray-700' : 'bg-gray-600'
          }`}>
            {parseInt(quantity) === 0 ? 'Unavailable' : 'Available'}
          </span>
          
          <span className={`text-white text-xs font-medium px-2 py-1 rounded ${
            parseInt(quantity) === 0 ? 'bg-gray-500' : 
            parseInt(quantity) <= 3 ? 'bg-gray-600' : 
            'bg-gray-700'
          }`}>
            {quantity || 0} left
          </span>
        </div>

        {/* Food Name */}
        <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-1">
          {foodName || "Unknown Food"}
        </h3>

        {/* Donor Info */}
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
          <img
            src={donorImage || fallbackDonorImage}
            alt={donorName || "Donor"}
            onError={(e) => (e.target.src = fallbackDonorImage)}
            className="w-7 h-7 rounded-full object-cover border border-gray-300"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 truncate">
              {donorName || "Anonymous"}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <IoLocationOutline size={12} className="mr-1" />
              <span className="truncate">{location || "Unknown"}</span>
            </div>
          </div>
        </div>

        {/* Expiration Date */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <CiClock1 size={14} className="mr-1" />
          <span>Expires: {expirationDate || "N/A"}</span>
        </div>

        {/* View Details Button */}
        <Link to={`/food-details/${_id}`}>
          <button 
            disabled={parseInt(quantity) === 0}
            className={`w-full py-1.5 rounded text-sm ${
              parseInt(quantity) === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-900 text-white'
            }`}
          >
            {parseInt(quantity) === 0 ? 'Out of Stock' : 'View Details'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card1;