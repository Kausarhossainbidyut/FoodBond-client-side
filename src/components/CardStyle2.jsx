import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { Link } from "react-router";

const CardStyle2 = ({ food = {} }) => {
  const {
    _id,
    foodName,
    foodImage,
    quantity,
    expirationDate,
    location,
    donorName,
    donorImage,
    status,
  } = food;

  const fallbackFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"; 
  const fallbackDonorImage = "https://ui-avatars.com/api/?name=User&background=random";

  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Parse quantity as integer
  const quantityNum = parseInt(quantity) || 0;
  const isAvailable = status === 'available' && quantityNum > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        {/* Food Image */}
        <div className="h-48 md:h-auto md:w-2/5 bg-gray-100 overflow-hidden relative">
          {!imageError ? (
            <img
              src={foodImage || fallbackFoodImage}
              alt={foodName || "Food"}
              onLoad={() => setLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CiClock1 className="text-gray-500 text-xl" />
                </div>
                <p className="text-gray-500 text-sm">No image</p>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 md:w-3/5 flex flex-col">
          {/* Food Name */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">
            {foodName || "Unknown Food"}
          </h3>

          {/* Donor Info */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={donorImage || fallbackDonorImage}
              alt={donorName || "Donor"}
              onError={(e) => (e.target.src = fallbackDonorImage)}
              className="w-10 h-10 rounded-full object-cover border-2 border-green-100 transition-transform duration-300 hover:scale-110"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {donorName || "Anonymous"}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
            <div className="text-xs">
              <p className="text-gray-500 mb-1">Location</p>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <IoLocationOutline size={12} className="text-gray-500 flex-shrink-0" />
                <span className="truncate">{location || "Unknown"}</span>
              </p>
            </div>
            <div className="text-xs">
              <p className="text-gray-500 mb-1">Expires</p>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <CiClock1 size={12} className="text-gray-500 flex-shrink-0" />
                <span>{expirationDate || "N/A"}</span>
              </p>
            </div>
            <div className="text-xs">
              <p className="text-gray-500 mb-1">Quantity</p>
              <p className="font-medium text-gray-800 flex items-center gap-1">
                <FaBox size={12} className="text-gray-500 flex-shrink-0" />
                <span>{quantityNum} portions</span>
              </p>
            </div>
            <div className="text-xs">
              <p className="text-gray-500 mb-1">Status</p>
              <p className={`font-medium flex items-center gap-1 ${
                isAvailable 
                  ? quantityNum <= 3 
                    ? 'text-orange-600' 
                    : 'text-green-600'
                  : 'text-gray-500'
              }`}>
                <span className={`w-2 h-2 rounded-full inline-block transition-all duration-300 ${
                  isAvailable 
                    ? quantityNum <= 3 
                      ? 'bg-orange-500' 
                      : 'bg-green-500'
                    : 'bg-gray-400'
                }`}></span>
                <span>
                  {isAvailable 
                    ? quantityNum <= 3 
                      ? 'Low Stock' 
                      : 'Available'
                    : 'Unavailable'
                  }
                </span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <Link to={`/food-details/${_id}`} className="block">
              <button 
                disabled={!isAvailable}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                  isAvailable
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {!isAvailable ? 'Out of Stock' : 'View Details'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStyle2;