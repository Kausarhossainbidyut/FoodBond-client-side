import React from 'react';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUser,
    FaClock,
    FaTrash,
} from 'react-icons/fa';

const Card3 = () => {
    return (
        <div>
            {/* === Card 1 === */}
            <div className="bg-[#dbd0d06a] rounded-2xl shadow-lg p-5 mb-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <img
                    src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
                    alt="Canned Goods Assortment"
                    className="w-full sm:w-48 h-48 md:h-36 object-cover rounded-xl shadow-sm"
                />
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Canned Goods Assortment
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                        <FaUser className="text-gray-500" />
                        Donated by Frank Black
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                        <p className="flex items-center gap-2 text-sm">
                            <FaMapMarkerAlt className="text-green-600" />
                            City Food Bank
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <FaCalendarAlt className="text-green-600" />
                            Expires: 1/1/2026
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <FaClock className="text-green-600" />
                            Requested: 7/17/2025
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <FaUser className="text-green-600" />
                            Status: <span className="font-semibold text-black ml-1">Pending</span>
                        </p>
                    </div>
                    <button className="flex mt-3 items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition">
                        <FaTrash className="w-4 h-4" /> Cancel Request
                    </button>
                </div>
            </div>

            
        </div>

    );
};

export default Card3;