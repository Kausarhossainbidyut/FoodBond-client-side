import React, { useEffect, useState, useContext } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import logoImage from '../../public/logo.png';
import NotificationBell from '../components/NotificationBell';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrollTimeout, setScrollTimeout] = useState(null);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Congratulation!",
                    text: "LogOut Successful!",
                    icon: "success",
                    confirmButtonColor: "#16a34a",
                });
                console.log('logOut successful');
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "Logout failed!",
                    icon: "error",
                    confirmButtonColor: "#dc2626",
                });
            });
    };

    const linksPage = <>
        <li className='text-base font-semibold'>
            <NavLink className={({ isActive }) => isActive ? "text-green-600 font-bold" : 'text-gray-700 hover:text-green-600 transition-colors duration-300'} to={"/"}>Home</NavLink>
        </li>
        <li className='text-base font-semibold'>
            <NavLink className={({ isActive }) => isActive ? "text-green-600 font-bold" : 'text-gray-700 hover:text-green-600 transition-colors duration-300'} to={'/available-food'}>Available Food</NavLink>
        </li>
        {user && (
            <li className='text-base font-semibold'>
                <NavLink className={({ isActive }) => isActive ? "text-green-600 font-bold" : 'text-gray-700 hover:text-green-600 transition-colors duration-300'} to={'/dashboard'}>Dashboard</NavLink>
            </li>
        )}
        {!user && (
            <>
                <li className='text-base font-semibold'>
                    <NavLink className={({ isActive }) => isActive ? "text-green-600 font-bold" : 'text-gray-700 hover:text-green-600 transition-colors duration-300'} to={'/add-food'}>Add Food</NavLink>
                </li>
            </>
        )}
        {user &&
            <>
                <li className='text-base font-semibold'>
                    <NavLink className={({ isActive }) => isActive ? "text-green-600 font-bold" : 'text-gray-700 hover:text-green-600 transition-colors duration-300'} to={'/analytics'}>Analytics</NavLink>
                </li>
            </>
        }
    </>;

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setShowNavbar(false); // scrolling down
            } else {
                setShowNavbar(true); // scrolling up
            }
            setLastScrollTop(st <= 0 ? 0 : st);

            if (scrollTimeout) clearTimeout(scrollTimeout);
            const timeout = setTimeout(() => {
                setShowNavbar(true); // show again after pause
            }, 1000); // 1 second delay
            setScrollTimeout(timeout);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [lastScrollTop, scrollTimeout]);

    return (
        <div className={`fixed py-1 top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 transition-all duration-500 ease-in-out ${
            showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}>
            {/* content container with horizontal padding, max width for consistent layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                    {/* dropdown for small screens */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost bg-white text-black hover:bg-green-50 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-48 p-2 shadow-lg border border-gray-200">
                            {linksPage}
                        </ul>
                    </div>

                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <img
                                className='md:w-[70px] w-[55px] h-[55px] md:h-[70px] transform group-hover:scale-110 transition-transform duration-300'
                                src={logoImage}
                                alt="logo"
                            />
                        </div>
                        <span className="md:text-2xl text-xl font-extrabold">
                            <span className="text-green-600">Food</span>
                            <span className="text-orange-500">Bond</span>
                        </span>
                    </Link>
                </div>

                {/* desktop menu */}
                <ul className="hidden lg:flex space-x-6">
                    {linksPage}
                </ul>

                {/* right side user info or signup */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <NotificationBell />
                    
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-300">
                                <div className="w-11 rounded-full ring-2 ring-green-200 hover:ring-green-400 transition-all duration-300">
                                    <img
                                        title={user?.displayName}
                                        alt="user"
                                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-green-600 rounded-lg font-bold text-white shadow-lg mt-3 transition-all duration-300">
                                <li>
                                    <a onClick={handleLogOut} className="flex items-center gap-2 cursor-pointer hover:bg-green-700 rounded-lg transition-colors duration-300">
                                        <IoIosLogOut size={20} /> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            to={'/registration'}
                            className="btn md:text-base font-bold px-6 h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white border-none shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Sign Up
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;