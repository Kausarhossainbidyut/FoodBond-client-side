import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";

const Card1 = () => {
  return (



    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-md relative p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="absolute top-2 right-2 bg-green-300 text-green-700 text-sm px-2 py-2 rounded-full">
          Qty: 30
        </span>
        <span className="absolute top-1 left-1 bg-orange-800 text-white text-sm px-2 py-2 rounded-[15px]">
          available
        </span>
        <img
          src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
          alt="Canned Goods"
          className="w-full h-[200px] bg-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-semibold mb-1">Canned Goods Assortment</h2>
        <div className="flex">
          <img
            src="https://i.ibb.co/vC1Y0pv8/503000915-1434993311149206-7079839493590208667-n.jpg"
            alt="KH.Bidyut"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div >
            <div className="text-[16px] font-bold text-gray-700 mb-1">Frank Black</div>
            <div className="text-sm text-gray-700 flex items-center mb-1"><IoLocationOutline size={15} /> <span>Dhaka</span></div>
          </div>
        </div>


        <div className="text-sm flex items-center text-gray-700 mb-2"><CiClock1 size={19} />  <span className="pl-1">Expires: 1/1/2026</span></div>
        <p className="text-sm text-gray-600 mb-4">
          Various canned vegetables, fruits, and soups. Long shelf life.
        </p>
        <button className="bg-green-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
          View Details
        </button>
      </div>




    </div>
  );
};

export default Card1;
