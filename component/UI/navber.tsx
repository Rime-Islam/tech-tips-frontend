"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { TfiWrite } from "react-icons/tfi";
import { IoIosMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { logout, useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';



const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

   const [theme, setTheme] = useState<'light' | 'dark' | null>(null); 

 
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark'); 
    } else {
  
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(userPrefersDark ? 'dark' : 'light');
    }
  }, []);

 
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

 
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };



  return (
    <div className="bg-white py-3 rounded shadow-xl dark:bg-gray-900">
    <div className="container font-semibold flex  items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
      <Link href="/">
   <div className='flex'>
   <Image
    className="w-16"
    src="https://i.ibb.co/FBBRt37/Google-Photos-Logo-2015.png"
    alt="logo"
    width={64} 
    height={64} 
    priority 
  />
              <p className='mt-2'>GrootHub</p>
   </div>
      </Link>
      
      <div className="flex font-semibold">
        <Link
          href="/"
          className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Reddit"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Facebook"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="mx-2 text-gray-600  transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          Contact
        </Link>
      </div>

      <div className="text-sm flex pr-6 text-gray-600 dark:text-gray-300">
      <button onClick={toggleTheme} className="mt-1">
      {theme === 'light' ? (
          <>
            <IoIosMoon className="w-6 h-6  dark:text-white" />
           
          </>
        ) : (
          <>
            <MdSunny className="w-6 h-6  dark:text-white" />
          </>
        )}
      </button>
   
    {
      user ? ( 
    <> 
     <Link href="/create">
     <div className='mt-4'><TfiWrite className='w-12 h-6'/></div>
     </Link>

        <div className="relative inline-block">
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="relative z-10 p-2 mx-2 rounded-md   "
      >
          <img
    className="w-12 rounded-full"
    src="https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"
    alt="logo"
  />   
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute z-10 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 transition-transform transform duration-100 ease-out scale-100"
        >
         <div className='px-2'>
         <Link
            href="/profile"
            className="block py-6 font-medium text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Profile & Analytic
          </Link>
        
          <button onClick={handleLogout}
            className="px-6 mx-2 py-2  font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 "
          >
            LogOut
          </button>
         </div>
        </div>
      )}
    </div>
    </>
      ) : (
<Link href="/auth/login"><button className="px-4 mt-2 mx-2 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 ">Log in</button></Link>
      )
    }
      </div>
     
    </div>
  </div>
  );
};

export default Navber;
  


