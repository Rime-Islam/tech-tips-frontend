"use client"
import CreatePost from '@/component/Post/CreatePost';
import { motion } from 'framer-motion';
import React from 'react';

const page = () => {
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


return (
    <motion.div
    variants={variants}
    initial="hidden"
    animate="show" >
  <motion.div
    variants={item1}>
    <CreatePost />
  </motion.div>
</motion.div>

);
};

export default page;