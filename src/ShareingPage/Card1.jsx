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

  const fallbackFoodImage = "/images/fallback-food.jpg"; // public/images এ fallback রাখুন
  const fallbackDonorImage = "/images/fallback-donor.jpg";

  const [loaded, setLoaded] = useState(false); // image লোড স্টেট

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md relative p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Quantity */}
        <span className="absolute top-2 right-2 bg-green-300 text-green-700 text-sm px-2 py-1 rounded-full">
          Qty: {quantity || 0}
        </span>

        {/* Status */}
        <span className="absolute top-1 left-1 bg-orange-800 text-white text-sm px-2 py-1 rounded-[15px]">
          {status || "Pending"}
        </span>

        {/* Food Image with Blur */}
        <div className="w-full h-[200px] mb-4 overflow-hidden rounded-lg">
          <img
            src={foodImage || fallbackFoodImage}
            alt={foodName || "Food"}
            onLoad={() => setLoaded(true)}
            onError={(e) => (e.target.src = fallbackFoodImage)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              loaded ? "blur-0" : "blur-xl"
            }`}
          />
        </div>

        {/* Food Name */}
        <h2 className="text-lg font-semibold mb-1">{foodName || "Unknown Food"}</h2>

        {/* Donor Info */}
        <div className="flex items-center mb-2">
          <img
            src={donorImage || fallbackDonorImage}
            alt={donorName || "Donor"}
            onError={(e) => (e.target.src = fallbackDonorImage)}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <div className="text-[16px] font-bold text-gray-700 mb-1">
              {donorName || "Anonymous"}
            </div>
            <div className="text-sm text-gray-700 flex items-center">
              <IoLocationOutline size={15} />
              <span className="pl-1">{location || "Unknown Location"}</span>
            </div>
          </div>
        </div>

        {/* Expiration Date */}
        <div className="text-sm flex items-center text-gray-700 mb-2">
          <CiClock1 size={19} />
          <span className="pl-1">Expires: {expirationDate || "N/A"}</span>
        </div>

        {/* Notes */}
        <p className="text-sm text-gray-600 mb-4">{notes || "No additional notes."}</p>

        {/* View Details Button */}
        <Link to={`/food-details/${_id}`}>
          <button className="bg-green-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card1;
