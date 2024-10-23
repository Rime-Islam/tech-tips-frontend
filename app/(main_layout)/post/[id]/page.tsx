"use client"
import React from 'react';
import Loader from "@/component/UI/Loader";
import { useGetSinglePostQuery, useUpvotePostMutation } from "@/redux/app/feature/api/post/postApi";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import { FcApproval, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaShareAlt } from "react-icons/fa";
import { BsBookmarkCheckFill } from 'react-icons/bs';
import HtmlContent from '@/component/UI/html/htmlContent';
import { toast } from 'sonner';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const page = ({ params }: { params: { id: string} }) => {
    const { id } = params;
    const [react, setReact] = useState<'like' | 'dislike' | null>(null); 
    const { data, isLoading } = useGetSinglePostQuery(id);
    const post = data?.data;
const [upvotePost] = useUpvotePostMutation();

    const toggleReact = async() => {
          const res = await upvotePost({postId: post._id}).unwrap();
        console.log(res)
        toast.success(res?.message);
    if (res?.success) {
      setReact((prevreact) => (prevreact === 'like' ? 'dislike' : 'like'));
    }
      };

if (isLoading) {return <Loader />};
    return (
        <div className="min-h-[100vh] py-10">
            {/*  title section  */}
            <h1 className="text-3xl my-6 font-bold">{post?.title}</h1>

            {/*  avatar section  */}
             <div className="flex items-center">
                  <img className="object-cover w-10 h-10 rounded-full"
                    src={post?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"/>
                    {post?.user?.isVerified &&  <div className='mb-10 -ml-3'><FcApproval className='-mb-3'/></div>}
                  <div>
                    <div className="ml-5">
                    <div>
                <Link
                    href="#"
                    className=" font-semibold text-gray-900 dark:text-gray-200"
                    tabIndex={0}
                    role="link">
                    {post?.user?.name}
                  </Link>
                </div>
                  <div className="dark:text-gray-400 text-gray-600">Published at: { new Date(post?.createdAt).toLocaleString('en-US', {
                    weekday: "long",
                    year: "numeric",
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}</div>
                    </div>
                  </div>
                </div>

            <div className="mt-5 px-5 flex gap-16">
                   {/*  like section  */}
                <div> 
                 <button onClick={toggleReact} className="mt-1 flex gap-2">
                  {react === 'like' ? (
                    <>
                        <FcLike className="w-6 h-6 " />
                    </>
                    ) : (
                    <>
                    <FcLikePlaceholder className="w-6 h-6  " />
                    </>)}<span>{post?.upvotesCount}</span></button> </div>
           {/* comment section  */}
                    <div>
           <div className="flex mt-2"> 
                <FaComment className='w-5 h-5 '/> 
                <span className=' px-2'>{post?.comments?.length }</span>
                </div></div>  

            {/* share section  */}
            <div className='mt-2'>
                <button><FaShareAlt className='w-5 h-5 '/></button>
            </div>

            {/* save section  */}
            <div className='mt-2'>
             <button><BsBookmarkCheckFill className='w-5 h-5 '/></button>
            </div>
           
            </div>
            
            <div className='max-w-5xl rounded-sm my-8'>
                <img className='w-full object-cover' src={post?.images} alt="post image" />
            </div>
          
            <HtmlContent content={post?.description}/>
          
        </div>
    )
};

export default page;