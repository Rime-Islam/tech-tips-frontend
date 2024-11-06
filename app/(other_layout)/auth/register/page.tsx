"use client"
import Loader from '@/component/UI/Loader';
import { useRegisterUserMutation } from '@/redux/app/feature/api/auth/authApi';
import { IUser } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { motion } from 'framer-motion';


const page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
  const [ registerUser, { isLoading }] = useRegisterUserMutation();
  const route = useRouter();
 

  const onSubmit: SubmitHandler<IUser> = async(data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Password should match with confirm password')
      return;
    }
   const name = data.name;
   const email = data.email;
   const password = data.password;

    try {
      const res = await registerUser({ name, email, password }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        route.push("/auth/login")
      }
    } catch ( error: any ) {
      toast.error(error.data.message)
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
        <motion.div
        variants={variants}
        initial="hidden"
        animate="show" className="bg-white py-6 rounded shadow-xl mt-[12vh]  max-w-xl mx-auto dark:bg-gray-900">
  <div className="flex justify-center mx-auto ">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="flex justify-center mx-auto">
  <motion.div
        variants={item2} >
   
  <Image
              className="w-28 ml-20"
              src="https://i.ibb.co.com/FBBRt37/Google-Photos-Logo-2015.png"
              alt="logo"
              width={64} 
              height={64} 
              priority 
            />
             <h3 className="mt-3 hover:text-blue-500 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Register In GrootHub
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Create Your Account and Start Writing
          </p>
  </motion.div>
      </div>
      <motion.div
        variants={item1} className="relative flex items-center mt-8">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <input
          type="text"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="User Name"
          {...register("name", { required: "Name is required" })}
        required
        />
        {errors.name && (
          <p className="text-red-600">{errors.name.message}</p>
        )}
      </motion.div>
      <motion.div
        variants={item2} className="relative flex items-center mt-6">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        <input
          type="email"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email address"
          {...register("email", { required: "Email is required" })}
          required
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
      </motion.div>
      <motion.div
        variants={item1} className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          required
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
      </motion.div>
      <motion.div
        variants={item2} className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm Password"
          {...register("confirmPassword", { required: "Confirm Password is required" })}
          required
          />
          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
      </motion.div>
      <div className="mt-6">
        <motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 1.5 }}
  whileInView={{ opacity: 1 }} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
     {isLoading ? <Loader /> : "Sign Up" }
        </motion.button>
        <motion.div
        variants={item1} className="mt-6 text-center ">
          <Link href="/auth/login"
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
            Already have an account?
          </Link>
        </motion.div>
      </div>
    </form>
  </div>
</motion.div>

    );
};

export default page;