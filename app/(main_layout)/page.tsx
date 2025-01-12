"use client"
import Sidebar from "@/component/Home/Sidebar";
import PostContent from "@/component/Home/PostContent";
import RightSidebar from "@/component/Home/RightSidebar";
import { motion  } from "framer-motion"
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { useAppDispatch, useAppSelector } from "@/redux/app/hook";
import { filteredPost, filterPosts, setFilters, setPosts } from "@/redux/app/feature/api/post/postSlice";
import { useEffect } from "react";

export default function Home() {
    const { data, isLoading } = useGetAllPostsQuery(undefined);
    const posts = data?.data;
    const filterPost = useAppSelector(filteredPost);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (data) {
        dispatch(setPosts(posts));
      }
    }, [data, dispatch]);
  
    const handleCategory = (category: string) => {
      dispatch(setFilters({ category }));
      dispatch(filterPosts());
    };
  


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
    animate="show" className="flex mt-[6vh]">
     <motion.div  variants={item1} className="sm:hidden md:flex bg-white dark:bg-gray-900 min-h-[100vh] md:w-40 xl:w-56">
     <Sidebar />
     </motion.div>

 <motion.div  variants={item2} className="mx-auto">
   <PostContent />
   </motion.div>
    <motion.div  variants={item3} className="sm:hidden md:flex bg-white dark:bg-gray-900 min-h-[100vh] md:w-40 xl:w-56">
    <RightSidebar handleCategory={handleCategory}/>
    </motion.div>

    </motion.div>
  );
}
