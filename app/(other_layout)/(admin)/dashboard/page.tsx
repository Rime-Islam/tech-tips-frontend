"use client"
import PostCharts from "@/component/charts/PostCharts";
import UserBarCharts from "@/component/charts/UserBarCharts";
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { useGetAllUserQuery } from "@/redux/app/feature/api/user/useApi";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const page = () => {
    const {data: user} = useGetAllUserQuery(undefined);
    const {data: post} = useGetAllPostsQuery(undefined);
    const userData = user?.data;
    const postData = post?.data;

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

    return (
        <div className="">
            <motion.div
        variants={variants}
        initial="hidden"
        animate="show" 
        className=" ">
            <div  className="text-2xl mt-5 hover:text-[#70AABD] text-center font-semibold mb-4 text-blue-500 md:mb-8">Statistics</div>
       <div className="grid grid-cols-1 ml-8 lg:grid-cols-2 justify-center mt-20">
       <motion.div
        variants={item1} className="">
        <PostCharts postData={postData}/>
        </motion.div>
        <motion.div
        variants={item2} className="max-h-full">
        <UserBarCharts userData={userData}/>
        </motion.div>
       </div>
        </motion.div>
        </div>
    )
};

export default page;