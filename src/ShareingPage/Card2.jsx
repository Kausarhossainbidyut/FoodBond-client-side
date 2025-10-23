import React from 'react';
import { FaEdit, FaTrash, FaBox, FaCalendar, FaMapMarker, FaUser } from 'react-icons/fa';
import { Link } from "react-router";

const Card2 = ({ food = {}, handleDelete }) => {
    const {
        _id,
        foodName,
        foodImage,
        quantity,
        expirationDate,
        status,
        location,
        requestedBy
    } = food;

    // Determine status color and text
    const quantityNum = parseInt(quantity) || 0;
    const statusColor = quantityNum === 0 ? 'text-red-600' : status === 'available' ? 'text-green-600' : 'text-orange-500';
    const statusBadge = quantityNum === 0 ? 'bg-red-100' : status === 'available' ? 'bg-green-100' : 'bg-orange-100';
    const displayStatus = quantityNum === 0 ? 'Out of Stock' : status;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
            {/* Status Badge */}
            <div className={`absolute top-2 right-2 ${statusBadge} px-2 py-1 rounded-full z-10 transition-all duration-300`}>
                <span className={`text-xs ${statusColor} capitalize font-medium`}>{displayStatus}</span>
            </div>
            
            <div className="h-36">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-3">
                <h2 className="text-base font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-green-600">{foodName}</h2>
                
                <div className="space-y-1.5 mb-3">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaBox className="text-green-600" />
                        Quantity: <span className={`font-medium ${
                            quantityNum === 0 ? 'text-red-600' :
                            quantityNum <= 3 ? 'text-orange-500' :
                            'text-green-600'
                        }`}>{quantity} portion(s)</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaCalendar className="text-green-600" />
                        Expires: <span className="font-medium">{expirationDate}</span>
                    </p>
                    {location && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FaMapMarker className="text-green-600" />
                            <span className="font-medium">{location}</span>
                        </p>
                    )}
                    {requestedBy && status === 'requested' && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FaUser className="text-green-600" />
                            Requested by: <span className="font-medium">{requestedBy}</span>
                        </p>
                    )}
                </div>
                
                <div className="flex gap-1.5">
                    <Link to={`/edit-food/${_id}`} className="flex-1">
                        <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white text-xs w-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                            <FaEdit className="w-3 h-3" /> Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white text-xs flex-1 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    >
                        <FaTrash className="w-3 h-3" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card2;