import React, { use, useEffect, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';
import { FaSun, FaMoon } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {

    const { user, logOut } = use(AuthContext)
    
    //   const { user, logOut } = useContext(AuthContext);


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Congratulation!",
                    text: "LogOut Successful!",
                    icon: "success"
                });
                console.log('logOUt sucessfull');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const linksPage = <>
        <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500 '>
            <NavLink className={({ isActive }) => isActive ? "text-green-600 underline  " : ''} to={"/"}>Home</NavLink>
        </li>
        <li className='text-[16px]  text-[#1E88E5] font-medium hover:text-orange-500'>
            <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={'/available-food'}>Available Food</NavLink>
        </li>

        {/* Private Route */}
        {user &&
            <>
                <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500'>
                    <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={'/add-food'}>Add Food</NavLink>
                </li>
                <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500'>
                    <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={'/manage-my-food'}>Manage My Food</NavLink>
                </li>
                <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500'>
                    <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={'/my-food-request'}>My Food Request</NavLink>
                </li>
            </>}
    </>


    return (
        <div className="navbar bg-gray-50 shadow-sm  md:pl-6  md:pr-8">
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost bg-white text-black lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-42 p-2 shadow">
                        {linksPage}
                    </ul>
                </div>
                <div className='flex h-[48px] items-center '>
                    <img className='md:w-[80px] w-[60px] h-[60px] md:h-auto' src="https://i.ibb.co/YT4cqW4V/Whats-App-Image-2025-07-16-at-03-44-14-43bc9fb4-removebg-preview.png" alt="logo" />
                    <NavLink to={'/'} className="md:text-[28px] text-[22px]  font-extrabold text-[#E53935]">Food<span className='text-[#3949AB]'>Bond</span></NavLink>
                </div>
            </div>
            <div className="navbar-center hidden md:flex ">
                <ul className="menu menu-horizontal space-x[20px]   md:ml-30 md:space-x-2 px-1">
                    {linksPage}
                </ul>
            </div>

            <div className="navbar-end ">
                {user ? <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img title={user?.displayName}
                                alt="Tailwind CSS Navbar component"
                                src={`${user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}`} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-green-900 rounded-box font-bold text-white text-[18px]">
                        <li><a onClick={handleLogOut}><IoIosLogOut size={20} />Logout</a></li>
                    </ul>
                </div> : <Link to={'/registration'} className="btn md:text-[16px] font-bold p-[20px] md:h-[40px] h-[40px] text-[22px] rounded-2xl bg-[#16a249] hover:bg-[#158f42] text-white">SignUp</Link>

                }

            </div>
        </div>
    );
};

export default Navbar;