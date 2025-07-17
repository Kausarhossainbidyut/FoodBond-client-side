import React from "react";

const Card1 = () => {
  return (



    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ">
      {/* Card 1 */}
      <div className="bg-white rounded-xl shadow-md relative p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="absolute top-3 right-3 bg-green-300 text-green-700 text-sm px-2 py-2 rounded-full">
          Qty: 30
        </span>
        <img
          src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
          alt="Canned Goods"
          className="w-full h-[200px] bg-cover rounded-lg mb-4"
        />
        <h2 className="text-lg font-semibold mb-1">Canned Goods Assortment</h2>
        <div className="text-sm text-gray-700 mb-1">👤 Frank Black</div>
        <div className="text-sm text-gray-700 mb-1">📍 City Food Bank</div>
        <div className="text-sm text-gray-700 mb-2">⏰ Expires: 1/1/2026</div>
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
