import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppSelector } from '@/redux/app/hook';
import React from 'react';
import Link from 'next/link';
import { IoIosCreate } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiShadowFollower } from "react-icons/gi";
import { SlUserFollowing } from "react-icons/sl";
import { SiSubstack } from "react-icons/si";
import { motion } from 'framer-motion';


const Sidebar = () => {
    const user = useAppSelector(useCurrentUser);
    const id = user?._id;

    return (
        <div className='pt-12'>
            {
                user?.role === "user" && (
                    <div > 
        <div className="flex">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}><IoIosCreate className=" w-6 h-6"/></motion.button>
     <Link
          href="/post/create"
          className="mx-2 hover:underline text-gray-600 font-semibold text-lg transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Reddit"
        >
          Create Post
        </Link>
        </div>

        <div className="flex my-5">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}> <IoDocumentTextSharp className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href="/profile"
          className="mx-2 hover:underline text-gray-600 transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Facebook"
        >
          My Post
        </Link>
        </div>

        <div className="flex">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}>  <CgProfile className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href="/profile"
          className="mx-2 text-gray-600 hover:underline  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          My Profile
        </Link>
        </div>

        <div className="flex my-5">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}> <GiShadowFollower className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href={`/post/follower/${id}`}
          className="mx-2 text-gray-600 hover:underline  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          My Follower
        </Link>
        </div>

        <div className="flex">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}> <SlUserFollowing className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href={`/post/follower/${id}`}
          className="mx-2 text-gray-600 hover:underline  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          Following
        </Link>
        </div>
        <div className="flex my-5">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}> <SiSubstack className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href="/profile/payment"
          className="mx-2 text-gray-600 hover:underline  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          Subscribe
        </Link>
        </div>
                    </div>
                )
            }
            {
                user?.role === "admin" && (
                    <div> 
                        <div className="flex">
                        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}><CgProfile className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href="/profile"
          className="mx-2 text-gray-600 hover:underline  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          My Profile
        </Link>
        </div>

                         <div className="flex my-5">
                         <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}>  <SlUserFollowing className="mt-1 w-6 h-6"/></motion.button>
        <Link
          href={"/admin/users"}
          className="mx-2 text-gray-600 hover:underline  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
         All Users
        </Link>
        </div>
        <div className="flex">
        <motion.button
   whileHover={{
     scale: 1.2,
     transition: { duration: 0.3 },
   }}> <IoIosCreate className=" w-6 h-6"/></motion.button>
        <Link
          href="/admin/statistics"
          className="mx-2 text-gray-600 hover:underline font-semibold text-lg transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Reddit"
        >
          Statistics
        </Link>
        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Sidebar;