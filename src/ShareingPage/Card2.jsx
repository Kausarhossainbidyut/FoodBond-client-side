import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Card2 = () => {
    return (
        <div>
            <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
                    <img
                        src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
                        alt="Good food"
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Grilled Chicken</h2>
                        <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Available</span></p>
                        <p className="text-sm text-gray-600">Quantity: 2</p>
                        <p className="text-sm text-gray-600 mb-4">Expires: July 29, 2025</p>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
                                <FaEdit className="w-4 h-4" /> Edit
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition">
                                <FaTrash className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
                {/* Food Card 1 */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
                    <img
                        src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
                        alt="Good food"
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Grilled Chicken</h2>
                        <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Available</span></p>
                        <p className="text-sm text-gray-600">Quantity: 2</p>
                        <p className="text-sm text-gray-600 mb-4">Expires: July 29, 2025</p>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
                                <FaEdit className="w-4 h-4" /> Edit
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition">
                                <FaTrash className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
                {/* Food Card 1 */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
                    <img
                        src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
                        alt="Good food"
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Grilled Chicken</h2>
                        <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-medium">Available</span></p>
                        <p className="text-sm text-gray-600">Quantity: 2</p>
                        <p className="text-sm text-gray-600 mb-4">Expires: July 29, 2025</p>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
                                <FaEdit className="w-4 h-4" /> Edit
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition">
                                <FaTrash className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Food Card 1 */}

        </div>
    );
};

export default Card2;