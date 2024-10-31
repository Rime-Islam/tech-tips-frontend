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


const Sidebar = () => {
    const user = useAppSelector(useCurrentUser);
    const id = user?._id;

    return (
        <div className='pt-12'>
            {
                user?.role === "user" && (
                    <div className=""> 
        <div className="flex">
        <IoIosCreate className=" w-6 h-6"/>
        <Link
          href="/create"
          className="mx-2 text-gray-600 font-semibold text-lg transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Reddit"
        >
          Create Post
        </Link>
        </div>

        <div className="flex my-5">
        <IoDocumentTextSharp className="mt-1 w-6 h-6"/>
        <Link
          href="/profile"
          className="mx-2 text-gray-600 transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Facebook"
        >
          My Post
        </Link>
        </div>

        <div className="flex">
        <CgProfile className="mt-1 w-6 h-6"/>
        <Link
          href="/profile"
          className="mx-2 text-gray-600  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          My Profile
        </Link>
        </div>

        <div className="flex my-5">
        <GiShadowFollower className="mt-1 w-6 h-6"/>
        <Link
          href={`/post/follower/${id}`}
          className="mx-2 text-gray-600  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          My Follower
        </Link>
        </div>

        <div className="flex">
        <SlUserFollowing className="mt-1 w-6 h-6"/>
        <Link
          href={`/post/follower/${id}`}
          className="mx-2 text-gray-600  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Github"
        >
          Following
        </Link>
        </div>
        <div className="flex my-5">
        <SiSubstack className="mt-1 w-6 h-6"/>
        <Link
          href="/payment"
          className="mx-2 text-gray-600  transition-colors font-semibold text-lg  duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
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
                    <> 

                    </>
                )
            }
        </div>
    );
};

export default Sidebar;