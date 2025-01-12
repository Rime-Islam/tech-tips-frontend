
import React, { useEffect} from 'react';
import Link from 'next/link';
import { FcApproval, FcLike } from "react-icons/fc";
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { IPost } from '@/types/types';
import { FaComment, FaCrown } from "react-icons/fa";
import Loader from '../UI/Loader';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';
import { filteredPost, filterPosts, setFilters, setPosts } from '@/redux/app/feature/api/post/postSlice';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
import Category from './Category';


const Card = () => {
    const use = useAppSelector(useCurrentUser);
    const id = use?._id;
    const {data: userData } = useGetSingleUserQuery(id);
    const {data, isLoading} = useGetAllPostsQuery(undefined);
    const posts = data?.data;
    const premium = userData?.data?.premium;
    const filterPost = useAppSelector(filteredPost);
    const dispatch = useAppDispatch();
    // const category: string[] = ["Software Engineer", "Web Development", "Cybersecurity", "DevOps", "Machine Learning", "Blockchain", "UI/UX Design"];
    
    useEffect(() => {
        if (data) {
            dispatch(setPosts(posts));
        }
    }, [data, dispatch]);

    // const handleCategory = (category: string) => {
    //     dispatch(setFilters({category}))
    //     dispatch(filterPosts());
    // };
    
    if (isLoading) {return <Loader />};
    return (
        <div className='my-5 '>
  {/* categories tab  */}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      {
        filterPost?.length ? (filterPost?.map((post: IPost) => (
          <div key={post?._id} className="flex flex-col justify-between bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg h-[50vh]">
          {/* Image Section */}
          <div className='h-[20vh]'>
            {
              post?.isPremium && !premium ? (
             <div>
             <div className="w-full h-56 flex flex-col items-center justify-center text-center p-6">
  <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
    Unlock Premium Content
  </h1>
  <p className="text-gray-600 dark:text-white mb-4">
    Groothub empowers you to create premium blogs and monetize your expertise. 
  </p>
  <p className="text-gray-600 dark:text-white mb-6">
    Become a premium user to access exclusive content and take your experience to the next level.
  </p>
  <Link
    href="/profile/payment"
    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    Become a Premium User
  </Link>
</div>

                
                </div>
              ): (
                <Link href={`/post/${post?._id}`}>
                <img className="w-full h-full" src={post?.images} alt="Article" />
              </Link>
              )
            }
          </div>
        
          {/* Content Section */}
          <div className="  p-6">
            <div>
              {post?.isPremium && !premium ? (
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post?.title}
                </p>
              ) : (
                <Link
                  href={`/post/${post?._id}`}
                  className="block text-xl font-semibold text-gray-800 transition-colors duration-300 dark:text-white hover:text-gray-600 hover:underline"
                >
                  {post?.title}
                </Link>
              )}
            </div>

            {/* User Profile Section */}
          <div>
          <div className='my-4'>
<span className='bg-white text-black font-semibold  rounded-lg my-3 px-2'>{post?.category}</span>
</div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Link href={`/profile/${post?.user?._id}`}>
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      post?.user?.profilePicture ||
                      "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"
                    }
                    alt="Avatar"
                  />
                </Link>
                <div className="mb-5">
                  {post?.user?.premium && <FcApproval className="text-xl " />}
                </div>
                <Link
                  href={`/user/${post?.user?._id}`}
                  className="mx-2 font-semibold text-gray-700 dark:text-gray-200 hover:underline"
                >
                  {post?.user?.name}
                </Link>
              </div>
             <div className='flex gap-5'>
              <div className='flex gap-2'>
              <FcLike className="w-6 h-6 " />
              <span>{post?.upvotesCount}</span>
              </div>
                       <div className='flex gap-2'>
                       <FaComment className='w-5 h-5 '/>
                       <span>{post?.comments?.length}</span>
                       </div>
             </div>
            </div>
          </div>
          </div>
          
        </div>
        
        ))
      ) : (
          <p className='text-center mt-12'>No Post Found In This Category</p>
        )
      }
      </div>
        </div>
    )
};

export default Card;