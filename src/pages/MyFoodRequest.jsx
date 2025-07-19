import React from 'react';
import Card3 from '../ShareingPage/Card3';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';


const MyFoodRequest = () => {

    const { user } = useContext(AuthContext)
    const [foods, setFoods] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:5000/my-food-request`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then(res => {
            setFoods(res.data)
        })
    }, [user])

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    My Food Requests
                </h1>
                <p className=" text-gray-600 mb-6">
                    Track the status of food you've requested from the community.
                </p>
                <div>
                    {
                        foods.map(food => <Card3 food={food} key={food._id}></Card3>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyFoodRequest;
