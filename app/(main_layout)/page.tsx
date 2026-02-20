"use client"
import Sidebar from "@/component/Home/Sidebar";
import PostContent from "@/component/Home/PostContent";
import RightSidebar from "@/component/Home/RightSidebar";
import { motion, AnimatePresence } from "framer-motion"
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { useAppDispatch, useAppSelector } from "@/redux/app/hook";
import { filteredPost, filterPosts, setFilters, setPosts } from "@/redux/app/feature/api/post/postSlice";
import { useEffect } from "react";

export default function Home() {
    const { data, isLoading } = useGetAllPostsQuery(undefined);
    const posts = data?.data;
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (data) {
        dispatch(setPosts(posts));
      }
    }, [data, posts, dispatch]);
  
    const handleCategory = (category: string) => {
      dispatch(setFilters({ category }));
      dispatch(filterPosts());
    };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className="min-h-screen bg-background/50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Sidebar */}
          <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-6 xl:col-span-7">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold font-outfit tracking-tight mb-2">
                Latest <span className="text-gradient">Insights</span>
              </h1>
              <p className="text-muted-foreground">Stay ahead with the latest in tech and development.</p>
            </div>
            <PostContent />
          </motion.div>

          {/* Right Sidebar */}
          <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <RightSidebar handleCategory={handleCategory}/>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

