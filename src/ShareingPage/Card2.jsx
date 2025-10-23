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
    const statusColor = quantityNum === 0 ? 'text-gray-600' : status === 'available' ? 'text-gray-800' : 'text-gray-700';
    const statusBadge = quantityNum === 0 ? 'bg-gray-200' : status === 'available' ? 'bg-gray-300' : 'bg-gray-200';
    const displayStatus = quantityNum === 0 ? 'Out of Stock' : status;

    return (
        <div className="bg-white rounded border border-gray-300 overflow-hidden">
            {/* Status Badge */}
            <div className={`absolute top-2 right-2 ${statusBadge} px-2 py-1 rounded z-10`}>
                <span className={`text-xs ${statusColor} capitalize`}>{displayStatus}</span>
            </div>
            
            <div className="h-36">
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-3">
                <h2 className="text-base font-medium text-gray-800 mb-2">{foodName}</h2>
                
                <div className="space-y-1.5 mb-3">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaBox className="text-gray-600" />
                        Quantity: <span className={`font-medium ${
                            quantityNum === 0 ? 'text-gray-600' :
                            quantityNum <= 3 ? 'text-gray-700' :
                            'text-gray-800'
                        }`}>{quantity} portion(s)</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaCalendar className="text-gray-600" />
                        Expires: <span className="font-medium">{expirationDate}</span>
                    </p>
                    {location && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FaMapMarker className="text-gray-600" />
                            <span className="font-medium">{location}</span>
                        </p>
                    )}
                    {requestedBy && status === 'requested' && (
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FaUser className="text-gray-600" />
                            Requested by: <span className="font-medium">{requestedBy}</span>
                        </p>
                    )}
                </div>
                
                <div className="flex gap-1.5">
                    <Link to={`/edit-food/${_id}`} className="flex-1">
                        <button className="flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-gray-700 hover:bg-gray-800 text-white text-xs w-full">
                            <FaEdit className="w-3 h-3" /> Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="flex items-center justify-center gap-1 px-2 py-1.5 rounded bg-gray-600 hover:bg-gray-700 text-white text-xs flex-1"
                    >
                        <FaTrash className="w-3 h-3" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card2;