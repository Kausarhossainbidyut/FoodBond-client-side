import React from 'react';
import Card3 from '../ShareingPage/Card3';


const MyFoodRequest = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    My Food Requests
                </h1>
                <p className=" text-gray-600 mb-6">
                    Track the status of food you've requested from the community.
                </p>
                <Card3></Card3>
            </div>
        </div>
    );
};

export default MyFoodRequest;
