"use client"
import Sidebar from "@/component/Home/Sidebar";
import PostContent from "@/component/Home/PostContent";
import RightSidebar from "@/component/Home/RightSidebar";
import { motion  } from "framer-motion"

export default function Home() {

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
            delay: 0.5
        },
    },
};
const item2 = {
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
const item3 = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 2,
            delay: 0.5
        },
    },
};

  return (
    <motion.div  variants={variants}
    initial="hidden"
    animate="show" className="flex gap-10 mt-5 mb-12">
     <motion.div  variants={item1} className="flex-1 mt-6">
     <Sidebar />
     </motion.div>
   <motion.div  variants={item2} className="flex-2 ">
   <PostContent />
   </motion.div>
    <motion.div  variants={item3} className="flex-1 mt-12">
    <RightSidebar />
    </motion.div>
    </motion.div>
  );
}
