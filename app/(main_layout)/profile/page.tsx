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
    animate="show" className='container mx-auto '> 




   
    
    </motion.div>
);
};

export default page;