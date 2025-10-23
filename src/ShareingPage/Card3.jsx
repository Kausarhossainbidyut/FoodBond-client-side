import React from 'react';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaUser,
    FaClock,
    FaTrash,
    FaBox
} from 'react-icons/fa';

const Card3 = ({ food = {}, handleRequest }) => {


    const { 
        _id,
        foodName,
        foodImage,
        expirationDate,
        location,
        donorName,
        status,
        requestDate,
        requestedQuantity
    } = food;

    // Format request date
    const formattedRequestDate = requestDate 
        ? new Date(requestDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
          })
        : 'N/A';

    return (
        <>
            {/* === Card === */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 mb-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-all duration-300 transform hover:scale-[1.02] border border-gray-200">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full sm:w-48 h-48 md:h-40 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300 hover:text-green-600">
                        {foodName}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                        <FaUser className="text-green-600" />
                        <span className="font-medium">Donated by:</span> <span className="text-gray-600 font-semibold">{donorName}</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 mb-4">
                        <p className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg transition-all duration-300 hover:bg-green-100">
                            <FaMapMarkerAlt className="text-green-600" />
                            <span className="font-medium">{location}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg transition-all duration-300 hover:bg-green-100">
                            <FaCalendarAlt className="text-green-600" />
                            Expires: <span className="font-medium">{expirationDate}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg transition-all duration-300 hover:bg-green-100">
                            <FaClock className="text-green-600" />
                            Requested: <span className="font-medium">{formattedRequestDate}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm bg-green-50 p-2 rounded-lg transition-all duration-300 hover:bg-green-100">
                            <FaBox className="text-green-600" />
                            Requested: <span className="font-bold text-green-600">{requestedQuantity} portion(s)</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <FaUser className="text-green-600" />
                        <span className="text-sm font-medium">Status:</span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                            status === 'pending' ? 'bg-orange-100 text-orange-700' :
                            status === 'accepted' ? 'bg-green-100 text-green-700' :
                            status === 'rejected' ? 'bg-red-100 text-red-700' :
                            status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                            {status === 'pending' ? 'Pending' :
                             status === 'accepted' ? 'Accepted' :
                             status === 'rejected' ? 'Rejected' :
                             status === 'completed' ? 'Completed' : status}
                        </span>
                    </div>
                    <button
                        onClick={() => handleRequest(food._id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                        <FaTrash className="w-4 h-4" /> Cancel Request
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card3;