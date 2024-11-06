"use client"
import React from 'react';
import Loader from "@/component/UI/Loader";
import { useCreateCommentMutation, useDeleteCommentMutation, useGetSinglePostQuery, useUpdateCommentMutation, useUpvotePostMutation } from "@/redux/app/feature/api/post/postApi";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import { FcApproval, FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaShareAlt } from "react-icons/fa";
import { BsBookmarkCheckFill } from 'react-icons/bs';
import HtmlContent from '@/component/UI/html/htmlContent';
import { toast } from 'sonner';
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { motion } from 'framer-motion';


const page = ({ params }: { params: { id: string} }) => {
    const { id } = params;
    const [react, setReact] = useState<'like' | 'dislike' | null>(null); 
    const [isOpen, setIsOpen] = useState(false); 
    const [comment, setComment] = useState(''); 
    const { data, isLoading } = useGetSinglePostQuery(id);
    const post = data?.data;
    const comments = post?.comments;
    
    const [upvotePost] = useUpvotePostMutation();
    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState<string>('');

    const toggleReact = async() => {
          const res = await upvotePost({postId: post._id}).unwrap();
    if (res?.success) {
      toast.success(res?.message);
      setReact((prevreact) => (prevreact === 'like' ? 'dislike' : 'like'));
    } else {
      toast.error(res?.message);
    }
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    
    const handleComment = async(e: React.FormEvent) => {
         e.preventDefault();
      
        if (comment) {
          const res = await createComment({postId: post?._id, commentText: comment}).unwrap();
          if (res.success) {
            toast.success(res?.message);
          }
        }
    };

    const handleDelete = async (id: any) => {
      Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
              const res = await deleteComment({ postId: post?._id, comentId: id }).unwrap();
    
               if (res?.success) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
               } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:  "An Error occured"
                });
               }
             
            }
          });
    };

    const handleEdit = (id: string, currentText: string) => {
        setEditCommentId(id);
        setEditCommentText(currentText);
    };

    const handleUpdate = async ( e: React.FormEvent) => {
      e.preventDefault();

      if (editCommentText) {
      try {
        const res = await updateComment({ postId: post?._id, commentId: editCommentId, commentText: editCommentText }).unwrap();
        if (res.success) {
          toast.success(res?.message);
          setEditCommentId(null);
        }
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
      }
    };

    const generatePDF = async () => {
      const postContent = document.getElementById('post-content'); 
    
      if (postContent) {
        const pdf = new jsPDF("p", "mm", "a4"); 
        const canvas = await html2canvas(postContent, { useCORS: true, scale: 2 }); 
        const imgData = canvas.toDataURL("image/png");
        
        const padding = 10;
    
        const imgWidth = 210 - padding * 2; 
        const pageHeight = 295 - padding * 2; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = padding;
    
        // Add first page with padding
        pdf.addImage(imgData, "PNG", padding, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    
        // Add more pages if content exceeds one page
        while (heightLeft > 0) {
          position = heightLeft - imgHeight + padding;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", padding, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
    
        pdf.save(`${post?.title}.pdf`); // Save the PDF with the post's title
      } else {
        toast.error("Post content not found!");
      }
    };

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
              delay: 1
          },
      },
  };
    
if (isLoading) {return <Loader />};
    return (
        <motion.div
        variants={variants}
        initial="hidden"
        animate="show"  id="post-content" className="min-h-[100vh] py-10">
            {/*  title section  */}
          <motion.div
variants={item1}>
          <h1 className="text-3xl my-6 font-bold hover:text-blue-500">{post?.title}</h1>

{/*  avatar section  */}
 <div className="flex items-center">
     <motion.button
initial={{ opacity: 0.6 }}
whileHover={{
scale: 1.1,
transition: { duration: 1 },
}}
whileTap={{ scale: 0.9 }}
whileInView={{ opacity: 1 }}><img className="object-cover w-10 h-10 rounded-full"
src={post?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
alt="Avatar"/>
</motion.button> {post?.user?.isVerified &&  <div className='mb-10 -ml-3'><FcApproval className='-mb-3'/></div>}
      <div>
        <div className="ml-5">
        <div>
    <Link
        href={`/profile/${post?.user?._id}`}
        className=" font-semibold text-gray-900 hover:underline dark:text-gray-200"
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
<button onClick={toggleModal}>
    <FaComment className='w-5 h-5 '/>  </button>
    <span className=' px-2'>{post?.comments?.length }</span>
    
    {/* comment modal  */}
    {isOpen && (
<div
className="fixed lg:top-0  "
aria-labelledby="modal-title"
role="dialog"
aria-modal="true"
>
<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
<span
  className="hidden sm:inline-block sm:align-middle sm:h-screen"
  aria-hidden="true"
>
  &#8203;
</span>

<div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
  <div>
      {
        comments?.length ? (comments?.map((item: any) => (
          <div key={item?._id} className="flex items-center my-2">
          <img className="object-cover w-10 h-10 rounded-full"
            src={item?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
            alt="Avatar"/>
          {
            item?.user?.premium && (<div className='mb-10 -ml-3'><FcApproval className='-mb-3'/></div>)
          }
          <div>
            <div className="ml-3">
            <div>
       
        </div>
       <div className='text-sm'>
       <div className='flex gap-3 '>
          <div>
            {
              item?.user?.name
            }
          </div>
       <div className="dark:text-gray-400 text-gray-600">{ new Date(post?.createdAt).toLocaleString('en-US', {
            year: "numeric",
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}</div>
            <div className='md:ml-5 flex gap-3'>
<div><button  onClick={() => handleEdit(item?._id, item?.comment)}> <AiFillEdit className='w-4 h-4 text-amber-600'/></button></div>
<div className='mb-2'> <button onClick={() => handleDelete(item?._id)}> <RiDeleteBack2Fill className='w-4 h-4 text-red-600'/></button></div>
</div>
       </div>
          <div>
          {editCommentId === item._id ? (
          <form onSubmit={handleUpdate} className='flex gap-2'>
            <input
              type="text"
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              className="block h-6 text-black px-1 text-sm border rounded-md"
            />
            <button type="submit" className="text-sm bg-blue-600 text-white rounded-md px-2 py-1">
              Save
            </button>
            <button onClick={() => setEditCommentId(null)} className="text-sm bg-red-600 text-white rounded-md px-2 py-1">
              Cancel
            </button>
          </form>
        ): (item?.comment)}
           
          </div>
       </div>
            </div>
          </div>
        </div>
        ))) : (
          <span>No comments available</span>
        )
      }
  </div>

<form onSubmit={handleComment} className='pt-5'>
<div className="flex items-center justify-between w-full mt-5 gap-x-2">
<input
      id="comment"
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
    />

  </div>

  <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
    <button
      onClick={toggleModal}
      className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
    >
      Cancel
    </button>

    <button type='submit' className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
      Confirm
    </button>
    </div>
  
</form>
</div>
</div>
</div>
)}
    
    </div></div>  

{/* share section  */}
<div className='mt-2'>
    <button><FaShareAlt className='w-5 h-5 '/></button>
</div>

{/* save section  */}
{/* <div className='mt-2'>
 <button><BsBookmarkCheckFill className='w-5 h-5 '/></button>
</div> */}

</div>
          </motion.div>
            
            <motion.div
variants={item2} className='max-w-5xl rounded-sm my-8'>
               <div className='mb-5'>
               <span className='text-xl font-semibold text-gray-900 dark:text-gray-300 '>Category : </span> {post?.category}
               </div>
                <img className='w-full object-cover' src={post?.images} alt="post image" />
            </motion.div>
          
            <HtmlContent content={post?.description}/>
          
            <motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 1.2 }}
  whileInView={{ opacity: 1 }} type="button" onClick={generatePDF} className="mt-8 px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Download PDF</motion.button>
        </motion.div>
    )
};

export default page;

