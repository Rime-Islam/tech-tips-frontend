import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { uploadImage } from '@/utils/imageDB';
import { useAppSelector } from '@/redux/app/hook';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useCreatePostMutation } from '@/redux/app/feature/api/post/postApi';
import { toast } from 'sonner';
import Loader from '@/component/UI/Loader';
import { IPost } from "@/types/types";
import { motion } from 'framer-motion';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const CreatePost = () => {
    const user = useAppSelector(useCurrentUser);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [file, setFile] = useState<string>('');
    const [premium, setPremium] = useState(false);
    const [createPost, {isLoading}] = useCreatePostMutation()
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
          const imageUrl = await uploadImage(selectedFile);
          if (imageUrl) {
            setFile(imageUrl)
          } 
      }
    };
  
    const handleSelectCategory = (value: string) => {
      setCategory(value);
    };
  
    const handleSelectContent = (value: string) => {
      setContent(value);
    };
  
    const route = useRouter();
    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
     
      try {
        const data: IPost = {
          title, content, category, user: user?._id,
           images: file, isPremium: premium,
          description: editorContent
        };
  
        const res = await createPost(data).unwrap();
     
        if (res?.success) {
          toast.success(res?.message);
          route.push("/")
        }
      } catch ( error: any ) {
        toast.error(error?.data?.message)
      }
    }

    return (
        <form onSubmit={handleCreatePost}>
        <div className="">
          <div className="pt-10 max-w-5xl mx-auto md:pt-10">
            <h1 className="text-xl md:text-4xl font-bold mb-3 hover:text-blue-500">Write A Post</h1>
            <p>Share your expertise and insights with the GrootHub.
            Create engaging content to help others learn and grow.</p>
          <div className="flex gap-3 mb-5 mt-8">
          <div className="shadow flex-1 mt-2 bg-white dark:bg-gray-800 appearance-none border rounded h-10 text-white dark:text-gray-700">  
        <div className="group relative cursor-pointer py-2">
            <div className="flex items-center justify-between dark:bg-gray-800 space-x-5 bg-white px-4">
            <p className="menu-hover block text-gray-700 dark:text-white ">
                {content || "Select Content"}
            </p>
            <span>
            <IoIosArrowDown />
            </span>
            </div>
            <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
            <p onClick={() => handleSelectContent('Design Patterns')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Design Patterns
            </p>
            <p onClick={() => handleSelectContent('Distributed Systems')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Distributed Systems
            </p>
            <p onClick={() => handleSelectContent('Refactoring')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Refactoring
            </p>
            <p onClick={() => handleSelectContent('Performance Optimization')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Performance Optimization
            </p>
            <p onClick={() => handleSelectContent('Database Design')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Database Design
            </p>
            <p onClick={() => handleSelectContent('Fullstack Development')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Fullstack Development
            </p>
            <p onClick={() => handleSelectContent('Backend Development')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Backend Development
            </p>
            </div>
        </div>
        </div>
      
          <div className="shadow flex-1 mt-2 bg-white dark:bg-gray-800 appearance-none border rounded h-10 text-white dark:text-gray-700">  
        <div className="group relative cursor-pointer py-2">
            <div className="flex items-center justify-between dark:bg-gray-800 space-x-5 bg-white px-4">
            <p className="menu-hover block text-gray-700 dark:text-white ">
                {category || "Select Category"}
            </p>
            <span>
            <IoIosArrowDown />
            </span>
            </div>
            <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible ">
            <p onClick={() => handleSelectCategory('Software Development')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Software Development
            </p>
            <p onClick={() => handleSelectCategory('Web Development')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Web Development
            </p>
            <p onClick={() => handleSelectCategory('Cybersecurity')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Cybersecurity
            </p>
            <p onClick={() => handleSelectCategory('DevOps')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            DevOps
            </p>
            <p onClick={() => handleSelectCategory('Machine Learning')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Machine Learning
            </p>
            <p onClick={() => handleSelectCategory('Blockchain')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            Blockchain
            </p>
            <p onClick={() => handleSelectCategory('UI/UX Design')} className=" block border-b border-gray-100 py-1  text-gray-500 hover:text-black md:mx-2">
            UI/UX Design
            </p>
            </div>
        </div>
        </div>
         </div>
    
          <div className=" my-4">
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="title"
                    value={title}
                    placeholder="Enter your post Title"
                    aria-label="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
    
                <div className='mt-5'>
                <ReactQuill
                    value={editorContent}
                    onChange={setEditorContent}
                    theme="snow"
                    className="h-full bg-white text-gray-700"
                    placeholder="Write your post description here..."
                  />
                </div>
    
              
                <div className='mt-20'>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center w-full max-w-5xl py-10 p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-gray-500 dark:text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
        Attach images, screenshots, or visual aids
        </h2>
        <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
          Upload your file SVG, PNG, JPG or GIF.{" "}
        </p>
        <input id="file-upload" required type="file" onChange={handleFileChange}  className="hidden" />
      </label>
    </div>
           
           <div className='my-5'>
           <div>
      <label className="inline-flex items-center" htmlFor="tealCheckBox">
        <input
          id="premium"
          type="checkbox"
          checked={premium}
          onChange={(e) => setPremium(e.target.checked)}
          className="w-4 h-4 accent-teal-600"
        />
        <span className="ml-2">Publish as Premium Content.</span>
      </label>
    </div>
           </div>
        <div className='mb-12 flex justify-center gap-3'>
       
        <motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
  whileInView={{ opacity: 1 }} type="submit" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-500 rounded-lg hover:bg-amber-600 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-50"> {isLoading ? <Loader /> : "Publish Post" }</motion.button>
        </div>
    
          </div>
        </div>
      </form>
    )
};

export default CreatePost;