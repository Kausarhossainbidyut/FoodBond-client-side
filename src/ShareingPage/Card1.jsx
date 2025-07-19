import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { Link } from "react-router";

const Card1 = ({food={}}) => {
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

  } = food;
  

  return (



    <div >
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-md relative p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="absolute top-2 right-2 bg-green-300 text-green-700 text-sm px-2 py-2 rounded-full">
          Qty: {quantity}
        </span>
        <span className="absolute top-1 left-1 bg-orange-800 text-white text-sm px-2 py-2 rounded-[15px]">
          {status}
        </span>
        <img
          src={foodImage}
          alt="Canned Goods"
          className="w-full h-[200px] bg-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-semibold mb-1">{foodName}</h2>
        <div className="flex">
          <img
            src={donorImage}
            alt="donorImage"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div >
            <div className="text-[16px] font-bold text-gray-700 mb-1">{donorName}</div>
            <div className="text-sm text-gray-700 flex items-center mb-1"><IoLocationOutline size={15} /> <span>{location}</span></div>
          </div>
        </div>


        <div className="text-sm flex items-center text-gray-700 mb-2"><CiClock1 size={19} />  <span className="pl-1">Expires: {expirationDate}</span></div>
        <p className="text-sm text-gray-600 mb-4">
         {notes}
        </p>
        <Link to={`/food-details/${food._id}`} >
          <button className="bg-green-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-green-700 transition">View Details</button>
        </Link>
      </div>




    </div>
  );
};

export default Card1;
