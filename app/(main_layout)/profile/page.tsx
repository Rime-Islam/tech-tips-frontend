"use client"
import React from 'react';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppSelector } from '@/redux/app/hook';
import Sidebar from '@/component/Home/Sidebar';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';
import UserPost from '@/component/Post/UserPost';
import UserProfile from '@/component/Profile/UserProfile';
import { motion } from 'framer-motion';


const page = () => {
    const use = useAppSelector(useCurrentUser);
    const id = use?._id;
    const {data: userData } = useGetSingleUserQuery(id);
    const user = userData?.data;
   
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

      const item3 = {
          hidden: {
              opacity: 0,
              y: 40,
          },
          show: {
              opacity: 1,
              y: 0,
              transition: {
                  duration: 2,
              },
          },
      };

return (
    <motion.div
    variants={variants}
    initial="hidden"
    animate="show" className='container mx-auto max-w-5xl'> 
<div className='lg:flex justify-between'>

    <motion.div variants={item1}>
    <Sidebar />
    </motion.div>
   
<motion.div variants={item2}>
<UserProfile user={user}/>
</motion.div>

</div>

    <motion.div variants={item3}>
    <UserPost user={user}/>
    </motion.div>
    
    </motion.div>
);
};

export default page;