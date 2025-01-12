"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { TfiWrite } from "react-icons/tfi";
import { IoIosMoon } from "react-icons/io";
import { MdFeed, MdSunny } from "react-icons/md";
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';
import { IoHomeOutline } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { BiSolidContact } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { motion } from 'framer-motion';
import { logout } from '@/lib/AuthServices';
import { RiUserFollowFill } from 'react-icons/ri';


const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBar, setIsOpenBar] = useState(false);
  const use = useAppSelector(useCurrentUser);
  const id = use?._id;
  const {data: userData, isLoading } = useGetSingleUserQuery(id);
  const user = userData?.data;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggle = () => {
    setIsOpenBar(!isOpenBar);
  };

  const closeDropdown = () => {
    setIsOpenBar(false);
  };
  const close = () => {
    setIsOpen(false);
  };
  // accessToken
  const handleLogout = async () => {
    await logout();;
   window.location.reload();
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
    <div className="bg-white fixed top-0 z-50 w-full rounded shadow-xl dark:bg-gray-900">
    <div className="container mx-auto font-semibold flex items-center justify-between py-2 space-y-4 sm:space-y-0 sm:flex-row">
    <div className='flex gap-2 md:gap-4 lg:gap-8'>
   <div className=''>
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
   </div>
    </div>
<div className='hidden md:flex gap-2 md:gap-4 lg:gap-8'>
<Link href="/">
      <div><IoHomeOutline className='w-12 h-6'/></div>
      </Link>
      <Link href="/about">
      <div><BiNotepad className='w-12 h-6'/></div>
      </Link>
      <Link href="/contact">
      <div><BiSolidContact className='w-12 h-6'/></div>
      </Link>
      <Link href="/profile/follow">
      <div><RiUserFollowFill className='w-12 h-6'/></div>
      </Link>
      <Link href="/profile/update">
      <div><MdFeed className='w-12 h-6'/></div>
      </Link>
</div>
      <div className="text-sm flex pr-6 text-gray-600 dark:text-gray-300">
     <div>
     <div className=" hidden">
  {/* Dropdown Toggle Button */}
  <motion.button
    whileHover={{
      scale: 1.2,
      transition: { duration: 0.3 },
    }}
    onClick={toggle} // Toggle the dropdown visibility
    className="relative"
  >
    <FaBars className="w-8 h-5 mt-4 dark:text-white" />
  </motion.button>

  {/* Dropdown Menu */}
  {isOpenBar && (
    <div
      className="absolute z-20 py-2 mt-5 bg-white rounded-md shadow-xl dark:bg-gray-800"
      style={{ right: "60px", width: "150px" }}
    >
      <div className="px-2 text-center">
        <Link
          href="/"
          className="block rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
          onClick={closeDropdown}
        >
          Home
        </Link>
        <Link
          href="/profile/follow"
          className="block rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
          onClick={closeDropdown}
        >
          Follower
        </Link>
        <Link
          href="/profile/update"
          className="block rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
          onClick={closeDropdown}
        >
          Feed
        </Link>
        <Link
          href="/about"
          className="block rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
          onClick={closeDropdown}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="block rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
          onClick={closeDropdown}
        >
          Contact
        </Link>
      </div>
    </div>
  )}
</div>
     </div>
      <motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 0.3 },
  }} onClick={toggleTheme} className="mt-1">
      {theme === 'light' ? (
          <>
            <IoIosMoon className="w-6 h-6 mx-1 dark:text-white" />
           
          </>
        ) : (
          <>
            <MdSunny className="w-6 h-6 mx-1 dark:text-white" />
          </>
        )}
      </motion.button>
  
   <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}>
      <Link href="/post/create">
      <div><TfiWrite className='w-8 md:w-12 h-6'/></div>
      </Link>
     </motion.button>
    {
      user ? ( 
    <>
       <div className=" relative">
  <motion.button
    whileHover={{
      scale: 1.2,
      transition: { duration: 0.3 },
    }}
    onClick={toggleDropdown}
    className="z-10 rounded-md"
  >
    <img
      className="w-10 h-10 mt-1 rounded-full"
      src={user?.profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
      alt="logo"
    />
  </motion.button>

  {isOpen && (
    <div
      className="absolute z-20 right-5 py-2 mt-4 bg-white rounded-md shadow-xl dark:bg-gray-800"
      style={{ right: '0px', width: '131px' }} 
      onClick={close}
    >
      <div className="px-2 text-center">
        <Link
          href='/profile'
          className="block my-2 rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
          onClick={close}
        >
          Profile 
        </Link>

        {
          user.role === 'admin' && (
            <Link
            href='/dashboard'
            className="block my-2 rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
            onClick={close}
          >
            Dashboard
          </Link>
          )
        }

        <motion.button
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          onClick={handleLogout}
          className="px-3 md:px-6 mx-5 py-2  tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400"
        >
          LogOut
        </motion.button>
      </div>
    </div>
  )}
</div>
    </>
      ) : (
<Link href="/auth/login"><motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 0.3 },
  }} className="px-4 mt-2 mx-2 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 ">Log in</motion.button></Link>
      )
    }
      </div>
     
    </div>
  </div>
  );
};

export default Navber;
  


