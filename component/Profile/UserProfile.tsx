import React from 'react';
import { FaPhone } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { FcApproval } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Image from 'next/image';
import { IUser } from '@/types/types';
import { useAppSelector } from '@/redux/app/hook';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';



const UserProfile = () => {
  const use = useAppSelector(useCurrentUser);
  const id = use?._id;
  const {data: userData } = useGetSingleUserQuery(id);
  const user = userData?.data;
  
    return (
        <div className="flmt-10 h-auto  ">

<div>
            <div><img className="w-full h-[40vh]" src="https://marketplace.canva.com/EAEmGBdkt5A/3/0/1600w/canva-blue-pink-photo-summer-facebook-cover-gy8LiIJTTGw.jpg" alt="Cover Photo"/></div>
            <div className="mx-12 -mt-10 flex items-center justify-between"> 
                <div className="flex items-center gap-8">
                <img
                    className="object-cover w-20 h-20 md:h-40 md:w-40 lg:h-56 lg:w-56 rounded-full"
                    src={user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"
                  />
                        <div className="">
                           <div className='text-xl font-semibold'>
                          {user?.name}
                          {
       user?.premium &&  <div><FcApproval className='w-5 h-5'/></div>
     }
                           </div>
                            <div className='flex gap-2'> <MdEmail className='mt-1'/> <span>{user?.email}</span> </div>
                            <div className='flex gap-2'> <FaHome className='mt-1'/> <span>{user?.address}</span> </div>
                            <div className='flex gap-2'> <FaPhone className='mt-1'/> <span>{user?.phone}</span> </div>
                            <div className='flex gap-2 w-56'> <FaUserCircle className='mt-1'/> <span>{user?.bio}</span> </div>
                 
                            </div>
     
                </div>

               
                  </div>
                  <div>

                  </div>
        </div>
       
        </div>
    )
};

export default UserProfile;