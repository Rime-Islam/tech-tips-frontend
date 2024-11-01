"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FcApproval } from "react-icons/fc";
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetAllPostsQuery, useUpvotePostMutation } from "@/redux/app/feature/api/post/postApi";
import { IPost } from '@/types/types';
import { FaComment } from "react-icons/fa6";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaCrown } from "react-icons/fa";
import Loader from '../UI/Loader';
import { toast } from 'sonner';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/app/store';
import { filteredPost, filterPosts, setFilters, setPosts } from '@/redux/app/feature/api/post/postSlice';


const PostContent = () => {
  const use = useAppSelector(useCurrentUser);
  const id = use?._id;
  const {data: userData } = useGetSingleUserQuery(id);
  const {data, isLoading} = useGetAllPostsQuery(undefined);
const posts = data?.data;
const premium = userData?.data?.premium;


  const filterPost = useAppSelector(filteredPost);
  const dispatch = useAppDispatch();

const category: string[] = ["Software Engineer", "Web Development", "Cybersecurity", "DevOps", "Machine Learning", "Blockchain", "UI/UX Design"];
useEffect(() => {
  if (data) {
      dispatch(setPosts(posts));
  }
}, [data, dispatch]);
const handleCategory = (category: string) => {
  dispatch(setFilters({category}))
  dispatch(filterPosts());
};

if (isLoading) {return <Loader />};
return (
      <div className="container max-w-5xl">
        {/* categories tab  */}
        <div className='mb-5 flex flex-wrap '>
      {
        category?.length && category?.map((item: string) => (
          <div className='mx-2'>
          <button onClick={() => handleCategory(item)} className="px-2 mt-2 py-1 md:text-lg bg-gray-100 dark:bg-gray-800 rounded-lg select-none ">
            {item}
          </button>
        </div>
        ))
      }
        </div>

      <div className="flex flex-col gap-3 max-w-2xl mx-auto">
      {
        filterPost?.length ? (filterPost?.map((post: IPost) => (
          <div key={post?._id} className="py-4 shadow-xl overflow-hidden bg-white rounded-lg dark:bg-gray-800">
            <div className="my-4 px-4">
              <div className="flex items-center">
                <div className="flex items-center">
                <Link
              href={ `/post/${post?._id}`}>
                  <img className="object-cover w-10 h-10 rounded-full"
                    src={post?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"
                  /></Link>
                    {
       post?.user?.premium &&  <div className='mb-10 -ml-3'><FcApproval className='-mb-3'/></div>
     }
     
                  <Link
                    href={`/user/${post?.user?._id}`}
                    className="mx-2 hover:underline font-semibold text-gray-700 dark:text-gray-200"
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
            post?.isPremium ? (  premium ? (
              <Link
              href={ `/post/${post?._id}`}
              className="block px-4 my-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
              tabIndex={0}
              role="link"
            >
              {post?.title}
            </Link>
            ) : (
              <p
              
              className="block px-4 mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 "
              tabIndex={0}
              role="link"
            >
              {post?.title}
            </p>
            )) : (
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
              premium ? (
                <div className='max-w-2xl '>
                 <img
                className="w-full"
                src={post?.images}
                alt="Article"
              />
               </div>
              ) : (
                <>
                <div className='flex justify-center text-amber-500'>
                  <div>
                  <FaCrown className='w-6 h-6 mt-5'/>
                  </div>
                  <div className='px-4 my-5  font-semibold text-lg'>  Premium Content for verifiyed user</div>
                </div>
                <div className='flex justify-center'>
                  <Link href="/profile/payment">
                  <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Verify Account</button>
                  </Link>
                </div>
                </>
              )
                
              ) : (
               <div className='max-w-2xl mt-5'>
                 <img
                className="w-full"
                src={post?.images}
                alt="Article"
              />
               </div>
              )
             }
            </div>
           <div className='flex ml-5 mt-5'>
           <p className="px-4 py-1 text-sm bg-gray-100 dark:bg-gray-900 rounded-lg select-none ">{post?.category}</p>
           </div>
          </div>
        ))
      ) : (
          <p className='text-center mt-12'>No Post Found In This Category</p>
        )
      }
      </div>
    </div>
    

    );
};

export default PostContent;