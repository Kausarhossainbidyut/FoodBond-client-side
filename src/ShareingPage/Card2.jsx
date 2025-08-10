import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router";

const Card2 = ({ food = {}, handleDelete }) => {
    const {
        _id,
        foodName,
        foodImage,
        quantity,
        expirationDate,
        status
    } = food;

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
            <img
                src={foodImage}
                alt="Good food"
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{foodName}</h2>
                <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">{status}</span></p>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="text-sm text-gray-600 mb-4">Expires: {expirationDate}</p>
                <div className="flex gap-2">
                    {/* <Link to={"/edit"}><button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
                        <FaEdit className="w-4 h-4" /> Edit
                    </button></Link> */}
                    <button
                        onClick={() => handleDelete(_id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition"
                    >
                        <FaTrash className="w-4 h-4" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card2;
