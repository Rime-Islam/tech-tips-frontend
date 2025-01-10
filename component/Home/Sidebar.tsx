import React from 'react';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppSelector } from '@/redux/app/hook';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
import { FcDatabase, FcDocument, FcEngineering, FcFaq, FcReadingEbook, FcSearch } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FcVip } from "react-icons/fc";
import { FcBookmark } from "react-icons/fc";
import { TbPremiumRights } from 'react-icons/tb';



const Sidebar = () => {
    const user = useAppSelector(useCurrentUser);
    const id = user?._id;

    return (
     <div className=''>
  <div className=" text-gray-400  rounded">
      {
        user?.role === 'admin' ? (
          <div className=" px-2">
          <div className="  mt-3 ">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
             <FcHome className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Dasboard</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
            <FcSearch className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Search</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-gray-700 rounded"
              href="#"
            >
              <FcBearish className='w-5 h-5'/>
              <span className="ml-2 text-sm font-medium">Insights</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
              <FcDocument className='h-6 w-6'/>
              <span className="ml-2 text-sm font-medium">Docs</span>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full mt-2 ">
         
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
             <FcEngineering className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Settings</span>
            </Link>
            <Link
              className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
             <FcFaq className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Messages</span>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
            </Link>
            <Link
              className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
             <MdOutlineAccountCircle className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Messages</span>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
            </Link>
          </div>
        </div>
        ) : (
          <div className=" px-2">
          <div className="  mt-3 ">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href=""
            >
             <FcHome className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Home</span>
            </Link>
           
           
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/post/create"
            >
              <FcDocument className='h-6 w-6'/>
              <span className="ml-2 text-sm font-medium">Create Post</span>
            </Link>
          </div>
          <div className="flex flex-col items-center w-full mt-2 ">
         
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/profile/update"
            >
             <FcDatabase className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Feed</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/profile/follow"
            >
             <FcReadingEbook  className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Follower</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/profile/follow"
            >
             <FcVip  className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Following</span>
            </Link>
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/profile/payment"
            >
             <TbPremiumRights  className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Subscribe</span>
            </Link>
            <Link
              className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
             <FcFaq className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Messages</span>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
            </Link>
            <Link
              className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/profile"
            >
             <MdOutlineAccountCircle className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Profile</span>
              <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full" />
            </Link>
          </div>
        </div>
        )
      }
  </div>

   </div>
    );
};

export default Sidebar;