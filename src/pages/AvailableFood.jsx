import React, { useState } from 'react';
import Card1 from '../ShareingPage/Card1';
import { FaSearch } from 'react-icons/fa';
import { useEffect } from 'react';
import axios from 'axios';

const AvailableFood = () => {

  const [foods, setFoods] = useState([])

  useEffect(() => {
  axios.get("http://localhost:5000/available-food")
    .then(res => {
      // response handle করুন
      setFoods(res.data);
    })
    .catch(err => {
      // error handle করুন
      console.error(err);
    });
}, []);




  return (
    <div className="bg-[#ffffff] w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 md:py-16">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          Available Foods
        </h1>
        <p className="text-center text-base md:text-lg text-gray-600 mb-10">
          Discover surplus food shared by your generous neighbors.
        </p>

        {/* Search Bar */}
        <div className="flex  sm:mx-3.5 flex-row items-center justify-center gap-4 mb-12 w-full">
          <input
            type="text"
            placeholder="Search by food name..."
            className="w-full sm:w-[60%] md:w-[40%] bordr bg-[#eee9e9] h-10 px-4 text-sm border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            className="bg-green-600  text-[18px] flex justify-center items-center text-white px-5 py-2 h-10  rounded-md hover:bg-green-700 cursor-pointer transition text-sm  md:w-[150px]"
          >
            <FaSearch size={14} /> <span className='pl-1'>Search</span>
          </button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 ">


          {
            foods.map(food => <Card1 food={food} key={food._id}></Card1>)
          }


        </div>

      </div>
    </div>
  );
};

export default AvailableFood;
