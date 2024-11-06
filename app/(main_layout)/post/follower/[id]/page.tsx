"use client"
import Loader from "@/component/UI/Loader";
import { useGetFollowerQuery } from "@/redux/app/feature/api/user/useApi";
import { IUser } from "@/types/types";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";
import { FcApproval } from "react-icons/fc";


const page = ({ params }: { params: { id: string} }) => {
    const { id } = params;
    const {data, isLoading} = useGetFollowerQuery(id);

const followers = data?.data?.followers;
const following = data?.data?.following;


  // frammer motion animation 
  const variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        },
    },
};

const item1 = {
    hidden: {
        opacity: 0,
        x: -40,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 2,
        },
    },
};
const item2 = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 2,
        },
    },
};

if (isLoading) {return <Loader />};
    return (
        <motion.div
        variants={variants}
        initial="hidden"
        animate="show"  className="lg:flex lg:gap-20 px-5">
            {/* follower user data  */}
            <motion.div
        variants={item1} className="flex-1">
                    <h1 className="text-3xl hover:text-blue-500 font-bold text-center my-5">Followers</h1>
                <div className="mt-10">
                    {
                        followers?.length && followers?.map((follower: IUser) => (
                            <div key={follower?._id} className="flex justify-between mb-5">
                            <div className="flex">
                            <div className="flex items-center py-2">
                                <Image
                                className="object-cover w-20 h-20 rounded"
                                src={follower?.profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                alt="logo"
                                width={20} 
                                height={20} 
                                priority 
                            />
                                <Link href={`/profile/${follower?._id}`}>
                                <p className="text-lg font-semibold hover:underline ml-3">
                                    {follower?.name}
                                </p>
                                </Link>
                                {
       !follower?.premium &&  <div className='mb-1 ml-2'><FcApproval className='-mb-3'/></div>
     }
                                </div>
             
                            </div>
                            <div className="flex items-center">
                                <Link href={`/user/${follower?._id}`}><motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 1.5 }}
  whileInView={{ opacity: 1 }} type="button" className="mx-2 text-sm font-bold bg-blue-500 px-3 py-1.5 dark:bg-blue-400 rounded-md text-white">View Details</motion.button></Link>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </motion.div>

            {/* following user data  */}
            <motion.div
        variants={item2} className="flex-1">
                    <h1 className="text-3xl hover:text-blue-500 font-bold text-center my-5">Following</h1>
                <div className="mt-10">
                    {
                        following?.length && following?.map((follower: IUser) => (
                            <div key={follower?._id} className="flex justify-between mb-5">
                            <div className="flex">
                            <div className="flex items-center py-2">
                                <Image
                                className="object-cover w-20 h-20 rounded"
                                src={follower?.profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                alt="logo"
                                width={20} 
                                height={20} 
                                priority 
                            />
                               <Link href={`/profile/${follower?._id}`}>
                               <p className="text-lg font-semibold ml-3 hover:underline">
                                    {follower?.name}
                                </p>
                               </Link>
                                {
       !follower?.premium &&  <div className='mb-1 ml-2'><FcApproval className='-mb-3'/></div>
     }
                                </div>
             
                            </div>
                            <div className="flex items-center">
                                <Link href={`/user/${follower?._id}`}>
<motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 1.5 }}
  whileInView={{ opacity: 1 }} type="button" className="mx-2 text-sm font-bold bg-blue-500 px-3 py-1.5 dark:bg-blue-400 rounded-md text-white">View Details</motion.button></Link>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </motion.div>
            
        </motion.div>
    )
};

export default page;