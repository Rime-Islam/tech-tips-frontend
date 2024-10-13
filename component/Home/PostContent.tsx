"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FcApproval } from "react-icons/fc";
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { IPost } from '@/types/types';
import { FaComment } from "react-icons/fa6";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaCrown } from "react-icons/fa";
import Loader from '../UI/Loader';


const PostContent = () => {
  const [react, setReact] = useState<'like' | 'dislike' | null>(null); 
  const user = useAppSelector(useCurrentUser);
  const {data, isLoading} = useGetAllPostsQuery(undefined);
const posts = data?.data;



const toggleReact = () => {
  setReact((prevreact) => (prevreact === 'like' ? 'dislike' : 'like'));
};
if (isLoading) {return <Loader />};
const category: any = ["Software Engineer", "Web Development", "Cybersecurity", "DevOps", "Machine Learning", "Blockchain", "UI/UX Design"];
    return (
      <div className="container max-w-5xl ">
        {/* categories tab  */}
        <div className='mb-5 flex flex-wrap'>
      {
        category?.length && category?.map((item: string) => (
          <div className='mx-2'>
          <Link href="/category/education">
          <p className="px-2 py-1 md:text-lg bg-gray-100 dark:bg-gray-800 rounded-lg select-none ">
            {item}
          </p></Link>
        </div>
        ))
      }

        </div>

      <div className="grid gap-3">
      {
        posts?.length && posts?.map((post: IPost) => (
          <div key={post?._id} className=" max-w-5xl shadow-xl overflow-hidden bg-white rounded-lg dark:bg-gray-800">
            <div className="my-4 px-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={post?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"
                  />
                    {
       post?.user?.isVerified &&  <span className='-ml-1'><FcApproval className='-mb-3'/></span>
     }
     
                  <Link
                    href="#"
                    className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                    tabIndex={0}
                    role="link"
                  >
                    {post?.user?.name}
                  </Link>
                </div>
                <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                  {post?.createdAt?.slice(0, 10)}
                </span>
              </div>
            </div>
          {
            post?.isPremium ? (  <p
              
              className="block px-4 mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 "
              tabIndex={0}
              role="link"
            >
              {post?.title}
            </p>) : (
                <Link
                href={ `/post/${post?._id}`}
                className="block px-4 mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                tabIndex={0}
                role="link"
              >
                {post?.title}
              </Link>
            )
          }
            <div className="">
             {
              post?.isPremium ? (
                <>
                <div className='flex justify-center text-amber-500'>
                  <div>
                  <FaCrown className='w-6 h-6 mt-5'/>
                  </div>
                  <div className='px-4 my-5  font-semibold text-lg'>  Premium Content for verifiyed user</div>
                </div>
                <div className='flex justify-center'>
                  <Link href="/">
                  <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Verify Account</button>
                  </Link>
                </div>
                </>
                
              ) : (
                <img
                className="object-cover mt-3 w-full"
                src={post?.images}
                alt="Article"
              />
              )
             }
            </div>
            <div className="">
              <div className="px-4">
                <div className="py-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  {/* link comment section */}
              <div className="flex"> 
                <FaComment className='w-6 h-6 '/> 
                <span className='mt-1 px-2'>{post?.comments?.length }</span>
                </div>                 
                 <div className="flex"> 
                  <button onClick={toggleReact} className="mt-1">
                  {react === 'like' ? (
          <>
            <FcLike className="w-6 h-6 " />
           
          </>
        ) : (
          <>
            <FcLikePlaceholder className="w-6 h-6  " />
          </>
        )}</button> 
        <span className="mt-2 px-2">{post?.upvotesCount}</span>
         </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
    

    );
};

export default PostContent;