import React, { useEffect, useState, useContext, useRef } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Congratulation!",
          text: "LogOut Successful!",
          icon: "success"
        });
      })
      .catch(error => console.log(error));
  };

  const linksPage = (
    <>
      <li>
        <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : 'text-[#1E88E5] hover:text-orange-500'} to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : 'text-[#1E88E5] hover:text-orange-500'} to={'/available-food'}>Available Food</NavLink>
      </li>
      {user && (
        <>
          <li><NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : 'text-[#1E88E5] hover:text-orange-500'} to={'/add-food'}>Add Food</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : 'text-[#1E88E5] hover:text-orange-500'} to={'/manage-my-food'}>Manage My Food</NavLink></li>
          <li><NavLink className={({ isActive }) => isActive ? "text-green-600 underline" : 'text-[#1E88E5] hover:text-orange-500'} to={'/my-food-request'}>My Food Request</NavLink></li>
        </>
      )}
    </>
  );

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollTop(st <= 0 ? 0 : st);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const timeout = setTimeout(() => setShowNavbar(true), 1000);
      setScrollTimeout(timeout);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollTop, scrollTimeout]);

  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full bg-gradient-to-r from-[#1E88E5] to-[#3949AB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img className='md:w-[80px] w-[60px]' src="https://i.ibb.co/YT4cqW4V/Whats-App-Image-2025-07-16-at-03-44-14-43bc9fb4-removebg-preview.png" alt="logo" />
              <NavLink to={'/'} className="text-[22px] md:text-[28px] font-extrabold text-[#E53935]">Food<span className='text-white'>Bond</span></NavLink>
            </div>

            <div className="hidden md:flex gap-6">
              <ul className="flex items-center gap-4">{linksPage}</ul>
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setShowUserMenu(s => !s)} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="user" />
                    </div>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <button onClick={handleLogOut} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"><IoIosLogOut /> Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={'/registration'} className="bg-[#16a249] hover:bg-[#158f42] text-white px-4 py-2 rounded-2xl font-bold">SignUp</Link>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileOpen(s => !s)} className="text-white">
                {mobileOpen ? 'X' : '☰'}
              </button>
            </div>
          </nav>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/20">
            <ul className="flex flex-col p-4 gap-2">{linksPage}</ul>
            {user ? (
              <button onClick={handleLogOut} className="w-full text-left px-4 py-2 text-white hover:bg-white/20">Logout</button>
            ) : (
              <Link to={'/registration'} className="block bg-[#16a249] text-center py-2 rounded-2xl text-white font-bold mt-2">SignUp</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
