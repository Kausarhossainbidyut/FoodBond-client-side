import React, { useEffect, useState, useContext } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import logoImage from '../../public/logo.png'
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
                    icon: "success"
                });
                console.log('logOut successful');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const linksPage = <>
        <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500'>
            <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={"/"}>Home</NavLink>
        </li>
        <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500'>
            <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={'/available-food'}>Available Food</NavLink>
        </li>
        {!user && (
            <>
                <li className='text-[16px] text-[#1E88E5] font-medium hover:text-orange-500'>
                    <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : ''} to={'/add-food'}>Add Food</NavLink>
                </li>
            </>
        )}
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
        <div className={`fixed py-[3px] top-0 left-0 right-0 z-50 bg-gray-50 shadow-sm transition-all duration-500 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* content container with horizontal padding, max width for consistent layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                    {/* dropdown for small screens */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-48 p-2 shadow">
                            {linksPage}
                        </ul>
                    </div>

                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            className='md:w-[80px] w-[60px] h-[60px] md:h-auto'
                            src={logoImage}
                            alt="logo"
                        />
                        <span className="md:text-2xl text-xl font-extrabold text-[#E53935]">
                            Food<span className='text-[#3949AB]'>Bond</span>
                        </span>
                    </Link>
                </div>

                {/* desktop menu */}
                <ul className="hidden lg:flex space-x-6">
                    {linksPage}
                </ul>

                {/* right side user info or signup */}
                <div>
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        title={user?.displayName}
                                        alt="user"
                                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-green-900 rounded-box font-bold text-white text-[18px]">
                                <li>
                                    <a onClick={handleLogOut} className="flex items-center gap-2 cursor-pointer">
                                        <IoIosLogOut size={20} /> Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            to={'/registration'}
                            className="btn md:text-[16px] font-bold px-6 h-10 text-[22px] rounded-2xl bg-[#16a249] hover:bg-[#158f42] text-white"
                        >
                            SignUp
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
