import React from 'react';
import Link from 'next/link';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";


const PostContent = () => {
  const user = useAppSelector(useCurrentUser);
  const {data, isLoading} = useGetAllPostsQuery(undefined);
const posts = data?.data;

    return (
      <div>
        {
          posts.length && posts.map((post) => (
            <div key={post?._id} className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="my-4 ml-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <img
              className="object-cover h-10 rounded-full"
              src={user?.profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
              alt="Avatar"
            />
            <Link
              href="#"
              className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
              tabIndex={0}
              role="link"
            >
              {user?.name}
            </Link>
          </div>
          <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
            21 SEP 2015
          </span>
        </div>
      </div>
  
    <img
      className="object-cover w-full h-64"
      src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      alt="Article"
    />
    <div className="p-6">
      <div>
        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
          Product
        </span>
        <Link
          href="#"
          className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
          tabIndex={0}
          role="link"
        >
          I Built A Successful Blog In One Year
        </Link>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
          parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris
          egestas quam volutpat viverra. In pretium nec senectus erat. Et
          malesuada lobortis.
        </p>
      </div>
      
    </div>
  </div>
          ))
        }
      </div>

    );
};

export default PostContent;