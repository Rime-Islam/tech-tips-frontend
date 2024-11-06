import React from 'react';
import { FaPhone } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { FcApproval } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Image from 'next/image';
import { IUser } from '@/types/types';

interface UserProfileProps {
  user: IUser;
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {

    return (
        <div className="max-w-7xl flex mt-10 h-auto flex-wrap ">
              <div
    className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white dark:bg-gray-700 opacity-75 mx-6 lg:mx-0"
  >
    <div className="p-4 md:p-12 text-center lg:text-left">  
     <div className='flex gap-2'>
     <h1 className="text-3xl text-gray-800 dark:text-white font-bold pt-8 lg:pt-0">{user?.name}  </h1>
     {
         user?.premium && <span><FcApproval className='w-8 h-8'/></span>
     }
     </div>
      <div className='flex gap-2 mt-2'>
      <MdEmail className='w-6 h-6'/><p>{user?.email}</p>
      </div>
      <div className='flex gap-2 mt-2'>
            <FaPhone className='w-6 h-6'/>
            <p>{user?.phone}</p>
            </div>
      <div className='flex gap-2 mt-2'>
            <FaHome className='w-6 h-6'/>
            <p>{user?.address}</p>
            </div>
      <div className='mt-5'>
        <div className='flex gap-2'>
            <FaUserCircle className='w-6 h-6'/>
            <p>{user?.role}</p>
            </div>
      <p className='mt-3 text-center'>{user?.bio && <span>" { user?.bio } " </span>}</p>
      </div>
      <div className="pt-12 ">
        <Link href="/profile/update" className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
          Update Profile
        </Link>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-2/5">
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
  <Image
    className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
    src={user?.profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
    alt="logo"
    width={64} 
    height={64} 
    priority 
  />

</div>
  </div>
        </div>
    )
};

export default UserProfile;