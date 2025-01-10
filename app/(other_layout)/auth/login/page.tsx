"use client"
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from '@/types/types';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '@/redux/app/feature/api/auth/authApi';
import { useAppDispatch } from '@/redux/app/hook';
import { setUser } from '@/redux/app/feature/api/auth/authSlice';
import Image from 'next/image';
import { motion } from 'framer-motion';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, {isLoading}] = useLoginUserMutation()
 
  const onSubmit: SubmitHandler<IUser> = async(data) => {
        
        try {
          const res = await loginUser(data).unwrap();
       
          if (res?.success) {
            toast.success(res?.message);
           
            const userData = res?.data?.user;
            const token = res?.data?.token;
            dispatch(setUser({ userData, token }));

            route.push("/")
          }
        } catch ( error: any ) {
          toast.error(error?.data?.message)
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
         animate="show" className=" mt-[25vh] max-w-sm mx-auto overflow-hidden  rounded-lg shadow-xl ">
        <motion.div
        variants={item2} className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <Image
              className="w-28"
              src="https://i.ibb.co.com/FBBRt37/Google-Photos-Logo-2015.png"
              alt="logo"
              width={64} 
              height={64} 
              priority 
            />
          </div>
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>
          <p className="mt-1 text-center hover:text-blue-500 text-gray-500 dark:text-gray-400">
            Login to GrootHub
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
           
           <motion.div
        variants={item1} className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                {...register("email", { required: "Email is required" })}
                required
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
            </motion.div>
            <motion.div
        variants={item2} className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-white placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                {...register("password", { required: "Password is required" })}
                required
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
            </motion.div>
          
            <div className="flex items-center justify-between mt-4">
              <Link href="/auth/forget-password"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </Link>
              <motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 1.1 }}
  whileInView={{ opacity: 1 }} className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {isLoading ? "Signing.." : "Sign In" }
              </motion.button>
            </div>
          </form>
        </motion.div>
        <motion.div
        variants={item1} className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?
          </span>
          <Link href="/auth/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </motion.div>
      </motion.div>
      
    );
};

export default Login;