import React from 'react';
import Card2 from '../ShareingPage/Card2';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const ManageFoods = () => {
    return (
        <div className="min-h-screen bg-gray-200 px-4 py-6">
            <div className="px-5 mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage My Foods</h1>
                    <Link to={'/add-food'}>
                        <button className="flex items-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm sm:text-base py-2 px-3 sm:px-4 rounded-lg transition">
                            <FaPlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Add New Food</span>
                        </button>
                    </Link>
                </div>

                {/* Subtitle */}
                <p className=" text-gray-600 mb-6">
                    View, edit, or delete your shared food items.
                </p>

                {/* Food Cards Grid */}
                <Card2 />
            </div>
        </div>
    );
};

export default ManageFoods;
